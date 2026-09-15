// The public site's shell: offer strip, menu, footer and the floating contact
// launcher. It is a route group rather than a path segment, so /admin sits
// beside these pages without inheriting any of this chrome.

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactLauncher from "@/components/layout/ContactLauncher";
import PageTransition from "@/components/motion/PageTransition";
import OfferBar from "@/components/layout/OfferBar";
import AppStrip from "@/components/layout/AppStrip";
import PromoPopup from "@/components/layout/PromoPopup";
import { getPromo, getSettings } from "@/lib/db";
import { t } from "@/lib/copy";

export const metadata: Metadata = {
  title: {
    default: "Somtel Somalia — Superfast Internet, Voice & eDahab Services",
    template: "%s | Somtel Somalia",
  },
  description:
    "Somtel Somalia provides superfast broadband internet, voice, data, roaming, fiber optic and eDahab mobile money services across Somalia.",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, banner, popup] = await Promise.all([
    getSettings(),
    getPromo("banner"),
    getPromo("popup"),
  ]);

  return (
    <>
      {/* The offer strip and the navbar are pinned together, so scrolling
          keeps the offer in view rather than leaving only the menu behind. */}
      <div className="sticky top-0 z-30">
        {banner && (
          <OfferBar
            offer={{
              id: banner.id,
              title: banner.title ?? "",
              text: banner.text,
              ctaLabel: banner.ctaLabel,
              ctaHref: banner.ctaHref,
              endsAt: banner.endsAt?.toISOString() ?? null,
            }}
          />
        )}

        <Navbar whatsapp={settings.whatsapp} phone={settings.phone} />
      </div>

      <a href="#main" className="skip-link">
        {t.nav.skipToContent}
      </a>

      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* The app advert closes every page, directly above the footer. Which
          of the two apps it offers depends on the route — see AppStripView. */}
      <AppStrip />

      <Footer />

      {popup && (
        <PromoPopup
          promo={{
            id: popup.id,
            title: popup.title ?? "",
            text: popup.text,
            ctaLabel: popup.ctaLabel,
            ctaHref: popup.ctaHref,
            media: popup.media,
            endsAt: popup.endsAt?.toISOString() ?? null,
          }}
        />
      )}

      {/* Floating call / WhatsApp / message launcher. */}
      <ContactLauncher
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        email={settings.email}
      />
    </>
  );
}
