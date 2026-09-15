import { db } from "@/lib/db";
import { parseFeatures } from "@/lib/content";
import { AdminButton, AdminHeader, Field, Flash, Panel, Pill, Toggle } from "@/components/admin/ui";
import { savePlan } from "../actions";

export const metadata = { title: "Prices & plans" };

export default async function PlansPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; edit?: string }>;
}) {
  const { saved, edit } = await searchParams;
  const editingId = Number(edit) || null;

  const products = await db.product.findMany({
    where: { plans: { some: {} } },
    orderBy: { order: "asc" },
    include: { plans: { orderBy: { order: "asc" } } },
  });

  const editing = editingId
    ? await db.plan.findUnique({ where: { id: editingId }, include: { product: true } })
    : null;

  return (
    <>
      <AdminHeader
        title="Prices & plans"
        description="Every price shown on the site. Editing one here changes it on the product page, the top-up picker and the bundle cards at once."
      />

      <Flash saved={Boolean(saved)} />

      {/* The edit form sits at the top so it is visible the moment you arrive. */}
      {editing && (
        <Panel className="mb-8">
          <h2 className="mb-6 text-lg font-semibold text-fg">
            {editing.product.name} — {editing.title}
          </h2>

          <form action={savePlan} className="space-y-5">
            <input type="hidden" name="id" value={editing.id} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Plan name" name="title" defaultValue={editing.title} required />
              <Field label="Price (USD)" name="price" type="number" defaultValue={editing.price} required />
              <Field
                label="Unit"
                name="unit"
                defaultValue={editing.unit}
                hint="Day, Weekly, month… shown after the price."
              />
            </div>

            <Field
              label="What is included"
              name="features"
              as="textarea"
              rows={5}
              defaultValue={parseFeatures(editing.features).join("\n")}
              hint="One line per point. These become the ticks on the plan card."
            />

            <Toggle
              label="Mark as most popular"
              name="highlight"
              defaultChecked={editing.highlight}
              hint="Gives the card a yellow edge and a badge. Use it on one plan per product."
            />

            <div className="flex gap-3 border-t border-gray-200 pt-5">
              <AdminButton>Save changes</AdminButton>
              <AdminButton href="/admin/plans" variant="ghost" type="button">
                Cancel
              </AdminButton>
            </div>
          </form>
        </Panel>
      )}

      <div className="space-y-8">
        {products.map((product) => (
          <section key={product.id}>
            <h2 className="mb-3 flex items-baseline gap-3 text-lg font-semibold text-fg">
              {product.name}
              <span className="text-sm font-normal text-muted">/{product.slug}</span>
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    {["Plan", "Price", "Unit", "Included", "", ""].map((cell, i) => (
                      <th
                        key={i}
                        className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {product.plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-fg">{plan.title}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono tabular-nums text-fg">
                        ${plan.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted">{plan.unit ?? "—"}</td>
                      <td className="px-4 py-3 text-muted">
                        {parseFeatures(plan.features).length} points
                      </td>
                      <td className="px-4 py-3">
                        {plan.highlight && <Pill on labels={["Most popular", ""]} />}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <AdminButton href={`/admin/plans?edit=${plan.id}`} variant="ghost">
                          Edit
                        </AdminButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
