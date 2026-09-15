import { db } from "@/lib/db";
import { ok } from "@/lib/api";

/** GET /api/jobs?status=Opened — job openings. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const jobs = await db.job.findMany({
    where: status ? { status } : {},
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return ok(jobs);
}
