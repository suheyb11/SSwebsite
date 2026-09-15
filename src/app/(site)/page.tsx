import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Network,
  Phone,
  PhoneCall,
  Signal,
  Wallet,
} from "lucide-react";
import { db } from "@/lib/db";
import { toPlanView } from "@/lib/content";
import { Button, Card, Section, SectionTitle } from "@/components/ui";
import { CardHover, CountUp, FadeIn, Stagger, StaggerItem } from "@/components/motion";
import PartnerStrip from "@/components/sections/PartnerStrip";
import LatestPosts from "@/components/sections/LatestPosts";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import PricingCards from "@/components/sections/PricingCards";

/** The six business services shown in the "Our Service" grid. */
const businessServices = [
  {
    title: "SMS Service",
    icon: "/assets/images/icon-2-2.png",
    text: "Bulk messaging made easy with Somtel's SMS Gateway and API — ideal for marketing, alerts, and service notifications.",
    href: "/SMS",
  },
  {
    title: "IVR",
    icon: "/assets/images/servce1.png",
    text: "Automated self-service menus and cost-effective SIP Trunking for seamless, high-volume call management.",
    href: "/IVR",
  },
  {
    title: "USSD Short Codes",
    icon: "/assets/images/icon-2-1.png",
    text: "Fast, cost-effective interactive services — payments, account management, promotions, and surveys — accessible on any phone without internet.",
    href: "/fiberoptic",
  },
  {
    title: "Fiber Internet",
    icon: "/assets/images/icon-3.png",
    text: "High-speed, reliable nationwide connectivity for home and business, with backup service for uninterrupted access.",
    href: "/fiberoptic",
  },
  {
    title: "Somtel IPTV",
    icon: "/assets/images/icon-2-4.png",
    text: "Enjoy local and international channels with reliable internet-based TV, anytime, anywhere.",
    href: "/fiberoptic",
  },
  {
    title: "Roaming",
    icon: "/assets/images/icon-2-2.png",
    text: "Stay reachable when you travel, with roaming partners across the region and beyond.",
    href: "/Roaming",
  },
];

/** The popular personal products, matching the old home page's icon list. */
const popularProducts = [
  { title: "Akram Voice", href: "/Akram", Icon: Phone },
  { title: "Kaafiye Plus", href: "/Kaafiye", Icon: Signal },
  { title: "Keydso Service", href: "/Keydso", Icon: Wallet },
  { title: "Dhamays Plus", href: "/Dhameys", Icon: Signal },
  { title: "Muraadso", href: "/Muraadso", Icon: PhoneCall },
  { title: "FTTB & FTTH", href: "/fiberoptic", Icon: Network },
];

/** Figures quoted in the About copy, pulled out so they can count up. */
const stats = [
  { value: 78, suffix: "%", label: "of telecom users served" },
  { value: 3, label: "regions covered" },
  { value: 24, suffix: "/7", label: "customer support" },
];

