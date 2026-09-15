"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Building2, CalendarDays, Frown, MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui";
import { Stagger, StaggerItem, HoverLift } from "@/components/motion";

/** A job, already flattened by the server page (dates become strings). */
export type JobCard = {
  id: number;
  slug: string;
  title: string;
  type: string | null;
  location: string | null;
  department: string | null;
  status: string;
  deadlineLabel: string;
};

/** Searchable, filterable job list. Same search and filter behaviour as the old Career page. */
export default function JobBoard({ jobs }: { jobs: JobCard[] }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");

  // Build the dropdown options from the jobs we actually have.
  const locations = unique(jobs.map((job) => job.location));
  const departments = unique(jobs.map((job) => job.department));

  const term = search.toLowerCase();

  const filtered = jobs.filter((job) => {
    const haystack = [job.title, job.type, job.location, job.department].join(" ").toLowerCase();

    const matchesSearch = haystack.includes(term);
    const matchesLocation = !location || job.location === location;
    const matchesDepartment = !department || job.department === department;

    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const hasFilters = Boolean(search || location || department);

  function clearFilters() {
    setSearch("");
    setLocation("");
    setDepartment("");
  }

  return (
    <div>
      {/* Search and filters */}
      <div className="surface grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <input
            id="job-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, type, location or department..."
            className="field pl-11"
          />
        </div>

        <div>
          <label htmlFor="job-location" className="sr-only">
            Filter by location
          </label>
          <select
            id="job-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="field"
          >
            <option value="">All Locations</option>
            {locations.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="job-department" className="sr-only">
            Filter by department
          </label>
          <select
            id="job-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="field"
          >
            <option value="">All Departments</option>
            {departments.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-muted">
          Showing {filtered.length} of {jobs.length} {jobs.length === 1 ? "position" : "positions"}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="surface mt-6 p-14 text-center">
          <Frown size={40} aria-hidden="true" className="mx-auto text-muted" />
          <h2 className="mt-4 text-xl font-semibold text-fg">No jobs found</h2>
          <p className="mt-2 text-muted">
            {hasFilters
              ? "No jobs match your current filters."
              : "There are currently no job openings."}
          </p>
        </div>
      ) : (
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <StaggerItem key={job.id}>
              <HoverLift className="h-full">
                <article className="surface flex h-full flex-col p-6 transition-[box-shadow,border-color,background-color] duration-300 hover:border-primary-400 hover:bg-primary-50/40 hover:shadow-glow-navy-soft">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold leading-snug text-fg">{job.title}</h2>
                    <Badge
                      tone={job.status === "Opened" ? "success" : "danger"}
                      className="shrink-0"
                    >
                      {job.status}
                    </Badge>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted">
                    <Meta Icon={Briefcase} text={job.type ?? "Full-time"} />
                    {job.location && <Meta Icon={MapPin} text={job.location} />}
                    {job.department && <Meta Icon={Building2} text={job.department} />}
                    <Meta Icon={CalendarDays} text={`Apply by: ${job.deadlineLabel}`} />
                  </ul>

                  {job.status === "Opened" ? (
                    <Link
                      href={`/Career/${job.slug}`}
                      className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-[0.95rem] font-semibold text-primary-700 transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-400 hover:shadow-glow active:translate-y-px"
                    >
                      View details &amp; apply
                    </Link>
                  ) : (
                    <span className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-[0.95rem] font-medium text-muted">
                      Closed
                    </span>
                  )}
                </article>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

function Meta({ Icon, text }: { Icon: typeof Briefcase; text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Icon size={15} aria-hidden="true" className="shrink-0 text-accent-500" />
      <span>{text}</span>
    </li>
  );
}

/** Unique, non-empty values, sorted — used to build the filter dropdowns. */
function unique(values: (string | null)[]) {
  const found: string[] = [];

  for (const value of values) {
    if (value && !found.includes(value)) found.push(value);
  }

  return found.sort();
}
