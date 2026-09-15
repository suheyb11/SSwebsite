import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { footerLinks, routeHref } from "@/lib/navigation";
import { t } from "@/lib/copy";
import { Container } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { getSettings } from "@/lib/db";
import NewsletterForm from "./NewsletterForm";

export default async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();

  const socials = [
    { label: "Facebook", href: settings.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: settings.instagram, Icon: InstagramIcon },
    { label: "X (Twitter)", href: settings.twitter, Icon: TwitterIcon },
    { label: "YouTube", href: settings.youtube, Icon: YoutubeIcon },
  ].filter((social) => social.href);

  return (
    <footer className="relative overflow-hidden bg-primary-700 text-white">
      {/* A single soft navy-to-cyan wash so the footer is not a flat slab. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(50% 70% at 8% 0%, rgb(41 171 227 / 0.22), transparent 60%), radial-gradient(40% 60% at 92% 10%, rgb(254 217 0 / 0.10), transparent 65%)",
        }}
      />

      <Container className="relative py-10 lg:py-12">
        {/*
          Six children in a four-column grid meant the footer wrapped onto a
          second row on desktop, which is what made it so tall. The grid now has
          six columns: the brand block takes two and each link group takes one,
          so everything sits on a single row. Contact details moved down to the
          slim bar, where they read as one line rather than a stacked list.
        */}
        <FadeIn className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand + socials + newsletter */}
          <div className="sm:col-span-2">
            <Image
              src="/assets/images/1.png"
              alt={settings.companyName || "Somtel Somalia"}
              width={150}
              height={60}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              High standards of service and corporate responsibility, guided by the values of our
              community.
            </p>

            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-500 hover:text-primary-700"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-6 max-w-xs">
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns — one each, so the row stays a single line deep. */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
                {title}
              </h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.route}>
                    <Link
                      href={routeHref(link.route)}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeIn>

        {/* Contact details, inline rather than stacked in a column of their own. */}
        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-accent-500" aria-hidden="true" />
            {settings.address}
          </span>
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail size={15} className="shrink-0 text-accent-500" aria-hidden="true" />
            {settings.email}
          </a>
          <a
            href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone size={15} className="shrink-0 text-accent-500" aria-hidden="true" />
            {settings.phone}
            {settings.phoneExtra && <span className="text-white/50">· {settings.phoneExtra}</span>}
          </a>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.companyName || "Somtel Somalia"}. {t.footer.rights}
          </p>
          <div className="flex gap-7">
            <Link href={routeHref("/legal/privacy-policy")} className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href={routeHref("/legal/terms-of-service")} className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/admin" className="transition-colors hover:text-white">
              {t.nav.admin}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
