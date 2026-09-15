// The newest articles and events, for the home page.
//
// Three at a time, which is what fits the row and what the client asked for as
// a minimum. If fewer than that are published the section takes itself off the
// page rather than leaving a half-empty row.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { Section, SectionTitle } from "@/components/ui";
import { Stagger, StaggerItem, HoverLift } from "@/components/motion";
import PostCard, { postCardSelect } from "./PostCard";

export default async function LatestPosts({
  take = 3,
  tone = "default",
}: {
  take?: number;
  tone?: "default" | "muted";
}) {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { postedDate: "desc" },
    take,
    select: postCardSelect,
  });

  if (posts.length === 0) return null;

  return (
    <Section tone={tone}>
      <SectionTitle
        eyebrow="Latest from Somtel"
        title="News, events and announcements"
        description="What is happening on the network, in our stores and across the communities we serve."
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.id}>
            <HoverLift className="h-full">
              <PostCard post={post} />
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-white px-6 py-2.5 text-[0.95rem] font-semibold text-primary-600 transition-colors duration-200 hover:border-primary-400 hover:bg-primary-50/50"
        >
          All news and events
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
}
