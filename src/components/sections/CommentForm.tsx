"use client";

// The box someone types a comment into — used both for a new comment at the
// foot of the article and, in its compact form, for a reply inside a thread.

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { addComment, type CommentState } from "@/app/(site)/blog/comments";
import { cx } from "@/components/ui";

export default function CommentForm({
  slug,
  parentId,
  compact = false,
  autoFocus = false,
  onPosted,
}: {
  slug: string;
  parentId?: number;
  compact?: boolean;
  autoFocus?: boolean;
  onPosted?: () => void;
}) {
  const [state, formAction] = useActionState<CommentState, FormData>(addComment, {});
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!state.ok) return;

    // Clear the fields, so the box is ready for the next comment rather than
    // still holding what was just sent.
    form.current?.reset();
    onPosted?.();

    // The list above is a server component. revalidatePath in the action drops
    // the cached page, but this route is prerendered and what the reader is
    // looking at was rendered before their comment existed — without asking for
    // it again they post, see the thank-you, and no comment. This re-renders it.
    router.refresh();
    // Keyed on the state object, not on state.ok: a second comment returns
    // ok: true all over again, and depending on the boolean would leave this
    // effect thinking nothing had changed.
  }, [state, onPosted, router]);

  return (
    <form
      ref={form}
      action={formAction}
      className={cx(
        "rounded-2xl border border-border-strong bg-white",
        compact ? "p-4" : "p-6 sm:p-7"
      )}
    >
      <input type="hidden" name="slug" value={slug} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}

      {/* Hidden from people and from screen readers; only bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`website-${parentId ?? "root"}`}>Leave this empty</label>
        <input id={`website-${parentId ?? "root"}`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {!compact && (
        <>
          <h3 className="text-lg font-semibold text-fg">Join the conversation</h3>
          <p className="mt-1.5 text-sm text-muted">
            Your email is never published — we only use it if we need to reply directly.
          </p>
        </>
      )}

      <div className={cx("grid gap-3", compact ? "mt-0" : "mt-5", !compact && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`name-${parentId ?? "root"}`} className="field-label">
            Name
          </label>
          <input
            id={`name-${parentId ?? "root"}`}
            name="name"
            required
            maxLength={60}
            autoComplete="name"
            placeholder="Your name"
            className="field"
          />
        </div>

        <div>
          <label htmlFor={`email-${parentId ?? "root"}`} className="field-label">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={`email-${parentId ?? "root"}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="field"
          />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={`body-${parentId ?? "root"}`} className="field-label">
          {parentId ? "Your reply" : "Comment"}
        </label>
        <textarea
          id={`body-${parentId ?? "root"}`}
          name="body"
          required
          rows={compact ? 3 : 4}
          maxLength={2000}
          autoFocus={autoFocus}
          placeholder={parentId ? "Write a reply…" : "Share your thoughts on this article…"}
          className="field resize-y"
        />
      </div>

      {state.error && (
        <p role="alert" className="mt-3 rounded-lg bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700">
          {state.error}
        </p>
      )}

      {state.ok && (
        <p role="status" className="mt-3 rounded-lg bg-sky-100 px-4 py-3 text-sm font-medium text-sky-700">
          Thank you — your comment is now on the page.
        </p>
      )}

      <div className="mt-4">
        <Submit compact={compact} isReply={Boolean(parentId)} />
      </div>
    </form>
  );
}

function Submit({ compact, isReply }: { compact: boolean; isReply: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 font-semibold text-white",
        "transition-[background-color,box-shadow] duration-200 hover:bg-primary-700 hover:shadow-glow-navy",
        "disabled:cursor-not-allowed disabled:opacity-60",
        compact ? "px-5 py-2 text-sm" : "px-6 py-2.5 text-[0.95rem]"
      )}
    >
      <Send size={15} aria-hidden="true" />
      {pending ? "Posting…" : isReply ? "Post reply" : "Post comment"}
    </button>
  );
}
