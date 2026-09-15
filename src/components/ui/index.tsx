// Small reusable building blocks. Server components — no interactivity here.
// Anything that needs hover/tap motion wraps these in a <HoverLift> instead.

import Link from "next/link";
import type { ReactNode } from "react";

/** Joins class names, skipping falsy values. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Centred, max-width wrapper with responsive side padding. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>{children}</div>
  );
}

/**
 * A page section with consistent vertical rhythm.
 * `tone` picks the background; every section on the site uses one of these four.
 */
export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "brand" | "plain";
}) {
  const tones = {
    default: "bg-bg",
    muted: "bg-primary-50/70",
    brand: "bg-primary-600 text-white",
    plain: "", // inherits whatever sits behind it
  };

  // Slimmer than it used to be: pages carry more sections now, so each one
  // takes less vertical room and the page reads as denser rather than endless.
  return (
    <section id={id} className={cx("py-14 sm:py-16 lg:py-20", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Section heading: optional eyebrow, title, accent rule, optional description. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cx("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cx("eyebrow mb-4", invert && "text-accent-500")}>
          {eyebrow}
        </p>
      )}

      <h2
        className={cx(
          "text-display-sm font-semibold sm:text-display-md",
          invert ? "text-white" : "text-fg"
        )}
      >
        {title}
      </h2>

      <div className={cx("accent-rule mt-6", align === "center" && "mx-auto")} />

      {description && (
        <p className={cx("mt-6 text-lg", invert ? "text-white/75" : "text-muted")}>{description}</p>
      )}
    </div>
  );
}

/**
 * An outline card: transparent fill, one hairline border. On hover the border
 * strengthens and a faint navy (yellow in dark) glow lifts it off the page.
 */
export function Card({
  children,
  className,
  interactive = true,
  emphasis = "default",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /**
   * `feature` marks a card as the important one in its row: a yellow hairline
   * along the top edge and a resting shadow, so a headline benefit outranks a
   * supporting detail without breaking the outline-card language.
   */
  emphasis?: "default" | "feature";
}) {
  return (
    <div
      className={cx(
        "surface h-full p-7 transition-[box-shadow,border-color,background-color] duration-300",
        emphasis === "feature" && "feature-card shadow-soft",
        interactive && "hover:border-primary-400 hover:bg-primary-50/40 hover:shadow-glow-navy-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  /** Set on a navy band so the button picks its light-on-dark colours. */
  onDark?: boolean;
  "aria-label"?: string;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,color,box-shadow,border-color,transform] duration-200 " +
  "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0";

// On a navy band the outline button needs white borders and white text.
//
// Passing those through `className` does not reliably work: `text-white` and the
// variant's own `text-fg` are both plain utilities, so which one wins is decided
// by the order Tailwind emits them in the stylesheet, not by the order they
// appear in the class list — which is how the secondary hero button ended up
// rendering dark navy on navy. Selecting a different variant avoids the conflict.
const onDarkVariants = {
  primary: "bg-white text-primary-700 hover:bg-white/90",
  accent: "bg-accent-500 text-primary-700 hover:bg-accent-400 hover:shadow-glow",
  outline: "border border-white/35 text-white hover:border-white hover:bg-white hover:text-primary-700",
  ghost: "text-white hover:bg-white/10",
};

const buttonVariants = {
  // Navy fill — the workhorse.
  primary: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-glow-navy",
  // Yellow fill — the brand's energy. Reserved for the single most important action.
  accent: "bg-accent-500 text-primary-700 hover:bg-accent-400 hover:shadow-glow",
  // Hairline outline that fills in on hover.
  outline:
    "border border-border-strong text-fg hover:border-primary-600 hover:bg-primary-600 hover:text-white",
  ghost: "text-fg hover:bg-primary-50",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  external,
  onDark = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const palette = onDark ? onDarkVariants : buttonVariants;
  const classes = cx(buttonBase, palette[variant], buttonSizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/** Small pill label — categories, job status, plan badges. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "danger";
  className?: string;
}) {
  const tones = {
    neutral: "bg-primary-50 text-primary-700",
    accent: "bg-accent-500 text-primary-700",
    success: "bg-sky-100 text-sky-700",
    danger: "bg-primary-100 text-primary-600",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Page header shown at the top of inner pages (replaces the old breadcrumb bar). */
export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <div className="relative overflow-hidden bg-primary-600 py-10 sm:py-12">
      {/* Brand wash — navy base, cyan sweep, a single yellow glow. Purely decorative. */}
      <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-90" />

      <Container className="relative">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent-500">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="max-w-3xl text-display-sm font-semibold text-white sm:text-display-md">
          {title}
        </h1>

        {description && <p className="mt-5 max-w-2xl text-lg text-white/75">{description}</p>}
      </Container>
    </div>
  );
}
