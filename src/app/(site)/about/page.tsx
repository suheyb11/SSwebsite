import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Check, Cog, Database, Layers, Phone } from "lucide-react";
import { db, getSettings } from "@/lib/db";
import { Button, Card, PageHeader, Section, SectionTitle } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { CardHover, CountUp, FadeIn, Stagger, StaggerItem } from "@/components/motion";
import PartnerStrip from "@/components/sections/PartnerStrip";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Somtel is a leading telecom and technology service provider with the widest network coverage in the Somali region.",
};

const whyChooseUs = [
  {
    title: "Telecommunication Expertise",
    Icon: Cog,
    text: "Our firm excels in delivering seamless and efficient telecommunication solutions, ensuring that user interactions are dynamic and engaging.",
  },
  {
    title: "Network Optimization",
    Icon: Database,
    text: "We specialize in optimizing network performance to provide reliable and high-speed connectivity, enhancing the overall user experience.",
  },
  {
    title: "Innovative Solutions",
    Icon: Layers,
    text: "We are dedicated to developing innovative telecommunication solutions that meet the evolving needs of our customers and drive growth in the industry.",
  },
];

const coreValues = ["Dedication", "Excellence", "Innovation", "Fairness", "Trust"];

export default async function AboutPage() {
  const [partners, settings] = await Promise.all([
    db.partner.findMany({ orderBy: { order: "asc" } }),
    getSettings(),
  ]);

  return (
    <>
      <PageHeader
        title={"Who We Are"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Who We Are" }]}
      />

      {/* Intro + vision & mission */}
      <Section>
        <SectionTitle
          eyebrow={"About Us"}
          title={"About Somtel"}
          description={"Somtel is a leading Telecom and technology service provider with the widest network coverage in the Somali region. From our headquarters in Hargeisa and guided by our values, we are delivering an ambitious, new digital world to our 78% of telecom customers across Somaliland, Somalia and Puntland — one of the region's fastest growing for mobile telecommunications."}
        />

        <Stagger className="grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <CardHover className="group h-full">
              <Card className="border-l-2 border-l-accent-500">
                <h2 className="text-2xl font-semibold text-fg">Our Vision</h2>
                <p className="mt-4 text-muted">
                  To be the leading telecommunications solution provider in East Africa and beyond.
                </p>
              </Card>
            </CardHover>
          </StaggerItem>

          <StaggerItem>
            <CardHover className="group h-full">
              <Card className="border-l-2 border-l-primary-600">
                <h2 className="text-2xl font-semibold text-fg">Our Mission</h2>
                <p className="mt-4 text-muted">
                  Enhance lives with outstanding products and services, and be a trusted partner by
                  delivering innovative mobile communication.
                </p>
              </Card>
            </CardHover>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Who we are */}
      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image
              src="/assets/images/aaa.jpg"
              alt="Somtel team at work"
              width={570}
              height={650}
              className="w-full rounded-2xl object-cover"
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="eyebrow mb-4">
              <CountUp value={12} suffix=" Years" className="inline" /> of Experience
            </p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              Who we are
              <br />
              Somtel is a leading <span className="text-primary-600">Telecom.</span>
            </h2>
            <div className="accent-rule mt-6" />

            <p className="mt-6 text-lg font-medium text-fg">
              Somtel is a leading Telecom and technology service provider with the widest network
              coverage in the Somali region.
            </p>

            <div className="mt-7 space-y-4 border-l-2 border-l-accent-500 pl-6 text-muted">
              <p>
                Somtel, a prominent telecommunications company operating in Somaliland, Puntland, and
                South Somalia, is a subsidiary of the Dahabshiil Group. The Dahabshiil Group&apos;s diverse
                portfolio, which includes telecommunications, remittance services, oil, real estate, and
                banking, provides Somtel with substantial expertise and resources.
              </p>
              <p>
                Internationally registered, Somtel adheres to global standards and is committed to
                delivering high-quality services. The company has developed a robust infrastructure,
                deploying and maintaining advanced integrated networks throughout the region. This
                infrastructure encompasses a range of technologies including GSM, UMTS, 4G/5G/LTE, WIFI,
                and Mobile Money, ensuring comprehensive and reliable connectivity for its customers.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why choose us */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image
              src="/assets/images/galery/8.PNG"
              alt="Somtel network infrastructure"
              width={600}
              height={400}
              className="w-full rounded-2xl object-cover"
            />
          </FadeIn>

          <div>
            <FadeIn>
              <p className="eyebrow mb-4">
                Why Choose Us
              </p>
              <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
                We Deal With The Aspects
                <br />
                Professional{" "}
                <span className="text-primary-600">Telecommunication Services</span>
              </h2>
              <div className="accent-rule mt-6" />
              <p className="mt-6 text-lg text-muted">
                We&apos;re investing in our people, our communities, our networks, and a sustainable
                future. Our focus is on creating a better, more connected future for Somalia.
              </p>
            </FadeIn>

            <Stagger className="mt-8 space-y-6" delay={0.1}>
              {whyChooseUs.map(({ title, Icon, text }) => (
                <StaggerItem key={title}>
                  <div className="flex gap-4">
                    <Glyph Icon={Icon} tone="solid" />
                    <div>
                      <h3 className="font-semibold text-fg">{title}</h3>
                      <p className="mt-1.5 text-[0.95rem] text-muted">{text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Call to action band */}
      <Section tone="brand" className="relative overflow-hidden">
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-70" />
        <FadeIn className="relative text-center">
          <p className="inline-flex items-center gap-2.5 text-xl font-semibold text-accent-500">
            <Phone size={20} aria-hidden="true" />
            {settings.phone}
          </p>
          <h2 className="mt-4 text-display-sm font-semibold text-white sm:text-display-md">
            To make requests for
            <br />
            further information
          </h2>
          <div className="mt-9">
            <Button href="/contact-us" variant="accent" size="lg">
              Join With Us Now <ArrowRight size={20} />
            </Button>
          </div>
        </FadeIn>
      </Section>

      {/* Core values */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <Image
              src="/assets/images/value.jpg"
              alt="Somtel core values"
              width={631}
              height={509}
              className="w-full rounded-2xl object-cover"
            />
          </FadeIn>

          <div>
            <FadeIn>
              <p className="eyebrow mb-4">
                Somtel-Somalia
              </p>
              <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
                Core Values And
                <br />
                Principles
              </h2>
              <div className="accent-rule mt-6" />
              <p className="mt-6 text-lg text-muted">
                We believe in upholding high standards of service and corporate social responsibilities
                guided by the company&apos;s core values of:
              </p>
            </FadeIn>

            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" delay={0.1}>
              {coreValues.map((value) => (
                <StaggerItem key={value}>
                  <div className="flex items-center gap-3 rounded-xl border border-border-strong bg-transparent p-4 transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary-400 hover:bg-primary-50/40">
                    <Check size={18} className="shrink-0 text-accent-500" aria-hidden="true" />
                    <span className="font-medium text-fg">{value}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
              <p className="text-muted">Do you need any support?</p>
              <Button href="/contact-us" variant="outline">
                Contact us <ArrowRight size={18} />
              </Button>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Affiliated organisations */}
      {partners.length > 0 && (
        <Section>
          <SectionTitle
            title={"Our affiliated organisations"}
            description={"We are committed to supporting the social and economic development of Somalia, so we've invested in key sectors to rebuild."}
          />
          <PartnerStrip partners={partners} />
        </Section>
      )}

    </>
  );
}
