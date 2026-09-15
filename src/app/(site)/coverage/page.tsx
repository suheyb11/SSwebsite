import Image from "next/image";
import type { Metadata } from "next";
import { Antenna, Building2, MapPin, Phone, Radio, Wifi } from "lucide-react";
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

  // Group the flat list into regions so the page reads like a directory.
  const regions: { region: string; cities: typeof areas }[] = [];
  for (const area of areas) {
  const existing = regions.find((r) => r.region === area.region);
    if (existing) existing.cities.push(area);
    else regions.push({ region: area.region, cities: [area] });
  }

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

        <div className="space-y-12">
          {regions.map((group) => (
            <FadeIn key={group.region}>
              <h3 className="flex items-center gap-2.5 text-lg font-semibold text-fg">
                <MapPin size={18} className="text-accent-500" aria-hidden="true" />
                {group.region}
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.cities.map((city) => (
                  <Card key={city.id}>
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-fg">{city.city}</h4>
                      <Antenna size={16} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {parseFeatures(city.services).map((service) => (
                        <Badge key={service}>{service}</Badge>
                      ))}
                    </div>

                    {city.note && <p className="mt-4 text-sm text-muted">{city.note}</p>}
                  </Card>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

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
