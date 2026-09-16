// Somtel mobile numbers.
//
// Shared by the top-up form and by /api/topup, so the page and the server agree
// on what a valid number is. The page can be bypassed; the server check is the
// one that counts, and having both read from here keeps them from drifting.

/** The prefixes Somtel issues. */
export const SOMTEL_PREFIXES = ["62", "65", "66"] as const;

/**
 * Reduces the many ways people write a number down to its nine local digits.
 *
 *   +252 62 123 4567 → 621234567
 *   252621234567     → 621234567
 *   0621234567       → 621234567
 *   62 123 4567      → 621234567
 *
 * Returns "" when there is nothing usable, so callers test the result rather
 * than guessing at the input.
 */
export function normaliseMsisdn(input: string) {
  let digits = (input ?? "").replace(/[^\d]/g, "");

  // Country code, with or without the +.
  if (digits.startsWith("252")) digits = digits.slice(3);
  // A trunk zero, the way it is dialled inside the country.
  if (digits.startsWith("0")) digits = digits.slice(1);

  return digits;
}

/** True when the number is a well-formed Somtel line. */
export function isSomtelNumber(input: string) {
  const digits = normaliseMsisdn(input);

  return (
    digits.length === 9 && SOMTEL_PREFIXES.some((prefix) => digits.startsWith(prefix))
  );
}

/** The message shown when a number is rejected, so both sides word it alike. */
export const MSISDN_HINT = `Enter a Somtel number — nine digits starting ${SOMTEL_PREFIXES.join(", ")}.`;
