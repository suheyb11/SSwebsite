// The admin session cookie.
//
// Kept apart from auth.ts on purpose. The middleware that guards /admin runs in
// the Edge runtime, which has no `node:crypto` — importing the password hashing
// from there fails the build outright. Everything in this file is Web Crypto,
// which Node and Edge both provide.
//
// The cookie holds `<payload>.<signature>`: the user id and an expiry, signed.
// It is not encrypted — it carries nothing secret, and the signature is what
// stops it being forged.

export const SESSION_COOKIE = "somtel-admin";

/** Sessions last a working day; long enough to edit, short enough to matter. */
export const SESSION_MAX_AGE = 60 * 60 * 8;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (!value) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Generate one with:\n" +
        "  node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }

  return value;
}

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** HMAC-SHA256 through Web Crypto, so this works in both runtimes. */
async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Builds a signed cookie value for a user. */
export async function createSession(userId: number) {
  const payload = base64url(
    encoder.encode(JSON.stringify({ uid: userId, exp: Date.now() + SESSION_MAX_AGE * 1000 }))
  );

  return `${payload}.${await sign(payload)}`;
}

/** Returns the user id if the cookie is genuine and current, otherwise null. */
export async function readSession(value: string | undefined) {
  if (!value) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  // Check the signature before trusting anything inside the payload.
  if ((await sign(payload)) !== signature) return null;

  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      uid: number;
      exp: number;
    };

    if (!json.exp || json.exp < Date.now()) return null;
    return json.uid;
  } catch {
    return null;
  }
}
