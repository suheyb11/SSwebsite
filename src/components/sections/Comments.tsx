// Loads a post's conversation and hands it to the interactive thread.
//
// The query is flat — one row per comment, replies included — and the nesting is
// built here. Fetching replies separately would mean a query per comment, and a
// popular post would pay for it on every render.

import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/content";
import CommentThread, { type CommentView } from "./CommentThread";

export default async function Comments({ postId, slug }: { postId: number; slug: string }) {
  const rows = await db.comment.findMany({
    where: { postId, approved: true },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      parentId: true,
      name: true,
      body: true,
      isStaff: true,
      createdAt: true,
    },
  });

  const view = (row: (typeof rows)[number]): CommentView => ({
    id: row.id,
    name: row.name,
    body: row.body,
    isStaff: row.isStaff,
    createdAt: row.createdAt.toISOString(),
    postedLabel: formatDateTime(row.createdAt),
    replies: [],
  });

  const byId = new Map<number, CommentView>();
  const roots: CommentView[] = [];

  // One pass: rows are in date order, so a parent is always in the map before
  // any reply that points at it.
  for (const row of rows) {
    const comment = view(row);
    byId.set(comment.id, comment);

    const parent = row.parentId ? byId.get(row.parentId) : null;
    if (parent) parent.replies.push(comment);
    else roots.push(comment);
  }

  return <CommentThread slug={slug} comments={roots} total={rows.length} />;
}
