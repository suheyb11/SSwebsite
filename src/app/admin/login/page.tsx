import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-700 p-5">
      <div aria-hidden="true" className="brand-mesh pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/assets/images/1.png"
            alt="Somtel Somalia"
            width={150}
            height={52}
            priority
            className="mx-auto h-9 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm text-white/70">Content dashboard</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-lift">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          Somtel Somalia · staff access only
        </p>
      </div>
    </div>
  );
}
