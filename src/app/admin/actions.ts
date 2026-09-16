"use server";

// Every write the dashboard makes.
//
// Server Actions rather than API routes: the form posts straight to the function,
// so there is no fetch to write, no endpoint to keep in step with the form, and
// the browser works even with JavaScript off.
//
// Each action re-checks the session itself. The middleware already guards the
// pages, but an action is its own entry point and must not rely on someone
// else's check.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { slugify } from "@/lib/content";
import { fromDateInput } from "@/lib/datetime-input";
import { verifyPassword } from "@/lib/auth";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSession, readSession } from "@/lib/session";

/** The signed-in admin, or null. */
export async function currentUser() {
  const store = await cookies();
  const userId = await readSession(store.get(SESSION_COOKIE)?.value);
  if (!userId) return null;

  return db.adminUser.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
}

/** Throws out anyone who is not signed in. Called at the top of every action. */
async function requireUser() {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Refreshes every page that shows content from the database. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

/**
 * The web address for a new row: whatever the admin typed, or the title turned
 * into one. Always run through `slugify`, so a slug typed with capitals, spaces
 * or an apostrophe still comes out as a usable address.
 */
function slugFrom(formData: FormData, titleField: string) {
  const typed = String(formData.get("slug") ?? "").trim();
  const slug = slugify(typed || String(formData.get(titleField) ?? ""));

  // Only reachable if the title was empty too, which the form prevents.
  return slug || `untitled-${Date.now()}`;
}

/** Prisma's "a row with this unique value already exists". */
function isDuplicate(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "P2002"
  );
}

/**
 * Runs a create or an update and ends the request the way the dashboard
 * expects.
 *
 * Two web addresses cannot be the same, and the admin has no way to know which
 * ones are taken. Rather than letting Prisma's error reach the error page —
 * where the half-typed form is lost — the clash comes back to the same form
 * with a message, and everything that was typed is still in the fields.
 */
async function writing(base: string, id: number | null, write: () => Promise<unknown>) {
  try {
    await write();
  } catch (error) {
    if (isDuplicate(error)) {
      redirect(`${base}?${id ? `edit=${id}` : "new=1"}&error=slug`);
    }
    throw error;
  }

  revalidateSite();
  redirect(`${base}?saved=1`);
}


// ---------- sign in / out ----------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) return { error: "Enter your email and password." };

  const user = await db.adminUser.findUnique({ where: { email } });

  // One message for both cases, so this cannot be used to discover which
  // addresses have an account.
  const failed = { error: "Those details did not match an account." };
  if (!user) return failed;
  if (!(await verifyPassword(password, user.passwordHash))) return failed;

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSession(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  await db.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  // Only ever return to somewhere inside the dashboard. The trailing slash
  // matters: without it "/adminSOMETHINGELSE" would pass the check too.
  const inside = next === "/admin" || next.startsWith("/admin/");
  redirect(inside ? next : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- plans and prices ----------

export async function savePlan(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id"));
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  await db.plan.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? "").trim(),
      price: Number(formData.get("price")) || 0,
      unit: String(formData.get("unit") ?? "").trim() || null,
      highlight: formData.get("highlight") === "on",
      // Stored as JSON because SQLite has no array type — the same convention
      // the rest of the schema uses.
      features: JSON.stringify(features),
    },
  });

  revalidateSite();
  redirect("/admin/plans?saved=1");
}

// ---------- blog ----------

export async function savePost(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id")) || null;

  const data = {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    author: String(formData.get("author") ?? "Somtel").trim(),
    published: formData.get("published") === "on",
  };

  if (id) await db.post.update({ where: { id }, data });
  else await db.post.create({ data });

  revalidateSite();
  redirect("/admin/blog?saved=1");
}

export async function deletePost(formData: FormData) {
  await requireUser();

  await db.post.delete({ where: { id: Number(formData.get("id")) } });

  revalidateSite();
  redirect("/admin/blog?deleted=1");
}

// ---------- site settings ----------

/**
 * Saves the key/value settings rows — contact details, social links and the two
 * app download links. Only keys the form actually posted are touched, so a page
 * that edits one group cannot blank out another.
 */
export async function saveSettings(formData: FormData) {
  await requireUser();

  for (const [key, value] of formData.entries()) {
    // Next puts its own bookkeeping fields in the same FormData.
    if (key.startsWith("$")) continue;

    await db.setting.upsert({
      where: { key },
      update: { value: String(value).trim() },
      create: { key, value: String(value).trim() },
    });
  }

  revalidateSite();
  redirect("/admin/settings?saved=1");
}

// ---------- comments ----------

/** Hides a comment from the site, or puts it back. Its replies come with it. */
export async function setCommentApproved(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id"));
  const approved = formData.get("approved") === "true";

  const comment = await db.comment.update({
    where: { id },
    data: { approved },
    select: { post: { select: { slug: true } } },
  });

  revalidatePath(`/blog/${comment.post.slug}`);
  redirect(`/admin/comments?saved=1`);
}

