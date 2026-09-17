// Shared types used across the site.

/** Every API route returns this shape. */
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  meta?: { page: number; pageSize: number; total: number; pageCount: number };
};

/** A pricing plan, with `features` already parsed from its JSON string. */
export type PlanView = {
  id: number;
  title: string;
  price: number;
  unit: string | null;
  features: string[];
  highlight: boolean;
};

/** One entry in the site navigation. */
export type NavItem = {
  label: string;
  route: string;
  columns?: NavColumn[];
  /**
   * The card that closes a mega-menu, on the right of the columns.
   *
   * The columns are a list of places to go; this is the one worth going to.
   * Optional — a menu without one simply gives its columns the extra width.
   */
  feature?: NavFeature;
};

export type NavFeature = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  route: string;
  /** A lucide-react icon name, resolved by src/lib/icons.ts. */
  icon?: string;
};

export type NavColumn = {
  title: string;
  links: { label: string; route: string }[];
};
