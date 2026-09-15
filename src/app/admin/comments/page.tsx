import Link from "next/link";
import { BadgeCheck, CornerDownRight, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { formatDateTime, initialsOf } from "@/lib/content";
import { AdminButton, AdminHeader, Field, Panel, Pill } from "@/components/admin/ui";
import { deleteComment, replyToComment, setCommentApproved } from "../actions";

export const metadata = { title: "Comments" };

export default async function CommentsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    replied?: string;
    reply?: string;
    filter?: string;
  }>;
}) {
  const params = await searchParams;
  const replyingTo = Number(params.reply) || null;
  const filter = params.filter === "hidden" ? "hidden" : params.filter === "staff" ? "staff" : "all";

  const where =
    filter === "hidden" ? { approved: false } : filter === "staff" ? { isStaff: true } : {};

  const [comments, counts] = await Promise.all([
    db.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        post: { select: { slug: true, title: true } },
        parent: { select: { id: true, name: true } },
      },
    }),
    Promise.all([
      db.comment.count(),
      db.comment.count({ where: { approved: false } }),
      db.comment.count({ where: { isStaff: true } }),
    ]),
  ]);

  const [totalCount, hiddenCount, staffCount] = counts;

  const tabs = [
    { key: "all", label: "All", count: totalCount, href: "/admin/comments" },
    { key: "hidden", label: "Hidden", count: hiddenCount, href: "/admin/comments?filter=hidden" },
    { key: "staff", label: "Somtel replies", count: staffCount, href: "/admin/comments?filter=staff" },
  ];

  return (
    <>
      <AdminHeader
        title="Comments"
        description="Everything readers have left on the blog. Reply as Somtel, hide anything that does not belong, or delete it outright."
      />

      {(params.saved || params.deleted || params.replied) && (
        <p
          role="status"
          className="mb-6 rounded-lg border border-accent-500 bg-accent-500/10 px-4 py-3 text-sm font-medium text-primary-700"
        >
          {params.replied
            ? "Your reply is on the post."
            : params.deleted
              ? "Comment deleted."
              : "Updated. The post has been refreshed."}
        </p>
      )}

      <nav className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={filter === tab.key ? "page" : undefined}
            className={
              filter === tab.key
                ? "inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
                : "inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
            }
          >
            {tab.label}
            <span
              className={
                filter === tab.key
                  ? "rounded-full bg-white/20 px-1.5 text-xs font-bold"
                  : "rounded-full bg-gray-100 px-1.5 text-xs font-bold"
              }
            >
              {tab.count}
            </span>
          </Link>
        ))}
      </nav>

      {comments.length === 0 ? (
        <Panel>
          <p className="text-muted">
            {filter === "hidden"
              ? "Nothing is hidden."
              : filter === "staff"
                ? "Somtel has not replied to anything yet."
                : "No comments have been left yet."}
          </p>
        </Panel>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Panel>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={
                        comment.isStaff
                          ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
                          : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-muted"
                      }
                    >
                      {initialsOf(comment.name)}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-fg">{comment.name}</span>

                        {comment.isStaff && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[0.7rem] font-semibold text-primary-700">
                            <BadgeCheck size={12} aria-hidden="true" />
                            Somtel
                          </span>
                        )}

                        <Pill on={comment.approved} labels={["Live", "Hidden"]} />
                      </div>

                      <p className="text-xs text-muted">
                        {formatDateTime(comment.createdAt)}
                        {comment.email && <> · {comment.email}</>}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${comment.post.slug}#comments`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                  >
                    <span className="max-w-[16rem] truncate">{comment.post.title}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </Link>
                </div>

                {comment.parent && (
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                    <CornerDownRight size={13} aria-hidden="true" />
                    In reply to {comment.parent.name}
                  </p>
                )}

                <p className="mt-3 whitespace-pre-line rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-fg">
                  {comment.body}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 border-t border-gray-200 pt-4">
                  {!comment.isStaff && (
                    <AdminButton
                      href={
                        replyingTo === comment.id
                          ? "/admin/comments"
                          : `/admin/comments?reply=${comment.id}`
                      }
                      variant="ghost"
                    >
                      {replyingTo === comment.id ? "Cancel reply" : "Reply as Somtel"}
                    </AdminButton>
                  )}

                  <form action={setCommentApproved}>
                    <input type="hidden" name="id" value={comment.id} />
                    <input type="hidden" name="approved" value={comment.approved ? "false" : "true"} />
                    <AdminButton variant="ghost">
                      {comment.approved ? "Hide from site" : "Show on site"}
                    </AdminButton>
                  </form>

                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <AdminButton variant="danger">Delete</AdminButton>
                  </form>
                </div>

                {replyingTo === comment.id && (
                  <form action={replyToComment} className="mt-5 border-t border-gray-200 pt-5">
                    <input type="hidden" name="parentId" value={comment.id} />

                    <Field
                      label={`Reply to ${comment.name}`}
                      name="body"
                      as="textarea"
                      rows={4}
                      required
                      hint="Posted on the article under your name, with a Somtel badge."
                    />

                    <div className="mt-4 flex gap-3">
                      <AdminButton>Post reply</AdminButton>
                      <AdminButton href="/admin/comments" variant="ghost" type="button">
                        Cancel
                      </AdminButton>
                    </div>
                  </form>
                )}
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
