import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Briefcase, Building2, CalendarDays, MapPin } from "lucide-react";
import { db, getSettings } from "@/lib/db";
import { formatLongDate } from "@/lib/content";
import { Badge, PageHeader, Section } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import Markdown from "@/components/ui/Markdown";
import ApplyForm from "@/components/sections/ApplyForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const jobs = await db.job.findMany({ select: { slug: true } });
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await db.job.findUnique({ where: { slug } });

  if (!job) return { title: "Job not found" };

  return {
    title: job.title,
    description: `${job.title}${job.location ? ` — ${job.location}` : ""}. Apply to join the Somtel team.`,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;

  const job = await db.job.findUnique({ where: { slug } });
  if (!job) notFound();

  const settings = await getSettings();
  const isOpen = job.status === "Opened";

  const meta = [
    { Icon: Briefcase, label: "Type", value: job.type ?? "Full-time" },
    { Icon: MapPin, label: "Location", value: job.location ?? "—" },
    { Icon: Building2, label: "Department", value: job.department ?? "—" },
    { Icon: CalendarDays, label: "Apply by", value: formatLongDate(job.deadline) },
  ];

  return (
    <>
      <PageHeader
        title={job.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Career", href: "/Career" },
          { label: job.title },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
          <article>
            <FadeIn>
              <Badge tone={isOpen ? "success" : "danger"}>{job.status}</Badge>

              <dl className="surface mt-6 grid gap-6 p-7 sm:grid-cols-2">
                {meta.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-600">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {label}
                      </dt>
                      <dd className="mt-1 text-fg">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <Markdown content={job.detail} />
              </div>
            </FadeIn>

            <Link
              href="/Career"
              className="group mt-10 inline-flex items-center gap-2 text-[0.95rem] font-medium text-primary-600 transition-colors hover:text-accent-500"
            >
              <ArrowLeft
                size={17}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Back to all jobs
            </Link>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {isOpen ? (
              <ApplyForm slug={job.slug} jobTitle={job.title} />
            ) : (
              <div className="surface p-9 text-center">
                <h2 className="text-xl font-semibold text-fg">This position is closed</h2>
                <p className="mt-3 text-muted">
                  Applications are no longer being accepted for this role. Browse our other openings.
                </p>
                <Link
                  href="/Career"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-semibold text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary-700 hover:shadow-glow-navy active:translate-y-px"
                >
                  See open roles
                </Link>
              </div>
            )}

            {settings.email && (
              <p className="mt-6 text-center text-sm text-muted">
                Questions? Email{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="font-medium text-primary-600 hover:underline"
                >
                  {settings.email}
                </a>
              </p>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
