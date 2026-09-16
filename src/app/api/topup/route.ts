// POST /api/topup — charges a top-up through the payment provider.
//
// The browser never talks to the provider directly. It posts here, this route
// holds the credentials and calls out, and the customer's handset is where the
// payment is actually approved. Keeping the key on the server is the whole
// point: anything shipped to the browser is readable by anyone.
//
// Until TOPUP_API_URL is set the route answers 503 with a plain message, so the
// page can say "payment is not connected yet" instead of appearing to take
// money it cannot take.

import { fail, ok, readJson, text } from "@/lib/api";
import { MSISDN_HINT, isSomtelNumber, normaliseMsisdn } from "@/lib/msisdn";

/** What a customer may top up. Anything else is rejected before we call out. */
const SERVICES = new Set([
  "airtime",
  "data",
  "Muraadso",
  "Akram",
  "Kaafiye",
  "Dhameys",
  "fiberoptic",
]);

/**
 * Sanity limits per currency. Not a price list — just a ceiling, so a typo or a
 * tampered request cannot ask the provider to move an absurd sum.
 */
const LIMITS: Record<string, { min: number; max: number }> = {
  USD: { min: 0.25, max: 500 },
  SOS: { min: 1000, max: 5_000_000 },
};

/** How long to wait on the provider before giving up. */
const TIMEOUT_MS = 20_000;

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return fail("Invalid request body");

  const mode = text(body, "mode") === "other" ? "other" : "self";
  const service = text(body, "service");
  const plan = text(body, "plan");
  const currency = text(body, "currency") || "USD";
  const amount = text(body, "amount");
  // Normalised to the nine local digits, so "+252 62…", "0 62…" and "62…" are
  // the same number here — and so the two-numbers-match check compares like
  // with like rather than two different spellings of one line.
  const msisdn = normaliseMsisdn(text(body, "msisdn"));
  const recipient = normaliseMsisdn(text(body, "recipient")) || msisdn;
  const pin = text(body, "pin").replace(/[^\d]/g, "");

  // Validate here as well as in the page. The page can be bypassed; this cannot.
  if (!SERVICES.has(service)) return fail("Choose a service to top up");

  const limit = LIMITS[currency];
  if (!limit) return fail("Choose a currency");

  const value = Number(amount);
  if (!Number.isFinite(value) || value < limit.min || value > limit.max) {
    return fail(`Enter an amount between ${limit.min} and ${limit.max} ${currency}`);
  }

  if (!isSomtelNumber(msisdn)) return fail(MSISDN_HINT);
  if (mode === "other") {
    if (!isSomtelNumber(recipient)) return fail(MSISDN_HINT);

    // Paying yourself is not what "Other" means, and charging for it would be
    // taking money to move it nowhere.
    if (msisdn === recipient) {
      return fail("The two numbers are the same. Use self recharge for your own line.");
    }
  }
  if (pin.length < 4 || pin.length > 6) return fail("Enter your 4 to 6 digit PIN");

  const endpoint = process.env.TOPUP_API_URL;
  const key = process.env.TOPUP_API_KEY;

  if (!endpoint) {
    // Not an error in the code — the provider simply has not been connected.
    // 503 says "not available right now", which is exactly the situation.
    return fail(
      "Payments are not connected yet. Your request was not charged — top up through the eDahab app or at any Somtel outlet.",
      503
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(key ? { authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        mode,
        service,
        plan: plan || null,
        currency,
        amount,
        msisdn,
        recipient,
        // Forwarded once to authorise the charge. It is never written to the
        // database, never put in a log line, and not kept after this call.
        pin,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const raw = await response.text();
    let payload: Record<string, unknown> = {};
    try {
      payload = raw ? JSON.parse(raw) : {};
    } catch {
      // A provider that answers with something other than JSON is still an
      // answer; keep the status and say so rather than throwing.
    }

    if (!response.ok) {
      const message =
        (typeof payload.message === "string" && payload.message) ||
        (typeof payload.error === "string" && payload.error) ||
        `The payment provider refused the request (${response.status}).`;

      return fail(message, response.status >= 500 ? 502 : 400);
    }

    return ok({
      // A reference the customer can quote to support, when the provider gives one.
      reference:
        (typeof payload.reference === "string" && payload.reference) ||
        (typeof payload.id === "string" && payload.id) ||
        null,
      message:
        (typeof payload.message === "string" && payload.message) ||
        "Request sent. Approve it on your handset to finish.",
      amount,
      currency,
      service,
      msisdn,
      recipient,
    });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";

    return fail(
      aborted
        ? "The payment provider did not answer in time. Nothing was charged — please try again."
        : "Could not reach the payment provider. Nothing was charged — please try again.",
      504
    );
  } finally {
    clearTimeout(timer);
  }
}