export async function deleteComment(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id"));

  // Read the slug before the row goes, so the page can still be revalidated.
  const comment = await db.comment.findUnique({
    where: { id },
    select: { post: { select: { slug: true } } },
  });

  await db.comment.delete({ where: { id } });

  if (comment) revalidatePath(`/blog/${comment.post.slug}`);
  redirect("/admin/comments?deleted=1");
}

/**
 * Answers a comment as Somtel. The reply is stored like any other, with the
 * staff flag set so the site can badge it, and it is attached to the top of the
 * thread rather than nested under a reply.
 */
export async function replyToComment(formData: FormData) {
  const user = await requireUser();

  const parentId = Number(formData.get("parentId"));
  const body = String(formData.get("body") ?? "").trim();

  if (!body) redirect(`/admin/comments?reply=${parentId}&empty=1`);

  const parent = await db.comment.findUnique({
    where: { id: parentId },
    select: { postId: true, parentId: true, post: { select: { slug: true } } },
  });

  if (!parent) redirect("/admin/comments");

  await db.comment.create({
    data: {
      postId: parent.postId,
      parentId: parent.parentId ?? parentId,
      name: user.name,
      body,
      isStaff: true,
    },
  });

  revalidatePath(`/blog/${parent.post.slug}`);
  redirect("/admin/comments?replied=1");
}

// ---------- offers and popups ----------

export async function savePromo(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id")) || null;

  /** A blank date field means "no limit", not 1970. */
  const date = (name: string) => {
    const value = String(formData.get(name) ?? "").trim();
    return value ? new Date(value) : null;
  };

  const data = {
    kind: String(formData.get("kind") ?? "banner"),
    title: String(formData.get("title") ?? "").trim(),
    text: String(formData.get("text") ?? "").trim() || null,
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim() || null,
    ctaHref: String(formData.get("ctaHref") ?? "").trim() || null,
    media: String(formData.get("media") ?? "").trim() || null,
    startsAt: date("startsAt"),
    endsAt: date("endsAt"),
    active: formData.get("active") === "on",
  };

  if (id) await db.promo.update({ where: { id }, data });
  else await db.promo.create({ data });

  revalidateSite();
  redirect("/admin/promos?saved=1");
}

export async function deletePromo(formData: FormData) {
  await requireUser();

  await db.promo.delete({ where: { id: Number(formData.get("id")) } });

  revalidateSite();
  redirect("/admin/promos?deleted=1");
}

// ---------- events ----------
//
// Events are not blog posts: they carry a date, a place and an upcoming/past
// split that the site works out from the date itself. Nothing has to be moved
// between the two lists by hand — an event becomes "past" when its end time
// goes by, so the only date that matters here is the real one.

export async function saveEvent(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id")) || null;
  const startsAt = fromDateInput(formData.get("startsAt"));

  // The one field with no sensible default: an event without a date cannot be
  // placed on the page at all.
  if (!startsAt) {
    redirect(`/admin/events?${id ? `edit=${id}` : "new=1"}&error=date`);
  }

  const data = {
    title: String(formData.get("title") ?? "").trim(),
    slug: slugFrom(formData, "title"),
    summary: String(formData.get("summary") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    venue: String(formData.get("venue") ?? "").trim() || null,
    city: String(formData.get("city") ?? "").trim() || null,
    startsAt,
    endsAt: fromDateInput(formData.get("endsAt")),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim() || null,
    ctaHref: String(formData.get("ctaHref") ?? "").trim() || null,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  };

  await writing("/admin/events", id, () =>
    id ? db.event.update({ where: { id }, data }) : db.event.create({ data })
  );
}

export async function deleteEvent(formData: FormData) {
  await requireUser();

  await db.event.delete({ where: { id: Number(formData.get("id")) } });

  revalidateSite();
  redirect("/admin/events?deleted=1");
}

// ---------- careers ----------

export async function saveJob(formData: FormData) {
  await requireUser();

  const id = Number(formData.get("id")) || null;

  const data = {
    title: String(formData.get("title") ?? "").trim(),
    slug: slugFrom(formData, "title"),
    type: String(formData.get("type") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    department: String(formData.get("department") ?? "").trim() || null,
    detail: String(formData.get("detail") ?? ""),
    deadline: fromDateInput(formData.get("deadline")),
    // "Opened" and "Closed" are the two words the careers page and the apply
    // route both test against, so the toggle has to come back out as one of
    // them rather than as a boolean.
    status: formData.get("statusOpen") === "on" ? "Opened" : "Closed",
  };

  await writing("/admin/careers", id, () =>
    id ? db.job.update({ where: { id }, data }) : db.job.create({ data })
  );
}

export async function deleteJob(formData: FormData) {
  await requireUser();

  // Applications are attached to the role and go with it — the schema cascades,
  // which is why the page warns before the button is pressed.
  await db.job.delete({ where: { id: Number(formData.get("id")) } });

  revalidateSite();
  redirect("/admin/careers?deleted=1");
}

export async function deleteApplication(formData: FormData) {
  await requireUser();

  await db.jobApplication.delete({ where: { id: Number(formData.get("id")) } });

  redirect("/admin/careers/applications?deleted=1");
}
