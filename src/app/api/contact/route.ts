import { db } from "@/lib/db";
import { ok, fail, readJson, text, isEmail } from "@/lib/api";

/** POST /api/contact — saves a message from the contact form. */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return fail("Invalid request body");

  const name = text(body, "name");
  const email = text(body, "email");
  const message = text(body, "message");

  if (!name) return fail("Please enter your name");
  if (!isEmail(email)) return fail("Please enter a valid email address");
  if (!message) return fail("Please enter a message");

  const saved = await db.contactMessage.create({ data: { name, email, message } });

  return ok({ id: saved.id });
}
