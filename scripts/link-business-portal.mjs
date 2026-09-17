// Points the business messaging pages at the Somtel Business portal.
//
// Two things wrong today, fixed together:
//
//   1. /SMS, /SMSAPI and /business all carry a "See pricing" button aimed at
//      #pricing — a section that only renders when the product has plan rows,
//      and none of the three has any. Three buttons that do nothing.
//
//   2. The portal is where a business actually does the thing. It signs them
//      up, sends the campaign, issues API keys and shows the reports. The site
//      described the service and then offered a contact form.
//
// So the dead anchor becomes the portal, and each page gains a section saying
// what is waiting there.

import { PrismaClient } from "@prisma/client";

const PORTAL = "https://business.somtelsomalia.com/";
const db = new PrismaClient(
  process.argv.find((a) => a.startsWith("--url="))
    ? { datasources: { db: { url: process.argv.find((a) => a.startsWith("--url=")).slice(6) } } }
    : undefined
);

/** The hero button that used to point at a pricing block that never existed. */
const HERO = {
  SMS: { label: "Open the SMS Portal", href: PORTAL },
  SMSAPI: { label: "Get your API keys", href: PORTAL },
  business: { label: "Open the business portal", href: PORTAL },
};

for (const [pageKey, cta] of Object.entries(HERO)) {
  const hero = await db.pageSection.findFirst({ where: { pageKey, type: "hero" } });
  if (!hero) {
    console.log(`  ${pageKey}: no hero, skipped`);
    continue;
  }

  await db.pageSection.update({
    where: { id: hero.id },
    data: { ctaLabel2: cta.label, ctaHref2: cta.href },
  });
  console.log(`  ${pageKey}: hero button -> "${cta.label}"`);
}

// ---- the portal section itself ----
//
// Placed second to last, before "The detail, in short", so it lands after the
// reader knows what the service is and before the small print.

const SECTIONS = {
  SMS: {
    eyebrow: "Somtel Business",
    title: "Send your first campaign today",
    body:
      "The SMS Portal is a web platform — nothing to install. Sign up, upload your contact list, write the message and send. Delivery reports come back per recipient, so you can see what landed and what did not.",
    items: [
      { icon: "Send", title: "Bulk campaigns", text: "Upload a list, compose once, send to everyone. Schedule it for later if the timing matters." },
      { icon: "MessageCircle", title: "Two-way messaging", text: "Receive replies as well as send, so a campaign can start a conversation rather than end one." },
      { icon: "TrendingUp", title: "Delivery reports", text: "Per-recipient status for every send, so you know what reached a handset." },
      { icon: "Wallet", title: "Plans from 10,000 messages", text: "Starter, Business and Enterprise, up to 100,000 messages. Prices are on the portal." },
    ],
  },
  SMSAPI: {
    eyebrow: "Somtel Business",
    title: "Keys, docs and a sandbox",
    body:
      "Everything a developer needs sits in the business portal. Create an account, generate keys and call the API from your own system — order confirmations, one-time passcodes, delivery alerts, whatever your software already knows it needs to say.",
    items: [
      { icon: "ShieldCheck", title: "Your own API keys", text: "Generate and rotate them yourself, without waiting on anyone." },
      { icon: "Zap", title: "Bulk SMS API v2", text: "The current version, built for systems that send continuously rather than in batches." },
      { icon: "Smartphone", title: "USSD as well", text: "Menu-based services over USSD, for customers whose handsets are not smartphones." },
      { icon: "TrendingUp", title: "Usage you can see", text: "What you sent, what was delivered and what it cost, in one place." },
    ],
  },
  business: {
    eyebrow: "Somtel Business",
    title: "Your account, self-served",
    body:
      "Messaging does not need a phone call to set up. The business portal signs you up, sends the campaign, issues the API keys and shows what it cost — at whatever hour suits you.",
    items: [
      { icon: "MessageCircle", title: "SMS Portal", text: "Bulk campaigns from a web page, with delivery reports." },
      { icon: "Server", title: "SMS API", text: "For sending from your own systems." },
      { icon: "Smartphone", title: "USSD Services", text: "Menu-based services that work on any handset." },
    ],
  },
};

for (const [pageKey, section] of Object.entries(SECTIONS)) {
  const existing = await db.pageSection.findFirst({
    where: { pageKey, title: section.title },
  });

  if (existing) {
    console.log(`  ${pageKey}: portal section already there, updating`);
  }

  // Slot it in ahead of "The detail, in short", which always closes these pages.
  const detail = await db.pageSection.findFirst({
    where: { pageKey, type: "text-columns" },
    orderBy: { order: "desc" },
  });

  const order = detail ? detail.order : 99;

  if (detail && !existing) {
    // Everything from the detail block down moves along one.
    await db.pageSection.updateMany({
      where: { pageKey, order: { gte: order } },
      data: { order: { increment: 1 } },
    });
  }

  const data = {
    pageKey,
    type: "feature-grid",
    eyebrow: section.eyebrow,
    title: section.title,
    body: section.body,
    tone: "muted",
    ctaLabel: "Go to the portal",
    ctaHref: PORTAL,
    items: JSON.stringify(section.items),
    order,
  };

  if (existing) await db.pageSection.update({ where: { id: existing.id }, data });
  else await db.pageSection.create({ data });

  console.log(`  ${pageKey}: portal section at position ${order}`);
}

// ---- show the result ----
for (const pageKey of Object.keys(SECTIONS)) {
  const rows = await db.pageSection.findMany({
    where: { pageKey },
    orderBy: { order: "asc" },
    select: { order: true, type: true, title: true },
  });
  console.log(`\n/${pageKey}`);
  for (const r of rows) console.log(`  ${r.order}. ${r.type.padEnd(13)} ${r.title ?? ""}`);
}

await db.$disconnect();
