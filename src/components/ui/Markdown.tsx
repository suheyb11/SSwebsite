import Link from "next/link";
import { slugify } from "@/lib/content";
import { parseMarkdown } from "@/lib/content";

/**
 * Renders the small subset of markdown used by seeded content:
 * headings, paragraphs, bullets, blockquotes, **bold**, *italic* and [links](/href).
 */
export default function Markdown({ content }: { content: string | null | undefined }) {
  const blocks = parseMarkdown(content);

  if (blocks.length === 0) return null;

  return (
    <div className="prose-site">
      {blocks.map((block, i) => {
        // The id lets a table of contents jump straight to the section.
        if (block.type === "h2")
          return (
            <h2 key={i} id={slugify(block.text)} className="scroll-mt-28">
              {inline(block.text)}
            </h2>
          );
        if (block.type === "h3") return <h3 key={i}>{inline(block.text)}</h3>;
        if (block.type === "quote") return <blockquote key={i}>{inline(block.text)}</blockquote>;
        if (block.type === "ul") {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block.text)}</p>;
      })}
    </div>
  );
}

// Matches **bold**, *italic* and [label](href), in that order of preference.
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

/** Splits a line into plain text and the inline markup above. */
function inline(text: string) {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;

      // Internal links go through next/link so navigation stays client-side.
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }

    return part;
  });
}
