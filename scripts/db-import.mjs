// Loads a db-export.mjs dump into whatever DATABASE_URL points at.
//
//   node scripts/db-import.mjs            <- prisma/export.json
//   node scripts/db-import.mjs backup.json
//
// Used to move the site from the local SQLite file onto PostgreSQL without
// re-seeding: a re-seed would rebuild the sample content but throw away
// anything written since — comments, applications, messages, and any edit made
// in the dashboard.
//
// Three things this has to get right:
//
//   order    — a row is only written once the rows it points at exist.
//   ids      — kept exactly as exported, so every foreign key still lands.
//   counters — PostgreSQL's id sequences do not know about ids inserted by
//              hand, so the next insert would collide with row 1. Each one is
//              moved past the highest id at the end. (Skipped on SQLite, which
//              works out the next id from the table itself.)

import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

const file = process.argv[2] ?? "prisma/export.json";
const data = JSON.parse(readFileSync(file, "utf8"));
const db = new PrismaClient();

console.log(`Importing ${file} (exported ${data.exportedAt})`);

/** Dates come back from JSON as strings; Prisma wants Date objects. */
const DATE_FIELDS = new Set([
  "createdAt", "updatedAt", "postedDate", "deadline", "lastLoginAt",
  "startsAt", "endsAt",
]);

function revive(row) {
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    out[key] = DATE_FIELDS.has(key) && typeof value === "string" ? new Date(value) : value;
  }
  return out;
}

async function load(name, rows, model, transform = revive) {
  if (!rows?.length) {
    console.log(`  ${name.padEnd(16)} nothing to import`);
    return;
  }

  for (const row of rows) await model.create({ data: transform(row) });
  console.log(`  ${name.padEnd(16)} ${rows.length}`);
}

// ---- rows nothing else points at ----
await load("settings", data.settings, db.setting);
await load("subscribers", data.subscribers, db.subscriber);
await load("contactMessages", data.contactMessages, db.contactMessage);
await load("slides", data.slides, db.slide);
await load("testimonials", data.testimonials, db.testimonial);
await load("partners", data.partners, db.partner);
await load("pages", data.pages, db.page);
await load("coverageAreas", data.coverageAreas, db.coverageArea);
await load("features", data.features, db.feature);
await load("pageSections", data.pageSections, db.pageSection);
await load("stores", data.stores, db.store);
await load("promos", data.promos, db.promo);
await load("adminUsers", data.adminUsers, db.adminUser);
await load("events", data.events, db.event);

// ---- blog ----
await load("categories", data.categories, db.category);

// A post carries its categories as a list of ids, which becomes a connect.
await load("posts", data.posts, db.post, (row) => {
  const { categories, ...rest } = row;
  return {
    ...revive(rest),
    categories: categories?.length ? { connect: categories.map((c) => ({ id: c.id })) } : undefined,
  };
});

// Replies point at a comment, so every parent has to be in place first. They
// were exported in id order and a reply always has a higher id than its parent,
// so that order is already safe.
await load("comments", data.comments, db.comment);

// ---- products ----
await load("products", data.products, db.product);
await load("plans", data.plans, db.plan);
await load("faqs", data.faqs, db.faq);

// ---- careers ----
await load("jobs", data.jobs, db.job);
await load("jobApplications", data.jobApplications, db.jobApplication);

// ---- move the id counters past what was just inserted ----
//
// Only PostgreSQL needs this. `Setting` is keyed by a string and has no
// counter, so it is not in the list.
const provider = process.env.DATABASE_URL ?? "";

if (provider.startsWith("postgres")) {
  const TABLES = [
    "Post", "Category", "Comment", "Event", "Job", "JobApplication",
    "Product", "Plan", "Faq", "Slide", "Testimonial", "Partner",
    "ContactMessage", "Subscriber", "Page", "CoverageArea", "Feature",
    "PageSection", "Store", "Promo", "AdminUser",
  ];

  for (const table of TABLES) {
    // setval with `false` as the third argument means "the next id handed out
    // is this one", which is what we want when the table is empty and COALESCE
    // falls back to 1.
    await db.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('"${table}"', 'id'),
        COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1,
        false
      )
    `);
  }

  console.log(`\nId counters moved past the imported rows (${TABLES.length} tables).`);
} else {
  console.log("\nNot PostgreSQL — no id counters to move.");
}

console.log("Done.");
await db.$disconnect();
