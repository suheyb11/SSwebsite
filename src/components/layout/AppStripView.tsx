"use client";

// The app advert: one soft-yellow band carrying the app's logo, its name, a
// line about it, and the two store badges.
//
// Yellow because it is Somtel's own colour, and a pale tint of it rather than
// the full brand yellow so the band sits under the page instead of shouting
// over the footer. Navy type and navy badges on top of it, which is the pairing
// the rest of the site already uses.
//
// Which of the two apps shows depends on the page — somebody topping up a line
// wants DahabPlus, everybody else wants the SuperApp — so the advert is about
// what the reader is already doing rather than whatever we felt like pushing.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export type AppLinks = { site: string; android: string; ios: string };

/** Routes about money and balances. Everything else gets the SuperApp. */
const MONEY_ROUTES = ["/eDahab", "/Keydso", "/top-up"];

/** accent-100: the brand yellow at the strength of a wash. */
const SOFT_YELLOW = "#fff7b8";

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="shrink-0">
      <path d="M3.6 2.2 14.3 12 3.6 21.8a1.5 1.5 0 0 1-.6-1.2V3.4c0-.5.2-.9.6-1.2Z" fill="currentColor" />
      <path d="m16.3 10 3.5 1.9c.7.4.7 1.4 0 1.8L16.3 14 13.4 12l2.9-2Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="shrink-0">
      <path
        d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1 2.6-2.1.8-1.2 1.1-2.4 1.2-2.4-.1 0-2.3-.9-2.3-3.4Z"
        fill="currentColor"
      />
      <path d="M14.3 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.5.6-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2Z" fill="currentColor" />
    </svg>
  );
}

const badgeClass =
  "inline-flex items-center gap-2.5 rounded-md bg-primary-700 px-3.5 py-1.5 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-600";

/**
 * A store badge in the familiar shape, in navy rather than black so it belongs
 * to the site.
 *
 * `href` is the store listing where we have one and the app's own page where we
 * do not, so the badge is never a dead button while the links are being chased.
 */
function StoreBadge({
  href,
  above,
  name,
  Mark,
}: {
  href: string;
  above: string;
  name: string;
  Mark: () => React.ReactElement;
}) {
  const label = (
    <>
      <Mark />
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-[0.06em] text-white/70">{above}</span>
        <span className="mt-0.5 block text-[15px] font-semibold leading-tight">{name}</span>
      </span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={badgeClass}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={badgeClass}>
      {label}
    </a>
  );
}

export default function AppStripView({
  dahabPlus,
  superApp,
}: {
  dahabPlus: AppLinks;
  superApp: AppLinks;
}) {
  const pathname = usePathname() ?? "/";
  const isMoney = MONEY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const app = isMoney
    ? {
        name: "DahabPlus",
        headline: "Send, pay and top up in one App",
        // Extracted from the promo cut-out by scripts/extract-dahabplus-logo.mjs.
        logo: "/assets/images/dahabplus-logo.png",
        logoClass: "h-6 w-auto sm:h-7",
        width: 356,
        height: 94,
        /** Where the badges point until the store listings are filled in. */
        home: "/eDahab",
        links: dahabPlus,
      }
    : {
        name: "Somtel SuperApp",
        headline: "Manage all your services in one App",
        logo: "/assets/images/1.png",
        logoClass: "h-7 w-auto sm:h-8",
        width: 138,
        height: 52,
        home: "/top-up",
        links: superApp,
      };

  // Both badges always show: a missing store link falls back to the app's own
  // site, and failing that to the page on this site that explains it.
  const fallback = app.links.site || app.home;
  const stores = [
    { key: "android", above: "Available on", name: "Google play", href: app.links.android || fallback, Mark: PlayMark },
    { key: "ios", above: "Available on the", name: "App Store", href: app.links.ios || fallback, Mark: AppleMark },
  ];

  return (
    <aside
      aria-label={`${app.name} download`}
      className="relative overflow-hidden"
      style={{ backgroundColor: SOFT_YELLOW }}
    >
      {/*
        The brushed top edge from the artwork. Painted in the page's own
        background so the yellow reads as swept onto the page rather than bolted
        to it — thick at the left, thinning out to the right, ragged throughout.
        Decorative only, and it stretches with the viewport.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-5 w-full text-bg sm:h-6"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v4c-58 6-96-1-150 3-62 4-96 9-158 6-58-3-94-9-152-6-54 3-88 9-144 7-60-2-100-9-158-5-52 4-86 10-140 8-56-2-94-8-148-4-44 3-76 8-118 5-38-3-64-8-102-6-42 2-72 7-110 4-22-2-40-5-60-3V0Z"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center gap-4 pb-5 pt-8 text-center sm:gap-6 sm:pb-6 sm:pt-9 lg:flex-row lg:gap-7 lg:text-left">
          {/*
            Both marks sit on a white chip. Neither survives the yellow on its
            own: the Somtel swoosh is itself yellow, and the gold half of
            "DahabPlus" washes straight out. On white they both stay crisp, and
            using the same treatment for the two keeps the band consistent
            whichever app it is showing.
          */}
          <span className="inline-flex shrink-0 items-center rounded-lg bg-white px-3.5 py-2.5 shadow-sm">
            <Image
              src={app.logo}
              alt={app.name}
              width={app.width}
              height={app.height}
              className={app.logoClass}
            />
          </span>

          <p className="text-primary-700">
            <span className="block text-lg font-bold tracking-tight sm:text-xl">{app.name}</span>
            <span className="mt-0.5 block text-[15px] text-primary-600/80 sm:text-base">
              {app.headline}
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:ml-auto">
            {stores.map(({ key, above, name, href, Mark }) => (
              <StoreBadge key={key} href={href} above={above} name={name} Mark={Mark} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
