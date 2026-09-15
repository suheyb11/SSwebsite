/**
 * Pass 2 — converts every remaining product page from one markdown body into
 * ordered PageSection blocks.
 *
 * Reads the seeded products straight out of the database, splits each body on
 * its `##` headings, and turns each group into either a feature-grid (when the
 * group is a bullet list) or an alternating image+text row (when it is prose).
 *
 * Writes prisma/generated-sections.ts, which seed.ts imports.
 */
import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Pages already converted or laid out by hand — leave them alone.
const SKIP = new Set(["home-internet"]);

// Imagery is drawn in code, not loaded from a file.
//
// The old theme assets were leftovers from a bought template and the stock
// photos were generic; neither said anything about Somtel. These names map to
// the SVG drawings in src/components/ui/Illustration.tsx — always on brand,
// always crisp, nothing to download, and no white box behind them.
const I = (name) => `illus:${name}`;

// Videos, chosen against three rules: landscape (not the vertical, TikTok-shaped
// social cuts), good quality, and informational about a service rather than a
// price promotion.
//
// Those rules rule out most of the YouTube channel. Of its 15 uploads, twelve are
// portrait or square — shot for Facebook and TikTok feeds, and letterboxed with
// black bars in a 16:9 frame on a desktop page. Measured from each watch page:
//
//   grwp25qfdC4  464x832    portrait    Muraadso ad
//   3ElCQyz0fWY  576x1024   portrait    5G campaign
//   CmW3Aa_b-No  576x1024   portrait    5G campaign
//   DifytuDAZZo  576x1024   portrait    5G campaign
//   bekKPYRDAzM  576x1024   portrait    5G campaign
//   6ybd3TmpWn0  1080x1920  portrait    5G campaign
//   YtmQrcFu5EU  1080x1920  portrait    5G campaign
//   H5U03D5OUeE  360x640    portrait    5G campaign
//   sBR_bFPVntY  576x1024   portrait    5G campaign
//   lG1CEKc-4XM  1080x1350  portrait    Dhamays — and a discount ad besides
//   zbBmhH8GXAs  1080x1080  square      DahabPlus testimonial
//   QSn2I6nbWLE  360x360    square      "Untitled video"
//   OU6wmQjMXtk  1920x1080  LANDSCAPE   Eid greeting — not about a service
//   rEZ5JNdOD_Q  1280x720   LANDSCAPE   campaign recap — an event, not a service
//   -qEuryrL77k  1280x720   LANDSCAPE   informational: what Somtel and 5G offer
//
// So exactly one upload passes all three rules.
//
// The player also understands "fb:<post url>" for a public Facebook video.
// TODO: Facebook blocks unauthenticated browsing, so its videos cannot be found
// from here — send the post URLs and they drop straight in.
// What each video costs to watch. Measured with scripts/probe-video.mjs.
const VIDEO_META = {
  Muraadso: "1:04 · 111 MB · 1080p",
};

const VIDEO = {
  // The produced Somtel film, served from /public at the client's request.
  // TODO: this file is 110 MB. Compress before launch:
  //   ffmpeg -i in.mp4 -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow   //          -c:a aac -b:a 96k -movflags +faststart out.mp4
  Muraadso: "/assets/videos/final_adeega_muraadso_video.mp4",

  // "Ma ogtahay macaamiil?" — 1280x720, explains Somtel and the 5G rollout.
  business: "yt:-qEuryrL77k",
};

// One dedicated drawing per page. No two pages open on the same motif.
const HERO = {
  Prepaid: I("topup"),
  Postpaid: I("invoice"),
  Muraadso: I("unlimited"),
  Akram: I("minutes"),
  Dhameys: I("tv"),
  Kaafiye: I("mix"),
  Mifi: I("router"),
  Esim: I("esim"),
  Roaming: I("globe"),
  // The one page with real artwork of its own: the DahabPlus promo cut-out.
  // It is the app this page is about, so it beats a drawing of a wallet.
  eDahab: "/assets/images/facilityone.png",
  Keydso: I("savings"),
  fiberoptic: I("fibre"),
  SMS: I("message"),
  SMSAPI: I("api"),
  IVR: I("ivr"),
  bundles: I("bundle"),
  devices: I("store"),
  business: I("building"),
  "home-internet": I("home"),
};

