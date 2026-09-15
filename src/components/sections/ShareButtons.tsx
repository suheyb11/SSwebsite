"use client";

import { Link2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/ui/SocialIcons";

/** Share links for a blog post. Builds the URL from the browser so it works on any host. */
export default function ShareButtons({ title }: { title: string }) {
  function share(platform: "facebook" | "twitter" | "linkedin") {
    const url = window.location.href;

    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };

    window.open(targets[platform], "_blank", "width=600,height=400");
  }

  const buttonClass =
    "grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-500 hover:text-primary-700";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted">Share:</span>

      <button type="button" onClick={() => share("facebook")} aria-label="Share on Facebook" className={buttonClass}>
        <FacebookIcon size={17} />
      </button>

      <button type="button" onClick={() => share("twitter")} aria-label="Share on X" className={buttonClass}>
        <TwitterIcon size={17} />
      </button>

      <button type="button" onClick={() => share("linkedin")} aria-label="Share on LinkedIn" className={buttonClass}>
        <Link2 size={17} />
      </button>
    </div>
  );
}
