import { db } from "@/lib/db";
import { ok, fail } from "@/lib/api";

/** GET /api/posts/[slug] — one published blog post. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await db.post.findUnique({ where: { slug }, include: { categories: true } });

  if (!post || !post.published) return fail("Post not found", 404);

  return ok(post);
}