// The image rows further down a page. Each starts with that page's own motif so
// the page stays visually consistent, then draws on the four neutral supporting
// drawings (signal, shield, device, support) which carry no page identity.
const SUPPORTING = [I("signal"), I("shield"), I("device"), I("support")];

const IMAGES = Object.fromEntries(
  Object.entries(HERO).map(([slug, hero], i) => [
    slug,
    [hero, SUPPORTING[i % SUPPORTING.length], SUPPORTING[(i + 1) % SUPPORTING.length]],
  ])
);

const DEFAULT_IMAGES = SUPPORTING;

// First match wins. Keeps card icons relevant without hand-tagging every bullet.
const ICON_RULES = [
  [/\bunlimited\b|\bno expiry\b|\bnever expire/i, "Infinity"],
  [/\bfibre\b|\bfiber\b/i, "Network"],
  [/\brouter\b|\bmodem\b|\bmifi\b|\bhotspot\b/i, "Router"],
  [/\bwifi\b|\bwi-fi\b|\bbroadband\b|\binternet\b/i, "Wifi"],
  [/\bspeed\b|\bfast\b|\bmbps\b|\bhigh.speed\b/i, "Gauge"],
  [/\bcall\b|\bvoice\b|\bminute\b|\btalk\b|\bdial\b/i, "PhoneCall"],
  [/\bsms\b|\bmessage\b|\btext\b/i, "MessageCircle"],
  [/\bemail\b|\bmail\b/i, "Mail"],
  [/\bapi\b|\bdeveloper\b|\bintegrat|\bhttps\b|\bcallback\b/i, "Server"],
  [/\bsim\b|\besim\b|\bhandset\b|\bphone\b|\bdevice\b/i, "Smartphone"],
  [/\bdata\b|\bbundle\b|\bmegabyte\b|\ballowance\b/i, "Signal"],
  [/\bpay\b|\bprice\b|\bcost\b|\bcredit\b|\btop.up\b|\btariff\b|\bairtime\b/i, "Wallet"],
  [/\bmoney\b|\btransfer\b|\bedahab\b|\bsaving\b|\bwallet\b/i, "CreditCard"],
  [/\bsecur|\bsafe\b|\bprotect|\bfraud\b|\bpin\b/i, "ShieldCheck"],
  [/\bsupport\b|\bcare\b|\bhelp\b|\b24\/7\b|\bagent\b/i, "Headset"],
  [/\binstall|\bengineer\b|\btechnician\b|\bsurvey\b|\brepair\b|\bfault\b/i, "Wrench"],
  [/\bcoverage\b|\bnationwide\b|\bcity\b|\bcities\b|\bregion\b|\bcountry\b/i, "MapPin"],
  [/\broam|\btravel\b|\babroad\b|\binternational\b/i, "Globe2"],
  [/\boffice\b|\bbusiness\b|\bcompany\b|\benterprise\b|\bbranch\b/i, "Building2"],
  [/\bteam\b|\bstaff\b|\bpeople\b|\bcustomer\b|\bfamily\b/i, "Users"],
  [/\btv\b|\biptv\b|\bstream|\bchannel\b|\bwatch\b/i, "Tv"],
  [/\btime\b|\bhour\b|\bvalidity\b|\bexpire|\bdaily\b|\bweekly\b|\bmonthly\b/i, "Clock"],
  [/\bshop\b|\boutlet\b|\bstore\b|\bvisit\b/i, "Store"],
  [/\bcheck\b|\bconfirm\b|\bverify\b|\bincluded\b/i, "CheckCircle2"],
  [/\bswitch\b|\bmove\b|\bchange\b|\bupgrade\b|\bstack\b/i, "Repeat"],
  [/\bdocument|\bcontract\b|\bterms\b|\bbill\b|\binvoice\b|\bstatement\b/i, "FileText"],
];

