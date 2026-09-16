import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/content";
import { cx } from "@/components/ui";
import { AdminButton, AdminHeader, Flash, Panel } from "@/components/admin/ui";
import { deleteApplication } from "../../actions";

export const metadata = { title: "Applications" };

/** People apply while you are reading the page. Nothing here can be cached. */
export const dynamic = "force-dynamic";

export default async function ApplicationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string; deleted?: string }>;
}) {
  const params = await searchParams;
  const jobId = Number(params.job) || null;

  const [applications, jobs] = await Promise.all([
    db.jobApplication.findMany({
      where: jobId ? { jobId } : undefined,
      orderBy: { createdAt: "desc" },
      include: { job: { select: { id: true, title: true, slug: true, status: true } } },
    }),
    db.job.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, _count: { select: { applications: true } } },
    }),
  ]);

  const filtered = jobId ? jobs.find((job) => job.id === jobId) ?? null : null;

  return (
    <>
      <AdminHeader
        title="Applications"
        description="Everyone who has applied through the careers page. Reply from your own mail — this is the record, not a mailbox."
        action={
          <AdminButton href="/admin/careers" variant="ghost">
            <ArrowLeft size={16} aria-hidden="true" />
            Roles
          </AdminButton>
        }
      />

      <Flash deleted={Boolean(params.deleted)} />

      {/* Filter by role. Only roles anybody has applied to are worth offering. */}
      {jobs.some((job) => job._count.applications > 0) && (
        <nav aria-label="Filter by role" className="mb-6 flex flex-wrap gap-2">
          <FilterChip href="/admin/careers/applications" active={!jobId}>
            All roles
          </FilterChip>

          {jobs
            .filter((job) => job._count.applications > 0)
            .map((job) => (
              <FilterChip
                key={job.id}
                href={`/admin/careers/applications?job=${job.id}`}
                active={jobId === job.id}
              >
                {job.title}
                <span className="rounded-full bg-black/10 px-1.5 text-[0.7rem] font-bold">
                  {job._count.applications}
                </span>
              </FilterChip>
            ))}
        </nav>
      )}

      {applications.length === 0 ? (
        <Panel>
          <p className="text-muted">
            {filtered
              ? `Nobody has applied for ${filtered.title} yet.`
              : "No applications have come in yet."}
          </p>
        </Panel>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Panel key={application.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-fg">{application.name}</p>

                  <p className="mt-1 text-sm text-muted">
                    for{" "}
                    <Link
                      href={`/admin/careers?edit=${application.job.id}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {application.job.title}
                    </Link>
                    {application.job.status !== "Opened" && " — now closed"}
                    {" · "}
                    {formatDateTime(application.createdAt)}
                  </p>

                  {/* Real links: one press to write back or to call. */}
                  <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <a
                      href={`mailto:${application.email}?subject=${encodeURIComponent(
                        `Your application — ${application.job.title}`
                      )}`}
                      className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:underline"
                    >
                      <Mail size={14} aria-hidden="true" />
                      {application.email}
                    </a>

                    {application.phone && (
                      <a
                        href={`tel:${application.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:underline"
                      >
                        <Phone size={14} aria-hidden="true" />
                        {application.phone}
                      </a>
                    )}
                  </p>
                </div>

                <form action={deleteApplication}>
                  <input type="hidden" name="id" value={application.id} />
                  <AdminButton variant="danger">Delete</AdminButton>
                </form>
              </div>

              {application.message && (
                <p className="mt-4 whitespace-pre-line border-t border-gray-200 pt-4 text-[0.95rem] leading-relaxed text-fg">
                  {application.message}
                </p>
              )}
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cx(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary-600 bg-primary-600 text-white"
          : "border-gray-300 bg-white text-muted hover:border-gray-400 hover:text-fg"
      )}
    >
      {children}
    </Link>
  );
}
