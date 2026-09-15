import { db } from "@/lib/db";
import { ok, fail, readJson, text, isEmail } from "@/lib/api";

/** POST /api/subscribe — adds an email to the newsletter list. */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return fail("Invalid request body");

  const email = text(body, "email").toLowerCase();

  if (!isEmail(email)) return fail("Please enter a valid email address");

  const existing = await db.subscriber.findUnique({ where: { email } });

  // Subscribing twice is not an error from the visitor's point of view.
  if (existing) return ok({ id: existing.id, alreadySubscribed: true });

  const subscriber = await db.subscriber.create({ data: { email } });

  return ok({ id: subscriber.id, alreadySubscribed: false });
}
