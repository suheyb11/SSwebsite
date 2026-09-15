// The root shell — <html>, the font and the icons, and nothing else. The
// public site's chrome lives in src/app/(site)/layout.tsx so that /admin, which
// is a sibling of that group, renders without it.

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// The Somtel mark. src/app/icon.png and apple-icon.png are picked up by the App
// Router on their own, so there is nothing to declare here beyond the title.
export const metadata: Metadata = {
  icons: { icon: "/icon.png", shortcut: "/favicon.ico", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The site is light-only. There is no theme toggle and nothing ever adds the
  // `dark` class to <html>, so the light tokens in globals.css always apply.
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
