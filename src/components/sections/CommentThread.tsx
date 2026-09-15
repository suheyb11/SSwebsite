"use client";

// The conversation under an article.
//
// Client-side because one thing here is interactive: the Reply button opens a
// box under the comment it belongs to, and only one box is open at a time. The
// comments themselves are rendered from data the server has already fetched.

import { useState } from "react";
import { BadgeCheck, CornerDownRight, MessageSquare, Reply } from "lucide-react";
import { initialsOf } from "@/lib/content";
import { cx } from "@/components/ui";
import CommentForm from "./CommentForm";

export type CommentView = {
  id: number;
  name: string;
  body: string;
  isStaff: boolean;
  /** ISO, for the <time> attribute. */
  createdAt: string;
  /**
   * The timestamp already written out. Formatting it here instead would use the
   * server's timezone during SSR and the reader's on hydration, and React would
   * report the two renders as a mismatch.
   */
  postedLabel: string;
  replies: CommentView[];
};

/**
 * A stable colour per commenter, so the same name keeps the same avatar as you
 * read down the page. Two brand tints and a neutral, nothing louder.
 */
const AVATARS = [
  "bg-primary-100 text-primary-700",
  "bg-sky-100 text-sky-700",
  "bg-accent-500/25 text-primary-700",
];

function avatarTone(name: string) {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return AVATARS[sum % AVATARS.length];
}

export default function CommentThread({
  slug,
  comments,
  total,
}: {
  slug: string;
  comments: CommentView[];
  total: number;
}) {
  const [replyTo, setReplyTo] = useState<number | null>(null);

  return (
    <section id="comments" className="mt-14 scroll-mt-28">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
          <MessageSquare size={18} aria-hidden="true" />
        </span>

        <h2 className="text-xl font-semibold text-fg sm:text-2xl">
          {total === 0 ? "No comments yet" : total === 1 ? "1 comment" : `${total} comments`}
        </h2>
      </div>

      {comments.length > 0 && (
        <ol className="mt-8 space-y-5">
          {comments.map((comment) => (
            <li key={comment.id}>
              <article className="rounded-2xl border border-border-strong bg-white p-5 sm:p-6">
                <Head comment={comment} />

                <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">
                  {comment.body}
                </p>

                <button
                  type="button"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  aria-expanded={replyTo === comment.id}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-accent-600"
                >
                  <Reply size={15} aria-hidden="true" />
                  {replyTo === comment.id ? "Cancel" : "Reply"}
                </button>

                {comment.replies.length > 0 && (
                  <ol className="mt-5 space-y-4 border-l-2 border-border pl-4 sm:pl-6">
                    {comment.replies.map((reply) => (
                      <li key={reply.id}>
                        <article>
                          <Head comment={reply} small />

                          <p className="mt-2 whitespace-pre-line text-[0.925rem] leading-relaxed text-muted">
                            {reply.body}
                          </p>

                          <button
                            type="button"
                            onClick={() => setReplyTo(replyTo === reply.id ? null : reply.id)}
                            aria-expanded={replyTo === reply.id}
                            className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-primary-600 transition-colors hover:text-accent-600"
                          >
                            <CornerDownRight size={13} aria-hidden="true" />
                            {replyTo === reply.id ? "Cancel" : "Reply"}
                          </button>

                          {replyTo === reply.id && (
                            <div className="mt-3">
                              <CommentForm
                                slug={slug}
                                parentId={reply.id}
                                compact
                                autoFocus
                                onPosted={() => setReplyTo(null)}
                              />
                            </div>
                          )}
                        </article>
                      </li>
                    ))}
                  </ol>
                )}

                {replyTo === comment.id && (
                  <div className="mt-4">
                    <CommentForm
                      slug={slug}
                      parentId={comment.id}
                      compact
                      autoFocus
                      onPosted={() => setReplyTo(null)}
                    />
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-8">
        <CommentForm slug={slug} />
      </div>
    </section>
  );
}

/** Avatar, name, staff badge and timestamp — the same row for both levels. */
function Head({ comment, small = false }: { comment: CommentView; small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={cx(
          "flex shrink-0 items-center justify-center rounded-full font-semibold",
          small ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
          comment.isStaff ? "bg-primary-600 text-white" : avatarTone(comment.name)
        )}
      >
        {initialsOf(comment.name)}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={cx("font-semibold text-fg", small && "text-[0.925rem]")}>
            {comment.name}
          </span>

          {comment.isStaff && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[0.7rem] font-semibold text-primary-700">
              <BadgeCheck size={12} aria-hidden="true" />
              Somtel
            </span>
          )}
        </div>

        <time dateTime={comment.createdAt} className="block text-xs text-muted">
          {comment.postedLabel}
        </time>
      </div>
    </div>
  );
}
