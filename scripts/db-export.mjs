// Dumps every table to one JSON file.
//
// Run this BEFORE switching the database provider, while the Prisma client is
// still built for the database that holds the data. A generated client only
// speaks the provider it was generated for, so one client cannot read SQLite
// and write PostgreSQL — the move goes through this file instead.
//
//   node scripts/db-export.mjs            -> prisma/export.json
//   node scripts/db-export.mjs backup.json
//
// Ids are kept exactly as they are, so anything that points at a row by id
// still points at the same row afterwards. db-import.mjs puts them back and
// then moves each table's id counter past them.

import { writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

const out = process.argv[2] ?? "prisma/export.json";
const db = new PrismaClient();

const data = {
  exportedAt: new Date().toISOString(),

  // Rows nothing else depends on.
  settings: await db.setting.findMany(),
  subscribers: await db.subscriber.findMany(),
  contactMessages: await db.contactMessage.findMany(),
  slides: await db.slide.findMany(),
  testimonials: await db.testimonial.findMany(),
  partners: await db.partner.findMany(),
  pages: await db.page.findMany(),
  coverageAreas: await db.coverageArea.findMany(),
  features: await db.feature.findMany(),
  pageSections: await db.pageSection.findMany(),
  stores: await db.store.findMany(),
  promos: await db.promo.findMany(),
  adminUsers: await db.adminUser.findMany(),
  events: await db.event.findMany(),

  // Blog. Posts carry their category ids so the many-to-many can be rebuilt,
  // and comments carry parentId so replies can be re-attached.
  categories: await db.category.findMany(),
  posts: await db.post.findMany({
    include: { categories: { select: { id: true } } },
  }),
  comments: await db.comment.findMany({ orderBy: { id: "asc" } }),

  // Products and everything hanging off them.
  products: await db.product.findMany(),
  plans: await db.plan.findMany(),
  faqs: await db.faq.findMany(),

  // Careers.
  jobs: await db.job.findMany(),
  jobApplications: await db.jobApplication.findMany(),
};

writeFileSync(out, JSON.stringify(data, null, 2));

const counts = Object.entries(data)
  .filter(([, v]) => Array.isArray(v))
  .map(([k, v]) => `${k}: ${v.length}`);

console.log(`Wrote ${out}`);
console.log(counts.join("\n"));

await db.$disconnect();
