/**
 * Splices the Pass 4 seed content into prisma/seed.ts:
 * four new products, coverage areas, help-centre FAQs and the legal pages.
 */
import fs from "node:fs";

const SEED = "prisma/seed.ts";
let s = fs.readFileSync(SEED, "utf8");

const products = fs.readFileSync("scripts/pass4-products.txt", "utf8");
const extra = fs.readFileSync("scripts/pass4-extra.txt", "utf8");
const legal = fs.readFileSync("scripts/pass4-legal.txt", "utf8");

function swap(find, replace, label) {
  if (!s.includes(find)) throw new Error("anchor not found: " + label);
  s = s.replace(find, replace);
  console.log("  ok:", label);
}

// 1. Legal bodies as module-level constants, above main().
swap("async function main() {", legal + "async function main() {", "legal constants");

// 2. Clear the new tables too, so re-seeding stays idempotent.
swap(
  "  await db.faq.deleteMany();",
  "  await db.faq.deleteMany();\n  await db.coverageArea.deleteMany();\n  await db.page.deleteMany();",
  "delete lines"
);

// 3. Four new products, appended to the end of the products array.
swap("    },\n  ];\n\n  for (const p of products) {", "    },\n" + products + "  ];\n\n  for (const p of products) {", "new products");

// 4. Coverage, help-centre FAQs and legal pages, after the product loop.
swap("  // ---------- Blog ----------", extra + "  // ---------- Blog ----------", "coverage + support + pages");

fs.writeFileSync(SEED, s);
console.log("\nseed.ts updated");
