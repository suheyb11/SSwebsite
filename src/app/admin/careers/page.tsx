import Link from "next/link";
import { Inbox } from "lucide-react";
import { db } from "@/lib/db";
import { formatLongDate } from "@/lib/content";
import { toDateInput } from "@/lib/datetime-input";
import { AdminButton, AdminHeader, Field, Flash, Panel, Pill, Table, Toggle } from "@/components/admin/ui";
import { deleteJob, saveJob } from "../actions";

export const metadata = { title: "Careers" };

const ERRORS: Record<string, string> = {
  slug: "That web address is already used by another role. Give this one a different address.",
};

export default async function CareersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    edit?: string;
    new?: string;
    remove?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const editingId = Number(params.edit) || null;
  const removingId = Number(params.remove) || null;
  const creating = params.new === "1";

  const [jobs, applications] = await Promise.all([
    db.job.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      include: { _count: { select: { applications: true } } },
    }),
    db.jobApplication.count(),
  ]);

  const editing = editingId ? await db.job.findUnique({ where: { id: editingId } }) : null;
  const removing = removingId ? jobs.find((job) => job.id === removingId) ?? null : null;
  const showForm = creating || Boolean(editing);

  return (
    <>
      <AdminHeader
        title="Careers"
        description="The roles on the careers page. A closed role stays readable but stops accepting applications."
        action={
          !showForm && (
            <div className="flex flex-wrap gap-3">
              <AdminButton href="/admin/careers/applications" variant="ghost">
                <Inbox size={16} aria-hidden="true" />
                Applications
                <span className="rounded-full bg-accent-500 px-2 py-0.5 text-xs font-bold text-primary-700">
                  {applications}
                </span>
              </AdminButton>
              <AdminButton href="/admin/careers?new=1">Post a role</AdminButton>
            </div>
          )
        }
      />

      <Flash
        saved={Boolean(params.saved)}
        deleted={Boolean(params.deleted)}
        error={params.error ? ERRORS[params.error] : undefined}
      />

      {removing && (
        <Panel className="mb-8 border-primary-600">
          <h2 className="text-lg font-semibold text-fg">Delete “{removing.title}”?</h2>

          <p className="mt-2 text-muted">
            {removing._count.applications}{" "}
            {removing._count.applications === 1 ? "person has" : "people have"} applied for this
            role. Deleting it deletes{" "}
            {removing._count.applications === 1 ? "their application" : "their applications"} too,
            and there is no copy anywhere else.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <form action={deleteJob}>
              <input type="hidden" name="id" value={removing.id} />
              <AdminButton variant="danger">
                Delete the role and {removing._count.applications}{" "}
                {removing._count.applications === 1 ? "application" : "applications"}
              </AdminButton>
            </form>

            <AdminButton
              href={`/admin/careers/applications?job=${removing.id}`}
              variant="ghost"
              type="button"
            >
              Read them first
            </AdminButton>

            <AdminButton href="/admin/careers" variant="ghost" type="button">
              Cancel
            </AdminButton>
          </div>
        </Panel>
      )}

      {showForm && (
        <Panel className="mb-8">
          <h2 className="mb-6 text-lg font-semibold text-fg">
            {editing ? "Edit role" : "New role"}
          </h2>

          <form action={saveJob} className="space-y-5">
            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Job title" name="title" defaultValue={editing?.title} required />
              <Field
                label="Web address"
                name="slug"
                defaultValue={editing?.slug}
                hint="Leave blank and it is built from the title. Becomes /Career/your-address."
              />
              <Field
                label="Department"
                name="department"
                defaultValue={editing?.department}
                hint="Such as Technology, Commercial, Finance. The careers page filters on this."
              />
              <Field
                label="Location"
                name="location"
                defaultValue={editing?.location}
                hint="Such as Mogadishu or Hargeisa. Also a filter on the careers page."
              />
              <Field
                label="Contract"
                name="type"
                defaultValue={editing?.type}
                hint="Such as Full-time, Contract, Internship."
              />
              <Field
                label="Closing date"
                name="deadline"
                type="date"
                defaultValue={toDateInput(editing?.deadline)}
                hint="Leave blank for a role with no deadline."
              />
            </div>

            <Field
              label="The role"
              name="detail"
              as="textarea"
              rows={16}
              defaultValue={editing?.detail}
              required
              hint="Markdown: ## heading, - bullet, **bold**. Usually about the role, responsibilities and requirements."
            />

            {/*
              Stored as the words "Opened" and "Closed" because that is what the
              apply route and the careers page both test against. A checkbox
              here, the right word in the database.
            */}
            <div className="border-t border-gray-200 pt-5">
              <Toggle
                label="Accepting applications"
                name="statusOpen"
                defaultChecked={(editing?.status ?? "Opened") === "Opened"}
                hint="Turn this off to close the role. It stays on the site, marked closed, and the apply form is refused."
              />
            </div>

            <div className="flex gap-3 border-t border-gray-200 pt-5">
              <AdminButton>{editing ? "Save changes" : "Post role"}</AdminButton>
              <AdminButton href="/admin/careers" variant="ghost" type="button">
                Cancel
              </AdminButton>
            </div>
          </form>
        </Panel>
      )}

      <Table head={["Role", "Department", "Location", "Closes", "Status", "", ""]}>
        {jobs.map((job) => (
          <tr key={job.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">
              <span className="font-medium text-fg">{job.title}</span>
              <span className="block text-xs text-muted">
                /Career/{job.slug}
                {job._count.applications > 0 && (
                  <>
                    {" · "}
                    <Link
                      href={`/admin/careers/applications?job=${job.id}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {job._count.applications}{" "}
                      {job._count.applications === 1 ? "application" : "applications"}
                    </Link>
                  </>
                )}
              </span>
            </td>
            <td className="px-4 py-3 text-muted">{job.department ?? "—"}</td>
            <td className="px-4 py-3 text-muted">{job.location ?? "—"}</td>
            <td className="whitespace-nowrap px-4 py-3 text-muted">
              {formatLongDate(job.deadline)}
            </td>
            <td className="whitespace-nowrap px-4 py-3">
              <Pill on={job.status === "Opened"} labels={["Open", "Closed"]} />
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right">
              <AdminButton href={`/admin/careers?edit=${job.id}`} variant="ghost">
                Edit
              </AdminButton>
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right">
              {/*
                Deleting a role takes the applications sent to it as well — the
                schema cascades. A role nobody has applied to goes in one press;
                one that people have written to asks first, because those
                messages exist nowhere else.
              */}
              {job._count.applications > 0 ? (
                <AdminButton href={`/admin/careers?remove=${job.id}`} variant="danger">
                  Delete
                </AdminButton>
              ) : (
                <form action={deleteJob}>
                  <input type="hidden" name="id" value={job.id} />
                  <AdminButton variant="danger">Delete</AdminButton>
                </form>
              )}
            </td>
          </tr>
        ))}
      </Table>

      {jobs.length === 0 && (
        <p className="mt-6 text-muted">
          No roles posted yet.{" "}
          <Link href="/admin/careers?new=1" className="font-medium text-primary-600 hover:underline">
            Post the first one
          </Link>
          .
        </p>
      )}
    </>
  );
}
