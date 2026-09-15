// One post as a card, and the meta row that goes with it.
//
// Shared so the blog index and the home page's latest-posts row are the same
// card rather than two that drift apart.

import Link from "next/link";
import { ArrowRight, Clock, MessageSquare } from "lucide-react";
import { formatDate, initialsOf, readingTime } from "@/lib/content";
import BlogCover from "./BlogCover";

export type PostCardView = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  imageUrl: string | null;
  author: string;
  postedDate: Date;
  categories: { id: number; name: string; slug: string }[];
  _count: { comments: number };
};

/** What a card needs from the database. Pass this straight to `select`. */
export const postCardSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  body: true,
  imageUrl: true,
  author: true,
  postedDate: true,
  categories: true,
  _count: { select: { comments: { where: { approved: true } } } },
} as const;

/** Author, date, reading time, and the comment count when there is one. */
export function PostMeta({ post }: { post: PostCardView }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-[0.65rem] font-bold text-primary-700"
        >
          {initialsOf(post.author)}
        </span>
        <span className="font-medium text-primary-600">{post.author}</span>
      </span>

      <span aria-hidden="true" className="text-border-strong">
        •
      </span>

      <time dateTime={post.postedDate.toISOString()}>{formatDate(post.postedDate)}</time>

      <span aria-hidden="true" className="text-border-strong">
        •
      </span>

      <span className="inline-flex items-center gap-1.5">
        <Clock size={13} aria-hidden="true" />
        {readingTime(post.body)} min read
      </span>

      {post._count.comments > 0 && (
        <>
          <span aria-hidden="true" className="text-border-strong">
            •
          </span>

          <Link
            href={`/blog/${post.slug}#comments`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary-600"
          >
            <MessageSquare size={13} aria-hidden="true" />
            {post._count.comments}
            <span className="sr-only">
              {post._count.comments === 1 ? "comment" : "comments"}
            </span>
          </Link>
        </>
      )}
    </div>
  );
}

export default function PostCard({ post }: { post: PostCardView }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-white transition-[box-shadow,border-color] duration-300 hover:border-primary-400 hover:shadow-lift">
      <Link href={`/blog/${post.slug}`} className="relative block h-48 overflow-hidden">
        <BlogCover
          post={post}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />

        {post.categories[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur-sm">
            {post.categories[0].name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />

        <h3 className="mt-3 text-lg font-semibold leading-snug text-fg">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary-600">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2.5 line-clamp-3 flex-1 text-[0.925rem] leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-accent-600"
        >
          Read more
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
