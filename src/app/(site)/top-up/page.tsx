import type { Metadata } from "next";
import { db, getSettings } from "@/lib/db";
import { parseFeatures } from "@/lib/content";
import { PageHeader } from "@/components/ui";
import BundlePicker, { type BundleView, type HowToStep } from "@/components/sections/BundlePicker";
import SelfRecharge from "@/components/sections/SelfRecharge";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { Section, SectionTitle } from "@/components/ui";
import { t } from "@/lib/copy";

export async function generateMetadata(): Promise<Metadata> {
  
  return {
        title: "Top Up & Bundles",
        description:
          "Choose a data, voice or combo bundle, see exactly what is included, and activate it from your handset in seconds.",
      };
}

/**
 * Which picker category a product's plans belong to.
 * Kept here rather than in the database because it is a property of the page,
 * not of the product itself.
 */
const CATEGORY_BY_PRODUCT: Record<string, string> = {
  bundles: "data",
  Kaafiye: "combo",
  Dhameys: "combo",
  Akram: "voice",
  Muraadso: "voice",
  Prepaid: "voice",
  Postpaid: "combo",
  Mifi: "data",
  "home-internet": "home",
  fiberoptic: "home",
};

export default async function TopUpPage() {
  const [products, settings] = await Promise.all([
    // Only the name and the plans are used here. Selecting them explicitly keeps
    // each product's markdown body out of the page payload.
    db.product.findMany({
      where: { slug: { in: Object.keys(CATEGORY_BY_PRODUCT) } },
      select: {
        slug: true,
        name: true,
        plans: { orderBy: { order: "asc" } },
      },
    }),
    getSettings(),
  ]);

  const bundles: BundleView[] = products.flatMap((product) =>
    product.plans.map((plan) => ({
      id: plan.id,
      category: CATEGORY_BY_PRODUCT[product.slug] ?? "data",
      product: (product.name ?? ""),
      productHref: `/${product.slug}`,
      // Carries the choice into the recharge panel: which service, which plan,
      // and how much — so the visitor does not re-enter what they just clicked.
      rechargeHref:
        `/top-up?service=${encodeURIComponent(product.slug)}` +
        `&plan=${encodeURIComponent(plan.title)}&amount=${plan.price}#recharge`,
      title: (plan.title ?? ""),
      price: plan.price,
      unit: plan.unit,
      features: parseFeatures(plan.features),
      highlight: plan.highlight,
    }))
  );

  // TODO: confirm the self-service short code and the app names with the
  // commercial team before publishing.
  const steps: HowToStep[] =
    [
          { icon: "Smartphone", title: "Dial the short code", text: "Open the Somtel self-service menu from your handset and pick a bundle." },
          { icon: "CreditCard", title: "Buy through eDahab", text: "Purchase from the eDahab app, or at any eDahab agent near you." },
          { icon: "Store", title: "Visit an agent", text: "Any registered agent can activate a bundle on your line while you wait." },
          { icon: "CheckCircle2", title: "Confirm", text: "An SMS records your new balance and the date the bundle expires." },
        ];

  // TODO: confirm which payment methods are actually accepted.
  const payments: HowToStep[] =
    [
          { icon: "CreditCard", title: "eDahab", text: "Somtel's own mobile money — the way most customers pay." },
          { icon: "Wallet", title: "Airtime balance", text: "The cost is deducted straight from the credit on your line." },
          { icon: "Store", title: "Cash at an outlet", text: "Pay at any Somtel shop or registered agent." },
        ];

  // Bundle and billing questions from the site-wide Help Center list.
  const faqs = await db.faq.findMany({
    where: { productId: null, topic: { in: ["Bundles and data", "Billing and payments"] } },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHeader
        title={"Top up and choose a bundle"}
        description={t.topup.description}
        breadcrumb={[
          { label: t.nav.home, href: "/" },
          { label: "Top up"},
        ]}
      />

      {/* Self recharge first: most visitors arrive wanting to top up, not to read. */}
      <SelfRecharge phone={settings.phone} />

      <BundlePicker bundles={bundles} steps={steps} payments={payments} />


      {faqs.length > 0 && (
        <Section tone="muted">
          <SectionTitle
            eyebrow="FAQ"
            title={"Frequently asked questions"}
          />
          <FaqAccordion
            items={faqs.map((f) => ({
              id: f.id,
              question: (f.question ?? ""),
              answer: (f.answer ?? ""),
            }))}
          />
        </Section>
      )}


    </>
  );
}
