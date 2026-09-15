import { db } from "@/lib/db";
import { formatDate } from "@/lib/content";
import { AdminButton, AdminHeader, Field, Flash, Panel, Pill, Table, Toggle } from "@/components/admin/ui";
import { deletePost, savePost } from "../actions";

export const metadata = { title: "Blog" };

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; edit?: string; new?: string }>;
}) {
  const params = await searchParams;
  const editingId = Number(params.edit) || null;
  const creating = params.new === "1";

  const posts = await db.post.findMany({ orderBy: { postedDate: "desc" } });
  const editing = editingId ? await db.post.findUnique({ where: { id: editingId } }) : null;

  const showForm = creating || Boolean(editing);

  return (
    <>
      <AdminHeader
        title="Blog"
        description="News, events and press releases. A post appears on the site as soon as it is published."
        action={
          !showForm && <AdminButton href="/admin/blog?new=1">Write a post</AdminButton>
        }
      />

      <Flash saved={Boolean(params.saved)} deleted={Boolean(params.deleted)} />

      {showForm && (
        <Panel className="mb-8">
          <h2 className="mb-6 text-lg font-semibold text-fg">
            {editing ? "Edit post" : "New post"}
          </h2>

          <form action={savePost} className="space-y-5">
            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title" name="title" defaultValue={editing?.title} required />
              <Field
                label="Web address"
                name="slug"
                defaultValue={editing?.slug}
                required
                hint="Lowercase words joined by hyphens — this becomes /blog/your-slug."
              />
              <Field label="Author" name="author" defaultValue={editing?.author ?? "Somtel"} />
            </div>

            <Field
              label="Summary"
              name="excerpt"
              as="textarea"
              rows={2}
              defaultValue={editing?.excerpt}
              hint="One or two sentences, shown on the blog list."
            />

            <Field
              label="Cover image"
              name="imageUrl"
              defaultValue={editing?.imageUrl}
              hint="A path such as /assets/images/blog1.jpg, or leave blank."
            />

            <Field
              label="Body"
              name="body"
              as="textarea"
              rows={14}
              defaultValue={editing?.body}
              required
              hint="Markdown: ## heading, - bullet, **bold**, *italic*, [link](/href), > quote."
            />

            <Toggle
              label="Published"
              name="published"
              defaultChecked={editing?.published ?? true}
              hint="Unpublished posts stay hidden from the site."
            />

            <div className="flex gap-3 border-t border-gray-200 pt-5">
              <AdminButton>{editing ? "Save changes" : "Publish post"}</AdminButton>
              <AdminButton href="/admin/blog" variant="ghost" type="button">
                Cancel
              </AdminButton>
            </div>
          </form>
        </Panel>
      )}

      <Table head={["Title", "Date", "Status", "", ""]}>
        {posts.map((post) => (
          <tr key={post.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">
              <span className="font-medium text-fg">{post.title}</span>
              <span className="block text-xs text-muted">/{post.slug}</span>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDate(post.postedDate)}</td>
            <td className="px-4 py-3">
              <Pill on={post.published} labels={["Published", "Draft"]} />
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right">
              <AdminButton href={`/admin/blog?edit=${post.id}`} variant="ghost">
                Edit
              </AdminButton>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right">
              {/* A plain form post, so deleting works without JavaScript too. */}
              <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <AdminButton variant="danger">Delete</AdminButton>
              </form>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
}
