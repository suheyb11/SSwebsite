import Link from "next/link";
import { db } from "@/lib/db";
import { formatEventDate, isEventOver } from "@/lib/content";
import { toDateTimeInput } from "@/lib/datetime-input";
import { AdminButton, AdminHeader, Field, Flash, Panel, Pill, Table, Toggle } from "@/components/admin/ui";
import { deleteEvent, saveEvent } from "../actions";

export const metadata = { title: "Events" };

/** Whether an event is upcoming depends on the time right now, not build time. */
export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  slug: "That web address is already used by another event. Give this one a different address.",
  date: "An event needs a start date — that is what decides whether it is upcoming or past.",
};

export default async function EventsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    deleted?: string;
    edit?: string;
    new?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const editingId = Number(params.edit) || null;
  const creating = params.new === "1";

  const events = await db.event.findMany({ orderBy: { startsAt: "desc" } });
  const editing = editingId ? await db.event.findUnique({ where: { id: editingId } }) : null;

  const showForm = creating || Boolean(editing);
  const now = new Date();

  return (
    <>
      <AdminHeader
        title="Events"
        description="Launches, roadshows and community days. An event moves from the upcoming list to the past one by itself, as soon as its end time goes by."
        action={!showForm && <AdminButton href="/admin/events?new=1">Add an event</AdminButton>}
      />

      <Flash
        saved={Boolean(params.saved)}
        deleted={Boolean(params.deleted)}
        error={params.error ? ERRORS[params.error] : undefined}
      />

      {showForm && (
        <Panel className="mb-8">
          <h2 className="mb-6 text-lg font-semibold text-fg">
            {editing ? "Edit event" : "New event"}
          </h2>

          <form action={saveEvent} className="space-y-5">
            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title" name="title" defaultValue={editing?.title} required />
              <Field
                label="Web address"
                name="slug"
                defaultValue={editing?.slug}
                hint="Leave blank and it is built from the title. Becomes /events/your-address."
              />
            </div>

            <Field
              label="Summary"
              name="summary"
              as="textarea"
              rows={2}
              defaultValue={editing?.summary}
              hint="One or two sentences, shown on the events list."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Starts"
                name="startsAt"
                type="datetime-local"
                defaultValue={toDateTimeInput(editing?.startsAt)}
                required
                hint="The date and time the doors open."
              />
              <Field
                label="Ends"
                name="endsAt"
                type="datetime-local"
                defaultValue={toDateTimeInput(editing?.endsAt)}
                hint="Leave blank for a single-day event. It then counts as past at the end of that day."
              />
              <Field label="Venue" name="venue" defaultValue={editing?.venue} />
              <Field label="City" name="city" defaultValue={editing?.city} />
            </div>

            <Field
              label="Picture"
              name="imageUrl"
              defaultValue={editing?.imageUrl}
              hint="A path such as /assets/images/event1.jpg. Left blank, a drawing is used instead."
            />

            <Field
              label="Details"
              name="body"
              as="textarea"
              rows={12}
              defaultValue={editing?.body}
              required
              hint="Markdown: ## heading, - bullet, **bold**, [link](/href), > quote."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Button text"
                name="ctaLabel"
                defaultValue={editing?.ctaLabel}
                hint="Such as Register free. Shown only while the event is still to come."
              />
              <Field
                label="Button link"
                name="ctaHref"
                defaultValue={editing?.ctaHref}
                hint="Where the button goes: /contact-us, or a full web address."
              />
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-5">
              <Toggle
                label="Published"
                name="published"
                defaultChecked={editing?.published ?? true}
                hint="Unpublished events stay hidden from the site."
              />
              <Toggle
                label="Featured"
                name="featured"
                defaultChecked={editing?.featured ?? false}
                hint="Marks this as the headline event. The next one coming up leads the page either way."
              />
            </div>

            <div className="flex gap-3 border-t border-gray-200 pt-5">
              <AdminButton>{editing ? "Save changes" : "Add event"}</AdminButton>
              <AdminButton href="/admin/events" variant="ghost" type="button">
                Cancel
              </AdminButton>
            </div>
          </form>
        </Panel>
      )}

      <Table head={["Event", "When", "Where", "Status", "", ""]}>
        {events.map((event) => {
          const over = isEventOver(event, now);

          return (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <span className="font-medium text-fg">{event.title}</span>
                <span className="block text-xs text-muted">/events/{event.slug}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {formatEventDate(event.startsAt, event.endsAt)}
              </td>
              <td className="px-4 py-3 text-muted">
                {[event.venue, event.city].filter(Boolean).join(", ") || "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <Pill on={event.published} labels={["Published", "Hidden"]} />
                  <Pill on={!over} labels={["Upcoming", "Past"]} />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <AdminButton href={`/admin/events?edit=${event.id}`} variant="ghost">
                  Edit
                </AdminButton>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                {/* A plain form post, so deleting works without JavaScript too. */}
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={event.id} />
                  <AdminButton variant="danger">Delete</AdminButton>
                </form>
              </td>
            </tr>
          );
        })}
      </Table>

      {events.length === 0 && (
        <p className="mt-6 text-muted">
          No events yet.{" "}
          <Link href="/admin/events?new=1" className="font-medium text-primary-600 hover:underline">
            Add the first one
          </Link>
          .
        </p>
      )}
    </>
  );
}
