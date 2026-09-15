import { db } from "@/lib/db";
import { ok } from "@/lib/api";

/** GET /api/posts?page=1&category=news — published blog posts, newest first. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize")) || 6));
  const category = searchParams.get("category");

  const where = {
    published: true,
    ...(category ? { categories: { some: { slug: category } } } : {}),
  };

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: { postedDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { categories: true },
    }),
    db.post.count({ where }),
  ]);

  return ok(posts, { page, pageSize, total, pageCount: Math.ceil(total / pageSize) });
}