// Headings that list what a customer gets, which reads better as a ticked list
// than as a row of boxes.
const INCLUDED_HEADING =
  /what (is |you )?(included|inside|get|you get)|what we (provide|stock|offer)|includes?|good to know|why (people|customers|choose|go)|what (it does|works|can)/i;

// Headings that describe an ordered process rather than a set of features.
const SEQUENCE_HEADING =
  /how (it works|to|do)|getting (started|connected)|steps?|activat|subscrib|sign up|set ?up|apply|order|install/i;

const FALLBACK_ICONS = ["Sparkles", "CheckCircle2", "Zap", "Signal", "Users", "Clock"];

function iconFor(text, i, used = new Set()) {
  for (const [re, name] of ICON_RULES) {
    if (re.test(text) && !used.has(name)) return name;
  }
  // Every relevant icon is already on this card grid — fall back to a neutral one.
  for (const name of FALLBACK_ICONS) if (!used.has(name)) return name;
  return FALLBACK_ICONS[i % FALLBACK_ICONS.length];
}

/** Splits a markdown body into `## heading` groups, dropping TODO lines. */
function parseGroups(body) {
  const groups = [];
  const todos = [];
  let current = null;

  for (const raw of (body || "").split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    // TODO notes belong in the seed as code comments, never on the page.
    if (/^TODO:/i.test(line)) {
      todos.push(line);
      continue;
    }

    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim();

      // Some bodies carry the note as its own '## TODO: ...' heading. Those are
      // an instruction to us, not page copy — record it and drop the section.
      if (/^TODO:/i.test(heading)) {
        todos.push(heading);
        current = { heading: null, bullets: [], prose: [], drop: true };
        continue;
      }

      current = { heading, bullets: [], prose: [] };
      groups.push(current);
      continue;
    }

    if (!current) {
      current = { heading: null, bullets: [], prose: [] };
      groups.push(current);
    }

    if (line.startsWith("- ")) current.bullets.push(line.slice(2).trim());
    else current.prose.push(line);
  }

  return { groups, todos };
}

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/** `**Title** the rest` -> { title, text }. Falls back to a first-sentence split. */
function bulletToItem(bullet, i, used) {
  let title = null;
  let text = null;

  const bold = bullet.match(/^\*\*([^*]+)\*\*(.*)$/);
  if (bold) {
    title = bold[1].trim().replace(/[.,:;]$/, "");
    text = bold[2].trim();
  } else {
    const dash = bullet.split(/\s+[-–—]\s+/);
    if (dash.length > 1) {
      title = dash[0].trim();
      text = dash.slice(1).join(" - ").trim();
    } else {
      const stop = bullet.indexOf(". ");
      if (stop > 0 && stop < 60) {
        title = bullet.slice(0, stop).trim();
        text = bullet.slice(stop + 2).trim();
      } else {
        title = bullet.trim();
      }
    }
  }

  // Strip the punctuation left behind when the bold ran into the sentence.
  if (text) text = capitalize(text.replace(/^[,:;–—-]\s*/, "").replace(/^\*\*/, ""));
  if (!text) text = undefined;

  const icon = iconFor(`${title} ${text ?? ""}`, i, used);
  used?.add(icon);
  return { icon, title, text };
}

function rememberIcon(text, i, used) {
  const name = iconFor(text, i, used);
  used.add(name);
  return name;
}

function withUniqueIcons(bullets) {
  const used = new Set();
  return bullets.map((bullet, i) => bulletToItem(bullet, i, used));
}

