import Link from "next/link";
import { ArrowRight, Megaphone, MessageSquare, Newspaper, Tag } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel, Pill } from "@/components/admin/ui";
import { currentUser } from "./actions";

export const metadata = { title: "Overview" };

export default async function AdminHome() {
  const [user, plans, posts, drafts, promos, livePromos, comments, hiddenComments] =
    await Promise.all([
      currentUser(),
      db.plan.count(),
      db.post.count(),
      db.post.count({ where: { published: false } }),
      db.promo.count(),
      db.promo.count({ where: { active: true } }),
      db.comment.count(),
      db.comment.count({ where: { approved: false } }),
    ]);

  // What is on the site right now, so the first screen answers the first question.
  const now = new Date();
  const [banner, popup] = await Promise.all([
    db.promo.findFirst({ where: { kind: "banner", active: true } }),
    db.promo.findFirst({ where: { kind: "popup", active: true } }),
  ]);

  const cards = [
    {
      href: "/admin/plans",
      Icon: Tag,
      label: "Prices & plans",
      value: plans,
      note: "across every product page",
    },
    {
      href: "/admin/blog",
      Icon: Newspaper,
      label: "Blog posts",
      value: posts,
      note: drafts > 0 ? `${drafts} not published` : "all published",
    },
    {
      href: "/admin/comments",
      Icon: MessageSquare,
      label: "Comments",
      value: comments,
      note: hiddenComments > 0 ? `${hiddenComments} hidden` : "all visible",
    },
    {
      href: "/admin/promos",
      Icon: Megaphone,
      label: "Offers & popups",
      value: promos,
      note: `${livePromos} switched on`,
    },
  ];

  return (
    <>
      <AdminHeader
        title={`Hello, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Everything the public site shows is edited from here. Changes go live immediately."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ href, Icon, label, value, note }) => (
          <Link key={href} href={href} className="group">
            <Panel className="h-full transition-colors group-hover:border-gray-300">
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-500/15 text-primary-600">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <ArrowRight
                  size={17}
                  className="text-muted transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight text-fg">{value}</p>
              <p className="mt-1 font-medium text-fg">{label}</p>
              <p className="mt-0.5 text-sm text-muted">{note}</p>
            </Panel>
          </Link>
        ))}
      </div>

      {/* What a visitor is being shown at this moment. */}
      <h2 className="mb-4 mt-10 text-lg font-semibold text-fg">Live on the site now</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Offer bar</p>
            <Pill on={Boolean(banner)} labels={["Showing", "None"]} />
          </div>

          {banner ? (
            <>
              <p className="mt-3 font-medium text-fg">{banner.title}</p>
              <p className="mt-1 text-sm text-muted">
                {banner.endsAt
                  ? `Ends ${banner.endsAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
                  : "No end date"}
                {banner.endsAt && banner.endsAt < now && " — expired, so it is hidden"}
              </p>
            </>
          ) : (
            <p className="mt-3 text-muted">No offer bar is switched on.</p>
          )}
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Popup</p>
            <Pill on={Boolean(popup)} labels={["Showing", "None"]} />
          </div>

          {popup ? (
            <>
              <p className="mt-3 font-medium text-fg">{popup.title}</p>
              <p className="mt-1 text-sm text-muted">
                Appears four seconds after a visitor arrives.
              </p>
            </>
          ) : (
            <p className="mt-3 text-muted">No popup is switched on.</p>
          )}
        </Panel>
      </div>
    </>
  );
}
