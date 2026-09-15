import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogOut, Megaphone, MessageSquare, Newspaper, Settings, Tag } from "lucide-react";
import { currentUser, logout } from "./actions";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Somtel Admin" },
  // A control panel has no business in search results.
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard },
  { href: "/admin/plans", label: "Prices & plans", Icon: Tag },
  { href: "/admin/blog", label: "Blog", Icon: Newspaper },
  { href: "/admin/comments", label: "Comments", Icon: MessageSquare },
  { href: "/admin/promos", label: "Offers & popups", Icon: Megaphone },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  // The sign-in page renders inside this layout too, before there is a user.
  // It needs the plain shell, not the sidebar.
  if (!user) return <div className="min-h-screen bg-gray-50">{children}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar. Collapses to a top strip of icons on a narrow screen. */}
      <aside className="flex w-16 shrink-0 flex-col border-r border-gray-200 bg-white lg:w-60">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 lg:justify-start lg:px-6">
          <Image
            src="/assets/images/1.png"
            alt="Somtel"
            width={120}
            height={40}
            className="hidden h-7 w-auto lg:block"
          />
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-600 text-sm font-bold text-white lg:hidden">
            S
          </span>
        </div>

        <nav className="flex-1 p-2 lg:p-3">
          <ul className="space-y-1">
            {nav.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-fg lg:justify-start"
                  title={label}
                >
                  <Icon size={18} className="shrink-0" aria-hidden="true" />
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-2 lg:p-3">
          <p className="hidden px-3 pb-2 text-xs text-muted lg:block">
            Signed in as
            <span className="block truncate font-medium text-fg">{user.name}</span>
          </p>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-fg lg:justify-start"
              title="Sign out"
            >
              <LogOut size={18} className="shrink-0" aria-hidden="true" />
              <span className="hidden lg:inline">Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="w-full px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
