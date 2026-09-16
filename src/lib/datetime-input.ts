// Formatting for <input type="date"> and <input type="datetime-local">.
//
// `toISOString()` is the obvious thing to reach for and the wrong one: it
// converts to UTC first, so an event at 09:00 comes back into the form an hour
// or three out depending on where the server sits. These build the string from
// the local parts instead, which is what the input expects.

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-09-27" — for <input type="date">. */
export function toDateInput(date: Date | null | undefined) {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "2026-09-27T09:00" — for <input type="datetime-local">. */
export function toDateTimeInput(date: Date | null | undefined) {
  if (!date) return "";
  return `${toDateInput(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Reads a date back out of a form field. A blank field means "not set" rather
 * than the first of January 1970, and a value the browser did not produce (a
 * hand-edited form post) is treated the same way rather than stored as Invalid
 * Date, which Prisma would reject with an error the admin cannot act on.
 */
export function fromDateInput(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}
