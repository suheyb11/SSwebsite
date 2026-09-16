import Image from "next/image";
import type { Metadata } from "next";
import { Building2, MapPin, Radio, Wifi } from "lucide-react";
import { db, getSettings } from "@/lib/db";
import { parseFeatures } from "@/lib/content";
import { Badge, Button, Card, PageHeader, Section, SectionTitle } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import CoverageChecker from "@/components/sections/CoverageChecker";
import StoreLocator from "@/components/sections/StoreLocator";

export const metadata: Metadata = {
  title: "Network Coverage",
  description:
    "See where Somtel 4G, Fiber Home, Fiber Optic and eDahab are available across Somalia, region by region.",
};

// The three promises under the hero — the same shape the product pages use.
const highlights = [
  {
    Icon: Radio,
    title: "Widest 4G footprint",
    text: "Our towers reach every major city we serve, and new sites go live each quarter.",
  },
  {
    Icon: Wifi,
    title: "Fibre to the home",
    text: "Dedicated fibre lines in the cities below, with the footprint growing street by street.",
  },
  {
    Icon: Building2,
    title: "Enterprise circuits",
    text: "Symmetric bandwidth and point-to-point links for offices, ports and campuses.",
  },
];

export default async function CoveragePage() {
  const [areas, stores, settings] = await Promise.all([
    db.coverageArea.findMany({ orderBy: { order: "asc" } }),
    db.store.findMany({ orderBy: { order: "asc" } }),
    getSettings(),
  ]);

  return (
    <>
      <PageHeader
        title="Network coverage across Somalia"
        description="Somtel runs one of the largest networks in the Somali region. Find your city below to see which services are live where you live and work."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Coverage" }]}
      />

      <Section>
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {highlights.map(({ Icon, title, text }) => (
            <StaggerItem key={title}>
              <Card>
                <Glyph Icon={Icon} />
                <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2.5 text-muted">{text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Interactive: type a city, see what runs there. */}
      <CoverageChecker
        areas={areas.map((area) => ({
          id: area.id,
          city: area.city,
          region: area.region,
          services: parseFeatures(area.services),
          note: (area.note ?? "") || null,
        }))}
      />

      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionTitle
              eyebrow="Where we reach"
              title="From Mogadishu to Hargeisa, and everywhere between"
              description="Our backbone links the coast to the interior, carrying voice, data and mobile money on infrastructure we own and maintain ourselves."
              align="left"
            />
            <p className="text-muted">
              Coverage is checked and updated as new sites go live. If your street is not listed
              yet, call customer care with your address and we will tell you what is planned for
              your area.
            </p>
            <div className="mt-8">
              <Button href="/contact-us">Check my address</Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Transparent PNG — no frame, so the map sits straight on the page. */}
            <Image
              src="/assets/images/Website branding - Map-01.png"
              alt="Map of Somtel network coverage across Somalia"
              width={600}
              height={400}
              className="w-full"
            />
          </FadeIn>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Coverage directory"
          title="Services by city"
          description="Every city we serve, with the Somtel services currently live there."
        />

        {/*
          A dense list rather than a card per city.
          16 cities spread across 14 regions, 11 of which hold a single city, so
          grouping meant fourteen headings each introducing one card — the
          directory alone ran longer than the rest of the page put together, and
          said nothing the search box above does not already answer on demand.
        */}
        <FadeIn>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border-strong bg-white">
            <ul className="divide-y divide-border">
              {areas.map((area) => (
                <li
                  key={area.id}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-primary-50/40 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
                >
                  {/* The city never truncates — it is the thing being looked
                      up. The region gives way instead if the row is tight. */}
                  <div className="flex min-w-0 items-center gap-2.5 sm:w-[21rem] sm:shrink-0">
                    <MapPin size={15} className="shrink-0 text-accent-600" aria-hidden="true" />
                    <span className="whitespace-nowrap font-semibold text-fg">{area.city}</span>
                    <span className="truncate text-sm text-muted">{area.region}</span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                    {parseFeatures(area.services).map((service) => (
                      <Badge key={service}>{service}</Badge>
                    ))}
                  </div>

                  {area.note && (
                    <p className="text-sm text-muted sm:w-64 sm:shrink-0 sm:text-right">
                      {area.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* TODO: replace with the confirmed coverage footprint from the network team. */}
        <p className="mt-12 text-sm text-muted">
          Coverage shown is indicative. Signal strength varies with terrain, building materials,
          device and network load.
        </p>
      </Section>

      {/* Interactive: find a shop or agent. */}
      <StoreLocator
        stores={stores.map((store) => ({
          id: store.id,
          name: (store.name ?? ""),
          city: store.city,
          region: store.region,
          address: (store.address ?? ""),
          hours: (store.hours ?? ""),
          phone: store.phone,
          kind: store.kind,
        }))}
      />

    </>
  );
}
