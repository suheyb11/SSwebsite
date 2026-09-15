import { db } from "@/lib/db";
import { ok } from "@/lib/api";

/** GET /api/products?category=personal — all products, in display order. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const products = await db.product.findMany({
    where: category ? { category } : {},
    orderBy: { order: "asc" },
  });

  return ok(products);
}
