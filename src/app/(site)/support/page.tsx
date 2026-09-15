import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Headset,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Signal,
  Smartphone,
  Wifi,
} from "lucide-react";
import { db, getSettings } from "@/lib/db";
import { Button, Card, PageHeader, Section, SectionTitle } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Answers to common Somtel questions about SIM cards, bundles, billing, internet, eDahab and business services — plus every way to reach our support team.",
};

// Shortcut tiles pointing at the pages people ask about most.
const shortcuts = [
  { Icon: Smartphone, title: "SIM and eSIM", text: "Register a line, or move your number to an eSIM.", href: "/Esim" },
  { Icon: Signal, title: "Bundles and data", text: "Activate a bundle and check what you have left.", href: "/bundles" },
  { Icon: Wifi, title: "Home internet", text: "Fibre installation, routers and fault reporting.", href: "/home-internet" },
  { Icon: CreditCard, title: "eDahab and payments", text: "Send money, top up, and keep your account safe.", href: "/eDahab" },
  { Icon: MapPin, title: "Coverage", text: "See which services are live in your city.", href: "/coverage" },
  { Icon: ShieldCheck, title: "Business support", text: "Circuits, messaging and corporate accounts.", href: "/business" },
];

export default async function SupportPage() {
  const [faqs, settings] = await Promise.all([
    // Site-wide FAQs only — product FAQs stay on their own product page.
    db.faq.findMany({ where: { productId: null }, orderBy: { order: "asc" } }),
    getSettings(),
  ]);

  // Group by topic, keeping the seeded order.
  const topics: { topic: string; items: typeof faqs }[] = [];
  for (const faq of faqs) {
  const name = faq.topic ?? "General";
    const existing = topics.find((t) => t.topic === name);
    if (existing) existing.items.push(faq);
    else topics.push({ topic: name, items: [faq] });
  }

  const contactCards = [
    {
      Icon: Phone,
      title: "Call customer care",
      text: "Our team answers day and night, every day of the year.",
      value: settings.phone,
      href: `tel:${settings.phone}`,
    },
    {
      Icon: MessageCircle,
      title: "Message us on WhatsApp",
      text: "Quick questions, screenshots and account help.",
      value: settings.whatsapp,
      href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`,
    },
    {
      Icon: Headset,
      title: "Email support",
      text: "For anything that needs a written record.",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
  ];

  return (
    <>
      <PageHeader
        title={"How can we help?"}
        description={"Find an answer in seconds, or reach a real person any hour of the day. Somtel support never closes."}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Help Center" }]}
      />

      <Section>
        <SectionTitle
          eyebrow={"Quick links"}
          title={"Start with the topic you need"}
          description={"The pages customers open most, with the practical details on each service."}
        />

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map(({ Icon, title, text, href }) => (
            <StaggerItem key={title}>
              <Link href={href} className="group block h-full">
                <Card>
                  <Glyph Icon={Icon} />
                  <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                  <p className="mt-2.5 text-muted">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-transform duration-300 group-hover:translate-x-1">
                    Open <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionTitle
          eyebrow={"Contact"}
          title={"Talk to a person"}
          description={"Three ways to reach us. Whichever you choose, you get a Somtel agent, not a queue that never ends."}
        />

        <Stagger className="grid gap-6 sm:grid-cols-3">
          {contactCards.map(({ Icon, title, text, value, href }) => (
            <StaggerItem key={title}>
              <Card>
                <Glyph Icon={Icon} />
                <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2.5 text-muted">{text}</p>
                <a
                  href={href}
                  className="mt-5 inline-block font-semibold text-primary-600 transition-colors hover:text-accent-500"
                >
                  {value}
                </a>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-12 text-center">
          <p className="text-muted">
            Prefer to come in? Somtel outlets in every city we serve can register a line, replace a
            SIM, reset an eDahab PIN and set up a new device while you wait.
          </p>
          <div className="mt-6">
            <Button href="/coverage" variant="outline">
              Find your city
            </Button>
          </div>
        </FadeIn>
      </Section>


      <Section>
        <SectionTitle
          eyebrow={"Answers"}
          title={"Frequently asked questions"}
          description={"The questions our care team hears most, grouped by topic."}
        />

        <div className="space-y-14">
          {topics.map((group) => (
            <FadeIn key={group.topic}>
              <h3 className="mx-auto mb-6 max-w-3xl text-lg font-semibold text-fg">{group.topic}</h3>
              <FaqAccordion
                items={group.items.map((f) => ({
                  id: f.id,
                  question: (f.question ?? ""),
                  answer: (f.answer ?? ""),
                }))}
              />
            </FadeIn>
          ))}
        </div>
      </Section>


    </>
  );
}
