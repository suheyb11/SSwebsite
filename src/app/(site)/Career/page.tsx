import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { db, getFeatures, getSettings } from "@/lib/db";
import { t } from "@/lib/copy";
import { formatLongDate } from "@/lib/content";
import { Button, Card, PageHeader, Section, SectionTitle } from "@/components/ui";
import { CountUp, FadeIn } from "@/components/motion";
import FeatureGrid from "@/components/sections/FeatureGrid";
import JobBoard from "@/components/sections/JobBoard";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career at Somtel Somalia. See our open roles in engineering, customer care, sales and finance, what we offer, and how our hiring process works.",
};

// Headline numbers shown under the intro.
// TODO: replace these with the real figures from HR before publishing.
const stats = [
  { value: 800, suffix: "+", label: "People on the Somtel team" },
  { value: 20, suffix: "+", label: "Cities with a Somtel presence" },
  { value: 15, suffix: " yrs", label: "Connecting the Somali region" },
];

export default async function CareerPage() {
  const [jobs, benefits, process, settings] = await Promise.all([
    db.job.findMany({ orderBy: [{ status: "asc" }, { createdAt: "desc" }] }),
    getFeatures("career-benefits"),
    getFeatures("career-process"),
    getSettings(),
  ]);

  // Format the deadline on the server so the client component stays simple.
  const cards = jobs.map((job) => ({
    id: job.id,
    slug: job.slug,
    title: job.title,
    type: job.type,
    location: job.location,
    department: job.department,
    status: job.status,
    deadlineLabel: formatLongDate(job.deadline),
  }));

  const openCount = jobs.filter((job) => job.status === "Opened").length;

  return (
    <>
      <PageHeader
        title={"Build a career that connects a country"}
        description={"Somtel runs the fibre, the towers and the payment rails that millions of people rely on every day. If you want work with that kind of reach, start here."}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Career" }]}
      />

      {/* Intro + headline numbers */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="eyebrow mb-4">Life at Somtel</p>
            <h2 className="text-display-sm font-semibold text-fg sm:text-display-md">
              Engineering, care and commerce — all under one roof
            </h2>
            <div className="accent-rule mt-6" />
            <p className="mt-6 text-lg text-muted">
              We are a telecom operator, an internet provider and a mobile money network at the same
              time. That means our teams range from fibre splicers and RF engineers to software
              developers, care agents, retail staff, risk analysts and finance professionals.
            </p>
            <p className="mt-4 text-muted">
              What they share is a bias for getting things working. A tower that drops overnight, a
              circuit into a hospital, a failed eDahab transfer — these are not tickets in a queue to
              us, they are people waiting. If that is how you like to work, you will fit in here.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <Card key={stat.label} className="text-center lg:flex lg:items-baseline lg:gap-5 lg:text-left">
                  <p className="text-display-sm font-semibold text-primary-600">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-muted lg:mt-0">{stat.label}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why work here */}
      <Section tone="muted">
        <SectionTitle
          eyebrow={"What we offer"}
          title={"Why people build a career here"}
          description={"The practical things that make a job worth taking, and worth keeping."}
        />
        <FeatureGrid features={benefits} />
      </Section>

      {/* Open roles */}
      <Section id="openings">
        <SectionTitle
          eyebrow={"Opportunities"}
          title={"Open positions"}
          description={
            openCount > 0
              ? "Filter by location or department to find the role that fits you, then apply in a few minutes."
              : "Nothing is open right now, but roles are posted here first — check back soon."
          }
        />
        <JobBoard jobs={cards} />
      </Section>

      {/* Hiring process */}
      <Section tone="muted">
        <SectionTitle
          eyebrow={"How hiring works"}
          title={"Four steps, no guesswork"}
          description={"You will always know where your application stands and what happens next."}
        />
        <FeatureGrid features={process} columns={4} />
      </Section>

      {/* Speculative applications */}
      <Section>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-primary-600">
            <Briefcase size={22} aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-2xl font-semibold text-fg sm:text-3xl">
            Nothing here matches your skills?
          </h2>
          <p className="mt-4 text-muted">
            Send us your CV anyway. We keep speculative applications on file for six months and go
            back to them first when a role opens up. Tell us what you do and where you want to be
            based, and write <strong className="font-semibold text-fg">Speculative application</strong> in
            your message.
          </p>
          <div className="mt-8">
            <Button href="/contact-us" variant="outline">
              Send your CV
            </Button>
          </div>
        </FadeIn>
      </Section>

    </>
  );
}
