// Site navigation. Routes keep their original casing so existing links keep working.
//
// The top bar carries five items on purpose. Anything deeper hangs off a
// mega-menu column instead, which is what keeps the desktop header breathable.

import type { NavItem } from "@/types";

export const navigation: NavItem[] = [
  {
    label: "Personal",
    route: "/bundles",
    columns: [
      {
        title: "Voice",
        links: [
          { label: "Prepaid", route: "/Prepaid" },
          { label: "Postpaid", route: "/Postpaid" },
          { label: "Muraadso", route: "/Muraadso" },
          { label: "Akram Voice", route: "/Akram" },
        ],
      },
      {
        title: "Data & Internet",
        links: [
          { label: "Top up", route: "/top-up" },
          { label: "Bundles", route: "/bundles" },
          { label: "Home Internet", route: "/home-internet" },
          { label: "Dhamays Plus", route: "/Dhameys" },
          { label: "Kaafiye Plus", route: "/Kaafiye" },
          { label: "Mifi", route: "/Mifi" },
        ],
      },
      {
        title: "Money",
        links: [
          { label: "eDahab", route: "/eDahab" },
          { label: "Keydso", route: "/Keydso" },
          { label: "DahabPlus", route: "https://www.dahabplus.com/" },
          { label: "DahabPay", route: "https://www.dahabpay.com/Authentication/Login" },
        ],
      },
      {
        title: "SIM & Devices",
        links: [
          { label: "eSIM", route: "/Esim" },
          { label: "Devices", route: "/devices" },
          { label: "Roaming", route: "/Roaming" },
        ],
      },
    ],
  },
  {
    label: "Business",
    route: "/business",
    columns: [
      {
        title: "Broadband",
        links: [
          { label: "Somtel for Business", route: "/business" },
          { label: "Fiber Optic", route: "/fiberoptic" },
        ],
      },
      {
        title: "Essential Internet",
        links: [
          { label: "P2P", route: "/fiberoptic" },
          { label: "W-ADSL", route: "/fiberoptic" },
        ],
      },
      {
        title: "Messaging",
        links: [
          { label: "Mysms", route: "/SMS" },
          { label: "SMS API", route: "/SMSAPI" },
          { label: "IVR", route: "/IVR" },
        ],
      },
      {
        title: "Talk to sales",
        links: [
          { label: "Request a proposal", route: "/contact-us" },
          { label: "Coverage for your sites", route: "/coverage" },
        ],
      },
    ],
  },
  { label: "Coverage", route: "/coverage" },
  { label: "Support", route: "/support" },
  {
    label: "Company",
    route: "/about",
    columns: [
      {
        title: "About Somtel",
        links: [
          { label: "Who We Are", route: "/about" },
          { label: "Careers", route: "/Career" },
          { label: "Blog", route: "/blog" },
        ],
      },
      {
        title: "Get in touch",
        links: [
          { label: "Contact Us", route: "/contact-us" },
          { label: "Help Center", route: "/support" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", route: "/legal/privacy-policy" },
          { label: "Terms of Service", route: "/legal/terms-of-service" },
        ],
      },
    ],
  },
];

/** Footer link groups (the old footer had two broken links — fixed here). */
export const footerLinks = {
  "Self Services": [
    { label: "Top up", route: "/top-up" },
    { label: "Prepaid", route: "/Prepaid" },
    { label: "Bundles", route: "/bundles" },
    { label: "Home Internet", route: "/home-internet" },
    { label: "Muraadso", route: "/Muraadso" },
    { label: "eDahab", route: "/eDahab" },
    { label: "Devices", route: "/devices" },
  ],
  "Corporate Services": [
    { label: "Somtel for Business", route: "/business" },
    { label: "FTTX / FTTA", route: "/fiberoptic" },
    { label: "SMS", route: "/SMS" },
    { label: "SMS API", route: "/SMSAPI" },
    { label: "IVR", route: "/IVR" },
  ],
  Company: [
    { label: "About Us", route: "/about" },
    { label: "Coverage", route: "/coverage" },
    { label: "Careers", route: "/Career" },
    { label: "Blog", route: "/blog" },
    { label: "Contact", route: "/contact-us" },
  ],
  Support: [
    { label: "Help Center", route: "/support" },
    { label: "Find a shop", route: "/coverage#store-locator" },
    { label: "Roaming", route: "/Roaming" },
    { label: "Keydso", route: "/Keydso" },
    { label: "Privacy Policy", route: "/legal/privacy-policy" },
    { label: "Terms of Service", route: "/legal/terms-of-service" },
  ],
};

export function isExternal(route: string) {
  return /^https?:\/\//.test(route);
}

/**
 * The href for a route.
 *
 * The language is no longer part of the URL — the middleware picks it from the
 * visitor's cookie and rewrites behind the scenes — so an internal route is
 * already its own final path. Kept as a function because every link goes
 * through it, which is the one place to change if that ever stops being true.
 */
export function routeHref(route: string) {
  return route;
}
