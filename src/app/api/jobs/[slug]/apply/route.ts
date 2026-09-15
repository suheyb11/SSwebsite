import { db } from "@/lib/db";
import { ok, fail, readJson, text, isEmail } from "@/lib/api";

/** POST /api/jobs/[slug]/apply — saves a job application. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const job = await db.job.findUnique({ where: { slug } });
  if (!job) return fail("Job not found", 404);
  if (job.status !== "Opened") return fail("This position is no longer accepting applications", 409);

  const body = await readJson(request);
  if (!body) return fail("Invalid request body");

  const name = text(body, "name");
  const email = text(body, "email");
  const phone = text(body, "phone");
  const message = text(body, "message");

  if (!name) return fail("Please enter your name");
  if (!isEmail(email)) return fail("Please enter a valid email address");

  const application = await db.jobApplication.create({
    data: { jobId: job.id, name, email, phone: phone || null, message: message || null },
  });

  return ok({ id: application.id });
}
