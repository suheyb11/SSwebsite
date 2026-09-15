import { db } from "@/lib/db";
import { ok, fail } from "@/lib/api";

/** GET /api/jobs/[slug] — one job opening. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const job = await db.job.findUnique({ where: { slug } });

  if (!job) return fail("Job not found", 404);

  return ok(job);
}
