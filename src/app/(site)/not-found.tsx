import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container } from "@/components/ui";

// The pages people are most often looking for when they land here.
const popular = [
  { label: "Mobile bundles", href: "/bundles" },
  { label: "Home internet", href: "/home-internet" },
  { label: "Coverage map", href: "/coverage" },
  { label: "eDahab", href: "/eDahab" },
  { label: "Somtel for Business", href: "/business" },
  { label: "Help Center", href: "/support" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-display-lg font-semibold tracking-tight text-primary-600 sm:text-display-xl">
        404
      </p>
      <div className="accent-rule mt-6" />
      <h1 className="mt-7 text-display-sm font-semibold text-fg sm:text-display-md">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you are looking for may have been moved or no longer exists. Try one of these
        instead.
      </p>

      <ul className="mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
        {popular.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="surface inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-fg transition-[border-color,background-color,color] duration-200 hover:border-primary-400 hover:bg-primary-50/40 hover:text-primary-600"
            >
              {item.label}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back to home</Button>
        <Button href="/contact-us" variant="outline">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
