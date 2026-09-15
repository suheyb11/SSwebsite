import { getSettings } from "@/lib/db";
import { AdminButton, AdminHeader, Field, Flash, Panel } from "@/components/admin/ui";
import { saveSettings } from "../actions";

export const metadata = { title: "Settings" };

type SettingField = {
  key: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  hint?: string;
};

/**
 * The editable settings, grouped the way someone thinks about them rather than
 * the way they are stored. Anything not listed here stays in the database
 * untouched — the action only writes the keys a form posts.
 */
const groups: { title: string; description: string; fields: SettingField[] }[] = [
  {
    title: "Contact details",
    description: "Shown in the footer, on the contact page and in the floating help button.",
    fields: [
      { key: "companyName", label: "Company name" },
      { key: "email", label: "Email address", type: "email" },
      { key: "phone", label: "Phone number" },
      { key: "phoneExtra", label: "Short codes", hint: "Separated by | — e.g. 151 | 152 | 215000" },
      { key: "address", label: "Address" },
      { key: "tagline", label: "Tagline", as: "textarea", rows: 2 },
    ],
  },
  {
    title: "Social profiles",
    description: "Each one becomes an icon in the footer. Leave a field blank to drop its icon.",
    fields: [
      { key: "whatsapp", label: "WhatsApp link" },
      { key: "facebook", label: "Facebook" },
      { key: "instagram", label: "Instagram" },
      { key: "twitter", label: "X (Twitter)" },
      { key: "youtube", label: "YouTube" },
    ],
  },
  {
    title: "App downloads",
    description:
      "Where DahabPlus and the Somtel SuperApp can be downloaded. The app cards on the site show a button only for the links that are filled in, so an empty field simply hides that button rather than leading somewhere broken.",
    fields: [
      { key: "dahabPlusSite", label: "DahabPlus — website" },
      { key: "dahabPlusAndroid", label: "DahabPlus — Google Play" },
      { key: "dahabPlusIos", label: "DahabPlus — App Store" },
      { key: "superAppSite", label: "Somtel SuperApp — website" },
      { key: "superAppAndroid", label: "Somtel SuperApp — Google Play" },
      { key: "superAppIos", label: "Somtel SuperApp — App Store" },
    ],
  },
];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [params, settings] = await Promise.all([searchParams, getSettings()]);

  return (
    <>
      <AdminHeader
        title="Settings"
        description="Contact details, social profiles and the app download links used across the site."
      />

      <Flash saved={Boolean(params.saved)} />

      <form action={saveSettings} className="space-y-6">
        {groups.map((group) => (
          <Panel key={group.title}>
            <h2 className="text-lg font-semibold text-fg">{group.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{group.description}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {group.fields.map((field) => (
                <div
                  key={field.key}
                  className={field.as === "textarea" ? "sm:col-span-2" : undefined}
                >
                  <Field
                    label={field.label}
                    name={field.key}
                    defaultValue={settings[field.key] ?? ""}
                    type={field.type}
                    as={field.as}
                    rows={field.rows}
                    hint={field.hint}
                  />
                </div>
              ))}
            </div>
          </Panel>
        ))}

        <div className="sticky bottom-0 -mx-5 border-t border-gray-200 bg-gray-50/95 px-5 py-4 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          <AdminButton>Save settings</AdminButton>
        </div>
      </form>
    </>
  );
}
