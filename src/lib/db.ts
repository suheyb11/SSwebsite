import { PrismaClient } from "@prisma/client";
import { toSectionView } from "@/lib/sections";

// Keep one Prisma client across hot reloads in dev, otherwise Next.js would
// open a new database connection on every file change.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

/**
 * Site-wide settings (phone, email, social links...) as a plain object,
 * e.g. settings.email. Keys missing from the database come back as "".
 */
export async function getSettings() {
  const rows = await db.setting.findMany();

  // Start with every key the site uses, so pages never hit `undefined`.
  const settings: Record<string, string> = {
    companyName: "",
    email: "",
    phone: "",
    phoneExtra: "",
    address: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",

    // Where the two apps can be downloaded. Blank until someone sets them in
    // the dashboard, and the app cards leave out any button with no link.
    dahabPlusSite: "",
    dahabPlusAndroid: "",
    dahabPlusIos: "",
    superAppSite: "",
    superAppAndroid: "",
    superAppIos: "",
  };

  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return settings;
}

/**
 * The "icon + title + text" tiles for one group, in seeded order.
 * Groups currently in use: "career-benefits", "career-process", "contact-channels".
 */
export async function getFeatures(group: string) {
  return db.feature.findMany({ where: { group }, orderBy: { order: "asc" } });
}

/**
 * The ordered section blocks that make up a page.
 * `pageKey` is a Product.slug, or a route key such as "home" or "about".
 */
export async function getSections(pageKey: string) {
  const rows = await db.pageSection.findMany({
    where: { pageKey },
    orderBy: { order: "asc" },
  });

  return rows.map((row) => toSectionView(row));
}

/**
 * The live promo of a given kind, or null.
 *
 * "Live" means active, started, and not yet finished — so an expired offer stops
 * appearing on its own, without anyone having to remember to switch it off.
 */
export async function getPromo(kind: "banner" | "popup") {
  const now = new Date();

  return db.promo.findFirst({
    where: {
      kind,
      active: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
      ],
    },
    orderBy: { order: "asc" },
  });
}
