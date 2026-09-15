import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, ListOrdered, MessageSquare } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate, headingsOf, initialsOf, readingTime } from "@/lib/content";
import { Container, Section, cx } from "@/components/ui";
import Markdown from "@/components/ui/Markdown";
import { FadeIn } from "@/components/motion";
import BlogCover from "@/components/sections/BlogCover";
import Comments from "@/components/sections/Comments";
import ShareButtons from "@/components/sections/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render every published post at build time. */
export async function generateStaticParams() {
  const posts = await db.post.findMany({ where: { published: true }, select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
    include: {
      categories: true,
      _count: { select: { comments: { where: { approved: true } } } },
    },
  });

  if (!post || !post.published) notFound();

  // The posts either side by date, so a reader always has somewhere to go next.
  const [previous, next, related] = await Promise.all([
    db.post.findFirst({
      where: { published: true, postedDate: { lt: post.postedDate } },
      orderBy: { postedDate: "desc" },
      select: { slug: true, title: true },
    }),
    db.post.findFirst({
      where: { published: true, postedDate: { gt: post.postedDate } },
      orderBy: { postedDate: "asc" },
      select: { slug: true, title: true },
    }),
    // Other posts filed under any of the same categories.
    post.categories.length > 0
      ? db.post.findMany({
          where: {
            published: true,
            id: { not: post.id },
            categories: { some: { id: { in: post.categories.map((cat) => cat.id) } } },
          },
          orderBy: { postedDate: "desc" },
          take: 3,
          select: { id: true, slug: true, title: true, imageUrl: true, postedDate: true },
        })
      : Promise.resolve([]),
  ]);

  const headings = headingsOf(post.body);
  const minutes = readingTime(post.body);

  return (
    <>
      {/* Editorial header: the title sits on the brand navy, and the cover
          image steps out of the bottom of it onto the page below. */}
      <header className="relative overflow-hidden bg-primary-600 pt-10 sm:pt-12">
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-90" />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              <li>
                <Link href="/" className="transition-colors hover:text-accent-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-accent-500">
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[16rem] truncate text-white">{post.title}</li>
            </ol>
          </nav>

          {post.categories.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700 transition-opacity hover:opacity-85"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <h1 className="max-w-4xl text-display-sm font-semibold text-white sm:text-display-md">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white/75">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white"
              >
                {initialsOf(post.author)}
              </span>
              <span className="font-semibold text-white">{post.author}</span>
            </span>

            <span aria-hidden="true" className="text-white/30">
              •
            </span>

            <time dateTime={post.postedDate.toISOString()}>{formatDate(post.postedDate)}</time>

            <span aria-hidden="true" className="text-white/30">
              •
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {minutes} min read
            </span>

            <span aria-hidden="true" className="text-white/30">
              •
            </span>

            <a href="#comments" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-500">
              <MessageSquare size={14} aria-hidden="true" />
              {post._count.comments} {post._count.comments === 1 ? "comment" : "comments"}
            </a>
          </div>

          <div className="h-10 sm:h-12" />
        </Container>
      </header>

      {/* The cover sits below the header at its own full 16:9, rather than being
          pulled up over it. Overlapping looked like a design touch on a mockup,
          but it cropped the top of the picture — and these covers have a person
          in them, so it was taking off the top of someone's head. */}
      <Container className="mt-8 sm:mt-10">
        <FadeIn>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-lift">
            <BlogCover post={post} priority sizes="(max-width: 1280px) 100vw, 1200px" />
          </div>
        </FadeIn>
      </Container>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_19rem]">
          <div className="min-w-0">
            <article>
              <FadeIn>
                {post.excerpt && (
                  <p className="border-l-2 border-accent-500 pl-5 text-xl leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-8">
                  <Markdown content={post.body} />
                </div>
              </FadeIn>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
                {post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/blog?category=${cat.slug}`}
                        className="rounded-full border border-border px-3 py-1 text-sm font-medium text-muted transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-primary-700"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}

                <ShareButtons title={post.title} />
              </div>
            </article>

            {(previous || next) && (
              <nav
                aria-label="More posts"
                className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
              >
                <AdjacentLink post={previous} direction="previous" />
                <AdjacentLink post={next} direction="next" />
              </nav>
            )}

            <Comments postId={post.id} slug={post.slug} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 1 && (
              <nav aria-label="On this page" className="surface p-6">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-fg">
                  <ListOrdered size={15} aria-hidden="true" />
                  On this page
                </h2>

                <ol className="mt-4 space-y-2.5 border-l-2 border-border pl-4 text-[0.925rem]">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="block text-muted transition-colors hover:text-primary-600"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="surface p-6">
              <h2 className="eyebrow">Keep reading</h2>
              <Link
                href="/blog"
                className="group mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-primary-600 transition-colors hover:text-accent-600"
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                All blog posts
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <h2 className="text-display-xs font-semibold text-fg">Related posts</h2>
          <div className="accent-rule mt-5" />

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-strong bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary-400 hover:shadow-lift"
              >
                <div className="relative h-40 overflow-hidden">
                  <BlogCover
                    post={item}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <time
                    dateTime={item.postedDate.toISOString()}
                    className="text-xs font-medium text-muted"
                  >
                    {formatDate(item.postedDate)}
                  </time>

                  <h3 className="mt-2 font-semibold leading-snug text-fg transition-colors group-hover:text-primary-600">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

    </>
  );
}

/** The previous or next post, or a dimmed placeholder at either end. */
function AdjacentLink({
  post,
  direction,
}: {
  post: { slug: string; title: string } | null;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  if (!post) return <div aria-hidden="true" className="hidden sm:block" />;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cx(
        "group rounded-2xl border border-border-strong bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary-400 hover:shadow-lift",
        isNext && "sm:text-right"
      )}
    >
      <span
        className={cx(
          "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted",
          isNext && "sm:justify-end"
        )}
      >
        {!isNext && <ArrowLeft size={13} aria-hidden="true" />}
        {isNext ? "Newer post" : "Older post"}
        {isNext && <ArrowRight size={13} aria-hidden="true" />}
      </span>

      <span className="mt-2 block font-semibold leading-snug text-fg transition-colors group-hover:text-primary-600">
        {post.title}
      </span>
    </Link>
  );
}
