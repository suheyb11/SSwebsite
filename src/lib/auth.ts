// Admin password hashing.
//
// scrypt from Node's standard library rather than a dependency: it is the
// algorithm a password should use, and it is already here. The session cookie
// lives in session.ts, which the Edge middleware can import; this file cannot be
// imported from there.

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

/** Hashes a password as `salt:hash`. Node only — scrypt is not in Edge. */
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

/** Constant-time check, so a wrong password cannot be found by timing. */
export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");

  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

