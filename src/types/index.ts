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
};

export type NavColumn = {
  title: string;
  links: { label: string; route: string }[];
};