function buildSections(product, facts) {
  const pool = IMAGES[product.slug] ?? DEFAULT_IMAGES;
  const { groups, todos } = parseGroups(product.body);
  const sections = [];
  let imageIndex = 0;
  let rowIndex = 0;
  let gridCount = 0;

  // 1. Hero.
  //
  //    The three Somtel promises used to be a feature-grid section of their own
  //    on all 19 product pages — the same three cards, repeated every time. They
  //    now ride inside the hero as a compact strip, which removes a full-height
  //    band from every product page and kills the repetition.
  sections.push({
    type: "hero",
    eyebrow: product.category === "business" ? "Business" : "Personal",
    title: product.heroTitle ?? product.name,
    body: product.heroText ?? undefined,
    // A hero image sits whole on the navy, so it must be a cut-out.
    // Only a verified cut-out, never a fallback: a boxed graphic on the navy is
    // exactly the placeholder look we are removing.
    image: HERO[product.slug],
    ctaLabel: "Get started",
    ctaHref: "/contact-us",
    ctaLabel2: "See pricing",
    ctaHref2: "#pricing",
    items: [
      { icon: "Zap", title: "Widest network coverage" },
      { icon: "ShieldCheck", title: "No hidden charges" },
      { icon: "Headset", title: "24/7 customer care" },
    ],
  });

  // 3. Lay the body out densely.
  //
  //    Giving every heading its own full-width image row is what made these
  //    pages so tall. So the split is decided up front: a couple of prose
  //    groups become image rows, and the rest share one columns block.
  //
  //    The columns block only earns its heading if at least two topics land in
  //    it — otherwise a lone topic is better off as a normal row.
  //    Never more than two image rows on a page, and the leftovers are either
  //    none or at least two — so there is no lone column under its own heading.
  const prose = groups.filter((g) => g.bullets.length < 3);
  const imageRowCount = prose.length <= 2 ? prose.length : prose.length === 3 ? 1 : 2;
  const leftovers = [];
  const leftoverIcons = new Set();

  for (const group of groups) {
    if (!group.heading && group.prose.length === 0 && group.bullets.length === 0) continue;

    // A bullet list is already dense: it becomes a card grid — unless the
    // heading says it is a sequence, in which case the numbered steps block
    // reads far better and breaks up the page.
    if (group.bullets.length >= 3) {
      const heading = group.heading ?? "";
      let type;

      if (SEQUENCE_HEADING.test(heading)) {
        type = "timeline";
      } else if (INCLUDED_HEADING.test(heading)) {
        type = "checklist";
      } else {
        // Alternate the remaining sets so a page never shows two identical card
        // grids in a row.
        type = gridCount % 2 === 0 ? "feature-grid" : "checklist";
        gridCount += 1;
      }
      const items = withUniqueIcons(group.bullets);

      // Every card in a grid is built the same way.
      //
      // The first one used to carry the page's drawing, to break up a row of
      // icon chips. On the page it does the opposite: the card with the drawing
      // is half as tall again as the others, the grid row stretches to match,
      // and the cards beside it end up with a block of empty space under their
      // text. The icons are already all different, which is the variety that
      // row actually needed.

      sections.push({
        type,
        tone: sections.length % 2 === 0 ? "muted" : undefined,
        title: group.heading ?? undefined,
        body: group.prose[0],
        items,
      });
      continue;
    }

    const text = group.prose.join("\n\n");

    if (rowIndex < imageRowCount) {
      sections.push({
        type: "image-text",
        tone: sections.length % 2 === 0 ? "muted" : undefined,
        flip: rowIndex % 2 === 1,
        title: group.heading ?? undefined,
        body: text || undefined,
        image: pool[imageIndex % pool.length],
        items: group.bullets.length ? withUniqueIcons(group.bullets) : undefined,
      });

      imageIndex += 1;
      rowIndex += 1;
      continue;
    }

    // Everything after that is a column in a single shared block.
    if (group.heading)
      leftovers.push({
        icon: rememberIcon(group.heading + " " + text, leftovers.length, leftoverIcons),
        title: group.heading,
        text: text || undefined,
      });
    for (const bullet of group.bullets) leftovers.push(bulletToItem(bullet, 0));
  }

  // The video sits near the end, after the page has explained itself.
  if (VIDEO[product.slug]) {
    sections.push({
      type: "video",
      tone: sections.length % 2 === 0 ? "muted" : undefined,
      eyebrow: "Watch",
      title: `See ${product.name} in action`,
      video: VIDEO[product.slug],
      image: HERO[product.slug],
      ctaLabel: `Play the ${product.name} video`,
      // The first item of a video section carries its length and file size, so
      // the play button can say what watching will cost before anything loads.
      items: VIDEO_META[product.slug] ? [{ title: VIDEO_META[product.slug] }] : undefined,
    });
  }

  if (leftovers.length > 0) {
    sections.push({
      type: "text-columns",
      tone: sections.length % 2 === 0 ? "muted" : undefined,
      eyebrow: "Good to know",
      title: "The detail, in short",
      items: leftovers,
    });
  }

  return { sections, todos };
}

