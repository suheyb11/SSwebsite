// The dashboard's building blocks.
//
// Kept apart from components/ui: the public site is a marketing page built on
// outline cards and generous space, while this is a tool — denser, plainer, and
// optimised for scanning a table rather than reading a paragraph. Same two brand
// colours, different job.

import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/components/ui";

/** The heading at the top of every dashboard page. */
export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
        {description && <p className="mt-1.5 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** A plain panel. Filled rather than outlined — this is a tool, not a page. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-xl border border-gray-200 bg-white p-6", className)}>
      {children}
    </div>
  );
}

/** A labelled input. `as` switches it to a textarea or a select. */
export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  as = "input",
  rows = 4,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  as?: "input" | "textarea" | "select";
  rows?: number;
  hint?: string;
  required?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const id = `field-${name}`;
  const shared = "field";

  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="ml-1 text-accent-600">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={cx(shared, "resize-y font-mono text-sm")}
        />
      ) : as === "select" ? (
        <select id={id} name={name} defaultValue={defaultValue ?? ""} className={shared}>
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          step={type === "number" ? "0.01" : undefined}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={shared}
        />
      )}

      {hint && <p className="mt-1.5 text-sm text-muted">{hint}</p>}
    </div>
  );
}

/** A checkbox that reads as a switch. */
export function Toggle({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border-strong text-primary-600 focus:ring-primary-600/30"
      />
      <span>
        <span className="block font-medium text-fg">{label}</span>
        {hint && <span className="block text-sm text-muted">{hint}</span>}
      </span>
    </label>
  );
}

/** The dashboard's buttons. Deliberately plainer than the site's. */
export function AdminButton({
  children,
  href,
  type = "submit",
  variant = "primary",
  className,
}: {
  children: ReactNode;
  href?: string;
  type?: "submit" | "button";
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}) {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    ghost: "border border-gray-300 text-fg hover:bg-gray-50",
    danger: "border border-gray-300 text-primary-700 hover:border-primary-600 hover:bg-primary-50",
  };

  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}

/** Confirmation after a save or a delete. Read from the URL, so it survives the redirect. */
export function Flash({ saved, deleted }: { saved?: boolean; deleted?: boolean }) {
  if (!saved && !deleted) return null;

  return (
    <p
      role="status"
      className="mb-6 rounded-lg border border-accent-500 bg-accent-500/10 px-4 py-3 text-sm font-medium text-primary-700"
    >
      {saved ? "Saved. The site has been updated." : "Deleted."}
    </p>
  );
}

/** A simple data table. */
export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            {head.map((cell) => (
              <th
                key={cell}
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}

/** A small status pill. */
export function Pill({ on, labels }: { on: boolean; labels: [string, string] }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        on ? "bg-accent-500 text-primary-700" : "bg-primary-50 text-muted"
      )}
    >
      {on ? labels[0] : labels[1]}
    </span>
  );
}
