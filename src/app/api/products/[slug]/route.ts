import { db } from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { toPlanView } from "@/lib/content";

/** GET /api/products/[slug] — one product with its plans and FAQs. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      plans: { orderBy: { order: "asc" } },
      faqs: { orderBy: { order: "asc" } },
    },
  });

  if (!product) return fail("Product not found", 404);

  // Send plan features as a real array rather than the stored JSON string.
  return ok({ ...product, plans: product.plans.map(toPlanView) });
}