export default async function HomePage() {
  // Server Components read Prisma directly — no HTTP round-trip to our own API.
  const [slides, testimonials, partners, fiber] = await Promise.all([
    db.slide.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    db.testimonial.findMany({ orderBy: { order: "asc" } }),
    db.partner.findMany({ orderBy: { order: "asc" } }),
    // Only the plans are shown here, so don't pull the product's markdown body
    // across — it would be serialised into the page payload for nothing.
    db.product.findUnique({
      where: { slug: "fiberoptic" },
      select: { plans: { orderBy: { order: "asc" } } },
    }),
  ]);

  const plans = (fiber?.plans ?? []).map(toPlanView);

  return (
    <>
      <Hero slides={slides} />

      {/* About Somtel */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <FadeIn>
            {/* Transparent PNG — no frame, so the map sits straight on the page. */}
            <Image
              src="/assets/images/Website branding - Map-01.png"
              alt="Somtel network coverage across Somalia"
              width={600}
              height={400}
              className="w-full"
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="eyebrow mb-4">About Somtel</p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              Somalia&apos;s widest
              <br />
              telecom network
            </h2>
            <div className="accent-rule mt-6" />
            <p className="mt-6 text-lg text-muted">
              Somtel is a leading telecommunications and technology provider with the widest network
              coverage in the Somali region. Headquartered in Mogadishu and driven by our core values,
              we are building a bold new digital future for our customers. Serving 78% of telecom users
              across South Central Somalia, Somaliland, and Puntland, we operate in one of the region&apos;s
              fastest-growing mobile telecommunications markets.
            </p>

            {/* Key figures, counting up once they scroll into view. */}
            <dl className="mt-9 grid grid-cols-3 gap-3 border-y border-border py-6 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="block text-[1.75rem] font-semibold leading-none tracking-tight text-fg sm:text-4xl"
                    />
                    <span className="mt-2 block text-xs leading-snug text-muted sm:text-sm">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact-us">
                Contact Us <ArrowRight size={18} />
              </Button>

              <span className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5">
                <Headphones size={18} className="text-accent-500" />
                <span className="text-sm font-medium text-fg">Support 24/7</span>
              </span>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Popular personal products */}
      <Section tone="muted">
        <SectionTitle
          eyebrow="Personal"
          title="Discover Our Most Popular Personal Products"
          description="We take pride in offering a range of personal products that our customers love and trust. Below are some of the top-rated services we provide, tailored to meet your needs."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map(({ title, href, Icon }) => (
            <StaggerItem key={title}>
              <CardHover className="group">
                <Link href={href} className="group block">
                  <Card className="flex items-center gap-4 p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-600 text-white transition-colors duration-200 group-hover:bg-accent-500 group-hover:text-primary-700">
                      <Icon size={21} />
                    </span>
                    <span className="font-medium text-fg">{title}</span>
                    <ArrowRight
                      size={17}
                      className="ml-auto shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-500"
                    />
                  </Card>
                </Link>
              </CardHover>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Business services */}
      <Section>
        {/* The intro and the six cards share ONE grid, so the cards flow around
            the intro instead of sitting in a separate column beside it.

            The intro's span is chosen at each breakpoint so the cells always
            divide exactly — no empty corner, and never a lonely bottom row:
              sm  2 cols: intro spans 2 + 6 cards =  8 cells = 4 full rows
              lg  3 cols: intro spans 3 + 6 cards =  9 cells = 3 full rows
              xl  4 cols: intro spans 2 + 6 cards =  8 cells = 2 full rows */}
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <StaggerItem className="flex flex-col justify-center sm:col-span-2 lg:col-span-3 xl:col-span-2 xl:pr-6">
            <p className="eyebrow mb-4">{"Our Service"}</p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              {"We Understand Your Business"}
            </h2>
            <div className="accent-rule mt-6" />
            <p className="mt-6 text-lg text-muted">
              {"Expand your business and connect with your customers using SMS marketing, seamlessly integrated into your business system."}
            </p>
            <div className="mt-8">
              <Button href={"/SMS"} variant="outline">
                {"Discover More"} <ArrowRight size={18} />
              </Button>
            </div>
          </StaggerItem>

          {businessServices.map((service) => (
            <StaggerItem key={service.title}>
              <CardHover className="group h-full">
                <Link href={service.href} className="group block h-full">
                  <Card className="flex h-full flex-col">
                    <Image
                      src={service.icon}
                      alt=""
                      width={115}
                      height={114}
                      className="h-12 w-12 object-contain"
                    />
                    <h3 className="mt-6 text-lg font-semibold text-fg">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-[0.95rem] text-muted">{service.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors group-hover:text-accent-500">
                      {"Learn more"}
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Card>
                </Link>
              </CardHover>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>


      {/* Pricing */}
      <Section tone="muted" id="pricing">
        <SectionTitle eyebrow="Pricing" title="Check Our Valuable Price" />
        <PricingCards plans={plans} />
      </Section>

      {/* Testimonials */}
      <Section tone="brand" className="relative overflow-hidden">
        {/* Same brand wash as the page headers, so the dark band is not flat. */}
        <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative">
          <SectionTitle
            eyebrow="Client Reviews"
            title={
              <>
                What People And Clients
                <br />
                Think About Us?
              </>
            }
            description="We focus on delivering seamless and innovative solutions tailored to client needs. Our team coordinates efficiently to ensure quality results and drive business success with reliable, modern services."
            invert
          />
          <Testimonials items={testimonials} />
        </div>
      </Section>

      {/* Latest news and events */}
      <LatestPosts tone="muted" />

      {/* Partners */}
      {partners.length > 0 && (
        <Section>
          <SectionTitle eyebrow="Partners" title="Trusted By" />
          <PartnerStrip partners={partners} />
        </Section>
      )}


    </>
  );
}
