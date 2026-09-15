"use server";

// Posting a comment, or a reply to one.
//
// This is the only write on the public site that anyone can reach without
// signing in, so it does its own checking rather than trusting the form: the
// post has to exist and be published, the parent has to belong to that post,
// and the text has to be worth storing.

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export type CommentState = { error?: string; ok?: boolean };

const NAME_MAX = 60;
const BODY_MAX = 2000;

export async function addComment(
  _prev: CommentState,
  formData: FormData
): Promise<CommentState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const parentId = Number(formData.get("parentId")) || null;

  // A field no person can see. Bots fill in everything they find, so anything
  // arriving here is automated: accept it, store nothing, and say nothing that
  // would tell the sender which of the two happened.
  if (String(formData.get("website") ?? "").trim()) return { ok: true };

  if (!name || !body) return { error: "Add your name and a comment." };
  if (name.length > NAME_MAX) return { error: "That name is too long." };
  if (body.length > BODY_MAX) return { error: "Please keep it under 2000 characters." };

  // A typo here means we would never be able to reply, so it is worth catching.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "That email address does not look right." };
  }

  const post = await db.post.findUnique({
    where: { slug },
    select: { id: true, published: true },
  });

  if (!post || !post.published) return { error: "That post is no longer available." };

  // Keep threads two deep. Replying to a reply attaches to the same top-level
  // comment, so the conversation stays readable at phone width instead of
  // indenting until there is no room left for the words.
  let attachTo: number | null = null;

  if (parentId) {
    const parent = await db.comment.findUnique({
      where: { id: parentId },
      select: { postId: true, parentId: true, approved: true },
    });

    // A parent from another post, or one that has been hidden, is not a thread
    // anyone should be able to add to.
    if (!parent || parent.postId !== post.id || !parent.approved) {
      return { error: "That comment is no longer available." };
    }

    attachTo = parent.parentId ?? parentId;
  }

  await db.comment.create({
    data: {
      postId: post.id,
      parentId: attachTo,
      name,
      email: email || null,
      body,
    },
  });

  revalidatePath(`/blog/${slug}`);

  return { ok: true };
}