function literal(value) {
  return JSON.stringify(value);
}

function emit(product, sections, todos) {
  const lines = [];
  lines.push(`  // ----- /${product.slug} -----`);
  for (const todo of todos) lines.push(`  // ${todo}`);

  for (const s of sections) {
    lines.push("  {");
    lines.push(`    pageKey: ${literal(product.slug)},`);
    lines.push(`    type: ${literal(s.type)},`);
    for (const key of ["eyebrow", "title", "body", "image", "icon", "tone", "video", "ctaLabel", "ctaHref", "ctaLabel2", "ctaHref2"]) {
      if (s[key]) lines.push(`    ${key}: ${literal(s[key])},`);
    }
    if (s.flip) lines.push("    flip: true,");
    if (s.items?.length) {
      lines.push("    items: [");
      for (const item of s.items) {
        // Write the whole item. This used to emit only icon/title/text, which
        // silently dropped every stat's number and made the block render 0.
        const parts = [];
        if (item.icon) parts.push(`icon: ${literal(item.icon)}`);
        if (item.image) parts.push(`image: ${literal(item.image)}`);
        parts.push(`title: ${literal(item.title)}`);
        if (item.text) parts.push(`text: ${literal(item.text)}`);
        if (item.value !== undefined) parts.push(`value: ${item.value}`);
        if (item.suffix !== undefined) parts.push(`suffix: ${literal(item.suffix)}`);
        if (item.prefix !== undefined) parts.push(`prefix: ${literal(item.prefix)}`);
        if (item.href) parts.push(`href: ${literal(item.href)}`);
        lines.push(`      { ${parts.join(", ")} },`);
      }
      lines.push("    ],");
    }
    lines.push("  },");
  }

  return lines.join("\n");
}

const products = await db.product.findMany({
  orderBy: { order: "asc" },
  include: { plans: true },
});

// Figures shared by every page, read from the seed rather than guessed.
const facts = { cities: await db.coverageArea.count() };
const chunks = [];
let total = 0;

for (const product of products) {
  if (SKIP.has(product.slug)) continue;

  const { sections, todos } = buildSections(product, facts);
  total += sections.length;
  chunks.push(emit(product, sections, todos));
  console.log(`  ${product.slug.padEnd(16)} ${sections.length} sections`);
}

const file = `// GENERATED by scripts/gen-sections.mjs from each Product.body, then seeded
// by prisma/seed.ts. Edit a page's layout here (or in Prisma Studio) — the
// section types are documented in src/lib/sections.ts.

import type { SectionSeed } from "./seed-types";

export const generatedSections: SectionSeed[] = [
${chunks.join("\n\n")}
];
`;

fs.writeFileSync("prisma/generated-sections.ts", file);
console.log(`\nwrote prisma/generated-sections.ts — ${total} sections across ${chunks.length} pages`);

await db.$disconnect();
