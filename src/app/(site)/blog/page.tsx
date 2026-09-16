import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, PenLine } from "lucide-react";
import { db } from "@/lib/db";
import { categoryHref, EVENTS_CATEGORY_SLUG } from "@/lib/content";
import { PageHeader, Section, cx } from "@/components/ui";
import { HoverLift } from "@/components/motion";
import BlogCover from "@/components/sections/BlogCover";
import PostCard, { PostMeta, postCardSelect, type PostCardView } from "@/components/sections/PostCard";

export const metadata: Metadata = {
  title: "Blogs",
  description: "News, events and press releases from Somtel Somalia.",
};

const PAGE_SIZE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category;

  // Events live on their own page now. Anyone landing on the old filter URL —
  // a bookmark, or a link from before — is sent there rather than shown a list
  // of posts that no longer represents what is happening.
  if (category === EVENTS_CATEGORY_SLUG) redirect("/events");

  const where = {
    published: true,
    ...(category ? { categories: { some: { slug: category } } } : {}),
  };

  const [posts, total, categories] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: { postedDate: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: postCardSelect,
    }),
    db.post.count({ where }),
    db.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
  ]);

  const pageCount = Math.ceil(total / PAGE_SIZE);

  // The newest post leads the page, but only where it is genuinely the newest:
  // on a later page or inside a filter it would just be the first of a slice.
  const lead = page === 1 && !category && posts.length > 1 ? posts[0] : null;
  const rest = lead ? posts.slice(1) : posts;

  const linkTo = (n: number) =>
    category ? `/blog?category=${category}&page=${n}` : `/blog?page=${n}`;

  const activeCategory = categories.find((cat) => cat.slug === category);

  return (
    <>
      <PageHeader
        title="Blogs"
        description="News, events and press releases from across the Somtel network."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />

      <Section>
        {/* Categories as a row of filters rather than a sidebar list: it reads
            at a glance and survives being narrowed to a phone. */}
        {categories.length > 0 && (
          <div>
            <nav aria-label="Filter by category" className="flex flex-wrap items-center gap-2">
              <FilterChip href="/blog" active={!category}>
                All posts
              </FilterChip>

              {categories.map((cat) => {
                // Events have a section of their own now, with dates, venues
                // and an upcoming/past split that a blog category cannot show.
                // This chip hands over to it rather than filtering posts.
                const toEvents = cat.slug === EVENTS_CATEGORY_SLUG;

                return (
                  <FilterChip
                    key={cat.id}
                    href={categoryHref(cat.slug)}
                    active={!toEvents && category === cat.slug}
                  >
                    {cat.name}
                    {toEvents ? (
                      <ArrowUpRight size={14} aria-hidden="true" />
                    ) : (
                      <Count>{cat._count.posts}</Count>
                    )}
                  </FilterChip>
                );
              })}
            </nav>
          </div>
        )}

        {activeCategory && (
          <p className="mt-6 text-[0.95rem] text-muted">
            {total} {total === 1 ? "post" : "posts"} in{" "}
            <span className="font-semibold text-fg">{activeCategory.name}</span>
          </p>
        )}

        {posts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border-strong bg-white p-12 text-center">
            <PenLine size={28} className="mx-auto text-primary-300" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-fg">Nothing here yet</p>
            <p className="mt-2 text-muted">
              {category
                ? "No posts have been filed under this category so far."
                : "No blog posts have been published yet."}
            </p>
            {category && (
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-primary-600 hover:text-accent-600"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to all posts
              </Link>
            )}
          </div>
        ) : (
          <>
            {lead && <LeadCard post={lead} />}

            {/*
              Rendered plainly, with no scroll-triggered reveal. The category
              tabs re-render this grid, the reveal only fires once, and the
              cards start at opacity 0 — so switching tabs left the posts in the
              page but invisible. Hover still lifts them.
            */}
            <div
              className={cx(
                "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
                lead ? "mt-6" : "mt-10"
              )}
            >
              {rest.map((post) => (
                <HoverLift key={post.id} className="h-full">
                  <PostCard post={post} />
                </HoverLift>
              ))}
            </div>
          </>
        )}

        {pageCount > 1 && (
          <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
            <PageArrow href={linkTo(page - 1)} disabled={page === 1} label="Previous page">
              <ArrowLeft size={17} aria-hidden="true" />
            </PageArrow>

            <ul className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  {n === page ? (
                    <span
                      aria-current="page"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white shadow-glow-navy-soft"
                    >
                      {n}
                    </span>
                  ) : (
                    <Link
                      href={linkTo(n)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-sm font-medium text-muted transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                    >
                      {n}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <PageArrow href={linkTo(page + 1)} disabled={page === pageCount} label="Next page">
              <ArrowRight size={17} aria-hidden="true" />
            </PageArrow>
          </nav>
        )}
      </Section>

    </>
  );
}

/** The newest post, given the width it deserves. */
function LeadCard({ post }: { post: PostCardView }) {
  return (
    <>
      <article className="group mt-10 grid overflow-hidden rounded-3xl border border-border-strong bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary-400 hover:shadow-lift lg:grid-cols-2">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block h-60 overflow-hidden sm:h-72 lg:h-full lg:min-h-[23rem]"
        >
          <BlogCover
            post={post}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          />

          <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
            Latest
          </span>
        </Link>

        <div className="flex flex-col justify-center p-7 sm:p-9">
          <PostMeta post={post} />

          <h2 className="mt-4 text-2xl font-semibold leading-tight text-fg sm:text-display-xs">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary-600">
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{post.excerpt}</p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/blog/${post.slug}`}
              className="group/cta inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-[0.95rem] font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-primary-700 hover:shadow-glow-navy"
            >
              Read the story
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-1"
              />
            </Link>

            <Tags categories={post.categories} />
          </div>
        </div>
      </article>
    </>
  );
}

function Tags({ categories }: { categories: { id: number; name: string; slug: string }[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={categoryHref(cat.slug)}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-primary-700"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
        active
          ? "border-primary-600 bg-primary-600 text-white"
          : "border-border-strong bg-white text-muted hover:border-primary-400 hover:text-primary-600"
      )}
    >
      {children}
    </Link>
  );
}

function Count({ children }: { children?: number }) {
  if (children === undefined) return null;

  return (
    <span className="rounded-full bg-black/10 px-1.5 text-[0.7rem] font-bold">{children}</span>
  );
}

function PageArrow({
  href,
  disabled,
  label,
  children,
}: {
  href: string;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-border-strong"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
    >
      {children}
    </Link>
  );
}
