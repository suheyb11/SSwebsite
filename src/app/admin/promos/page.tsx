import { db } from "@/lib/db";
import { AdminButton, AdminHeader, Field, Flash, Panel, Pill, Table, Toggle } from "@/components/admin/ui";
import { deletePromo, savePromo } from "../actions";

export const metadata = { title: "Offers & popups" };

/** `datetime-local` wants "YYYY-MM-DDTHH:mm" in local time, not an ISO string. */
function forInput(date: Date | null) {
  if (!date) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default async function PromosPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; edit?: string; new?: string }>;
}) {
  const params = await searchParams;
  const editingId = Number(params.edit) || null;
  const creating = params.new === "1";

  const promos = await db.promo.findMany({ orderBy: [{ kind: "asc" }, { order: "asc" }] });
  const editing = editingId ? await db.promo.findUnique({ where: { id: editingId } }) : null;

  const showForm = creating || Boolean(editing);
  const now = new Date();

  return (
    <>
      <AdminHeader
        title="Offers & popups"
        description="The strip above the menu, and the card that appears shortly after someone arrives. Both switch themselves off once their end date passes."
        action={!showForm && <AdminButton href="/admin/promos?new=1">New promotion</AdminButton>}
      />

      <Flash saved={Boolean(params.saved)} deleted={Boolean(params.deleted)} />

      {showForm && (
        <Panel className="mb-8">
          <h2 className="mb-6 text-lg font-semibold text-fg">
            {editing ? "Edit promotion" : "New promotion"}
          </h2>

          <form action={savePromo} className="space-y-5">
            {editing && <input type="hidden" name="id" value={editing.id} />}

            <Field
              label="Where it shows"
              name="kind"
              as="select"
              defaultValue={editing?.kind ?? "banner"}
              hint="A bar sits above the menu and counts down. A popup appears once, four seconds in."
            >
              <option value="banner">Offer bar — above the menu</option>
              <option value="popup">Popup — on arrival</option>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Headline" name="title" defaultValue={editing?.title} required />
              <Field label="Supporting line" name="text" defaultValue={editing?.text} />
              <Field label="Button label" name="ctaLabel" defaultValue={editing?.ctaLabel} />
            </div>

            <Field
              label="Button link"
              name="ctaHref"
              defaultValue={editing?.ctaHref}
              hint="A path on the site such as /top-up. The language prefix is added for you."
            />

            <Field
              label="Picture or video (popup only)"
              name="media"
              defaultValue={editing?.media}
              hint="illus:signal for a brand drawing · yt:VIDEOID for YouTube · fb:POST_URL for Facebook · or an image path."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Starts"
                name="startsAt"
                type="datetime-local"
                defaultValue={forInput(editing?.startsAt ?? null)}
                hint="Leave blank to start straight away."
              />
              <Field
                label="Ends"
                name="endsAt"
                type="datetime-local"
                defaultValue={forInput(editing?.endsAt ?? null)}
                hint="The countdown runs to this. Blank means it never expires."
              />
            </div>

            <Toggle
              label="Switched on"
              name="active"
              defaultChecked={editing?.active ?? true}
              hint="Turn off to take it down without deleting it."
            />

            <div className="flex gap-3 border-t border-gray-200 pt-5">
              <AdminButton>{editing ? "Save changes" : "Create promotion"}</AdminButton>
              <AdminButton href="/admin/promos" variant="ghost" type="button">
                Cancel
              </AdminButton>
            </div>
          </form>
        </Panel>
      )}

      <Table head={["Headline", "Where", "Runs until", "Status", "", ""]}>
        {promos.map((promo) => {
          const expired = Boolean(promo.endsAt && promo.endsAt < now);
          const live = promo.active && !expired;

          return (
            <tr key={promo.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <span className="font-medium text-fg">{promo.title}</span>
                {promo.text && <span className="block text-xs text-muted">{promo.text}</span>}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {promo.kind === "banner" ? "Offer bar" : "Popup"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {promo.endsAt
                  ? promo.endsAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "No end date"}
              </td>
              <td className="px-4 py-3">
                <Pill on={live} labels={["Live", expired ? "Expired" : "Off"]} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <AdminButton href={`/admin/promos?edit=${promo.id}`} variant="ghost">
                  Edit
                </AdminButton>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <form action={deletePromo}>
                  <input type="hidden" name="id" value={promo.id} />
                  <AdminButton variant="danger">Delete</AdminButton>
                </form>
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
