// Adds the Dahabshiil Group companies to the "Trusted By" strip.
//
// These six were missing: Geeye, Horn Petroleum, Dahab Marina, Dahab Motors,
// Somtunaa and EAB. None of their logo files exists anywhere in the project —
// I checked every image under public/ — so each row goes in with an empty
// logoUrl and the strip sets the name as type instead. Drop the real file into
// public/assets/images/brand/ and set logoUrl on the row; nothing else changes.
//
//   node scripts/add-group-partners.mjs               (local)
//   node scripts/add-group-partners.mjs --url="..."   (a hosted database)

import { PrismaClient } from "@prisma/client";

const url = process.argv.find((a) => a.startsWith("--url="))?.slice(6);
const db = new PrismaClient(url ? { datasources: { db: { url } } } : undefined);

if (url) console.log("Target:", url.replace(/(:\/\/[^:]+:)[^@]*(@)/, "$1********$2"));

// `order` continues after the six already there, so the existing row keeps its
// sequence and the group companies follow.
const GROUP = [
  { name: "Geeye", href: "https://geeye.so" },
  { name: "Horn Petroleum", href: null },
  { name: "Dahab Marina", href: null },
  { name: "Dahab Motors", href: null },
  { name: "Somtunaa", href: null },
  { name: "EAB", href: null },
];

const highest = await db.partner.aggregate({ _max: { order: true } });
let order = (highest._max.order ?? 0) + 1;

for (const partner of GROUP) {
  const existing = await db.partner.findFirst({ where: { name: partner.name } });

  if (existing) {
    // Never clear a logo that has since been supplied.
    await db.partner.update({
      where: { id: existing.id },
      data: { href: partner.href },
    });
    console.log(`  ${partner.name.padEnd(16)} already there (logo: ${existing.logoUrl || "none yet"})`);
    continue;
  }

  await db.partner.create({
    data: { name: partner.name, logoUrl: "", href: partner.href, order: order++ },
  });
  console.log(`  ${partner.name.padEnd(16)} added`);
}

const all = await db.partner.findMany({ orderBy: { order: "asc" } });
console.log(`\n"Trusted By" now carries ${all.length}:`);
for (const p of all) {
  console.log(`  ${String(p.order).padStart(2)}  ${p.name.padEnd(16)} ${p.logoUrl || "— wordmark, awaiting a logo file"}`);
}

await db.$disconnect();
