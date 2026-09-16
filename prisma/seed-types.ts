// Shared shape for the section seed data, used by seed.ts and the generated file.

export type SectionSeed = {
  pageKey: string;
  type: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: string;
  icon?: string;
  tone?: string;
  flip?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  ctaLabel2?: string;
  ctaHref2?: string;
  video?: string;
  items?: {
    icon?: string;
    image?: string;
    title: string;
    text?: string;
    value?: number;
    suffix?: string;
    prefix?: string;
    badge?: string;
    href?: string;
  }[];
};
