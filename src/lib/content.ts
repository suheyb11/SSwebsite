// Small helpers shared between server components and API routes.

import type { PlanView } from "@/types";

/** Plan.features is stored as a JSON string because SQLite has no array type. */
export function parseFeatures(features: string): string[] {
  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Turns a DB plan row into the shape the UI wants. */
export function toPlanView(plan: {
  id: number;
  title: string;
  price: number;
  unit: string | null;
  features: string;
  highlight: boolean;
}): PlanView {
  return { ...plan, features: parseFeatures(plan.features) };
}

/** Formats a date the way the old site did, e.g. "14 AUG, 2025". */
export function formatDate(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month}, ${d.getFullYear()}`;
}

/** Date and time for comments, e.g. "14 Sep 2026 at 15:42". */
export function formatDateTime(date: Date | string) {
  const d = new Date(date);
  const day = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day} at ${time}`;
}

/**
 * Rough minutes to read an article, at 200 words a minute — the figure most
 * publishers use. Always at least one, because "0 min read" reads as an error.
 */
export function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Initials for a comment avatar: "Faduma Ali" -> "FA". */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Longer date format used on job listings, e.g. "31 December 2026". */
export function formatLongDate(date: Date | string | null) {
  if (!date) return "No deadline";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * A deliberately small markdown renderer.
 * The seeded content only uses headings, bullets, bold and paragraphs,
 * so a full markdown library would be more dependency than we need.
 */
export type MarkdownBlock =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] };

export function parseMarkdown(markdown: string | null | undefined): MarkdownBlock[] {
  if (!markdown) return [];

  const blocks: MarkdownBlock[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push({ type: "quote", text: line.slice(2) });
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();

  return blocks;
}

/** Turns a heading into a URL fragment: "Your choices" -> "your-choices". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The h2 headings of a markdown document, for building a table of contents. */
export function headingsOf(markdown: string | null | undefined) {
  return parseMarkdown(markdown)
    .filter((block): block is { type: "h2"; text: string } => block.type === "h2")
    .map((block) => ({ id: slugify(block.text), text: block.text }));
}
