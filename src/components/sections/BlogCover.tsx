// The picture at the top of a post, and on every card that links to one.
//
// Not every post has a photograph worth showing — the anniversary post's only
// image was a 106px logo, which a card stretched to ten times its size. Rather
// than show that, or leave a grey hole, a post without a usable cover gets a
// drawn one: the same brand artwork the rest of the site uses, picked from the
// post's category so two posts side by side do not come out identical.

import Image from "next/image";
import { cx } from "@/components/ui";
import Illustration, { type IllustrationName } from "@/components/ui/Illustration";

/** Category slug to drawing. Anything unrecognised falls back by title. */
const BY_CATEGORY: Record<string, IllustrationName> = {
  news: "signal",
  "press-release": "wallet",
  events: "building",
  offers: "bundle",
  network: "fibre",
  support: "support",
};

const BY_KEYWORD: [RegExp, IllustrationName][] = [
  [/fib(re|er)|broadband|internet/i, "fibre"],
  [/edahab|money|wallet|payment/i, "wallet"],
  [/coverage|network|5g|signal/i, "signal"],
  [/bundle|offer|price|tariff/i, "bundle"],
  [/anniversar|celebrat|award|event/i, "building"],
  [/support|care|help/i, "support"],
];

function drawingFor(title: string, categories: { slug: string }[]) {
  for (const category of categories) {
    const match = BY_CATEGORY[category.slug];
    if (match) return match;
  }

  for (const [pattern, name] of BY_KEYWORD) {
    if (pattern.test(title)) return name;
  }

  return "globe" as IllustrationName;
}

export default function BlogCover({
  post,
  className,
  sizes,
  priority = false,
}: {
  post: {
    title: string;
    imageUrl: string | null;
    categories?: { slug: string }[];
  };
  /** Sets the height and corners; the cover fills whatever box it is given. */
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (post.imageUrl) {
    return (
      <Image
        src={post.imageUrl}
        alt=""
        fill
        sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        priority={priority}
        className={cx("object-cover", className)}
      />
    );
  }

  const name = drawingFor(post.title, post.categories ?? []);

  return (
    <div
      aria-hidden="true"
      className={cx(
        "absolute inset-0 flex items-center justify-center overflow-hidden bg-primary-600",
        className
      )}
    >
      <div className="brand-mesh pointer-events-none absolute inset-0 opacity-80" />

      {/* Sized as a share of the box rather than a fixed width, so the same
          cover fills a 350px card and a 1200px article header. A px cap here
          left the drawing marooned in the middle of the big one. */}
      <div className="relative w-[46%] max-w-[32rem]">
        <Illustration name={name} tone="navy" />
      </div>
    </div>
  );
}
