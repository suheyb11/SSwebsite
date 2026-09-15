import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getFeatures, getSettings } from "@/lib/db";
import { Button, Card, PageHeader, Section, SectionTitle } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { FadeIn } from "@/components/motion";
import ContactForm from "@/components/sections/ContactForm";
import FeatureGrid from "@/components/sections/FeatureGrid";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, message, email or visit Somtel Somalia. Customer care is open around the clock for mobile, internet, eDahab and business services.",
};

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.2045916599662!2d45.31949027234596!3d2.0465180258709728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58423ff2f90acd%3A0x46ebf0de0d41bfcc!2s28W9%2BJMX%2C%20Mogadishu!5e0!3m2!1sen!2sso!4v1721034109877!5m2!1sen!2sso";

// When each channel is staffed.
// TODO: confirm these hours with the customer care and enterprise teams.
const hours = [
  { label: "Customer care line", value: "24 hours, 7 days a week" },
  { label: "WhatsApp and email", value: "Saturday to Thursday, 8:00 - 20:00" },
  { label: "Retail outlets", value: "Saturday to Thursday, 8:00 - 18:00" },
  { label: "Enterprise account team", value: "Saturday to Thursday, 8:00 - 17:00" },
];

export default async function ContactPage() {
  const [settings, channels] = await Promise.all([getSettings(), getFeatures("contact-channels")]);

  const details = [
    { Icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    {
      Icon: Phone,
      label: "Phone",
      value: `${settings.phone} | ${settings.phoneExtra}`,
      href: `tel:${settings.phone.replace(/[^+\d]/g, "")}`,
    },
    { Icon: MapPin, label: "Address", value: settings.address },
  ];

  return (
    <>
      <PageHeader
        title={"Contact Us"}
        description={"However you prefer to reach us — a call, a message, an email or a walk into one of our shops — there is a Somtel agent at the other end."}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="eyebrow mb-4">Contact Info</p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">Get in Touch</h2>
            <div className="accent-rule mt-6" />
            <p className="mt-6 text-lg text-muted">
              Somtel is a leading telecom and technology service provider with the widest network
              coverage in the Somali region. Whether you are reporting a fault, asking about a
              bundle, or connecting an entire office, start here and we will route you to the right
              team.
            </p>

            <ul className="mt-9 space-y-3">
              {details.map(({ Icon, label, value, href }) => (
                <li
                  key={label}
                  className="surface flex gap-4 p-5 transition-[box-shadow,border-color,background-color] duration-300 hover:border-primary-400 hover:bg-primary-50/40 hover:shadow-glow-navy-soft"
                >
                  <Glyph Icon={Icon} tone="solid" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-fg transition-colors hover:text-primary-600"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-fg">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>
      </Section>

      {/* Every way to reach us */}
      <Section tone="muted">
        <SectionTitle
          eyebrow={"Channels"}
          title={"Pick the way that suits you"}
          description={"Some things are quicker on the phone, some are better in writing, and some are simplest in person. All of them work."}
        />
        <FeatureGrid features={channels} />
      </Section>

      {/* When we are open */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="eyebrow mb-4">Opening hours</p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              When you can reach each team
            </h2>
            <div className="accent-rule mt-6" />
            <p className="mt-6 text-lg text-muted">
              The customer care line never closes — network faults, blocked lines and eDahab problems
              are handled at any hour. Everything else runs on business hours.
            </p>
            <div className="mt-8">
              <Button href="/support" variant="outline">
                Read the Help Center first
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card interactive={false}>
              <ul className="divide-y divide-border">
                {hours.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2.5 font-medium text-fg">
                      <Clock
                        size={17}
                        className="text-primary-600"
                        aria-hidden="true"
                      />
                      {row.label}
                    </span>
                    <span className="text-muted">{row.value}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Office location */}
      <div className="h-[420px] w-full border-t border-border">
        <iframe
          src={MAP_SRC}
          title={"Somtel Somalia office location"}
          className="h-full w-full border-0 grayscale-[35%]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </>
  );
}
