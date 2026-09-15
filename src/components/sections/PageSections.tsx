// Renders a page's ordered section blocks.
//
// This is the whole "page layout" system: a page row in the database is a list
// of PageSection rows, and this walks them in order handing each to the block
// component that matches its `type`.

import { SectionBlock } from "./blocks";
import type { SectionView } from "@/lib/sections";

export default function PageSections({ sections }: { sections: SectionView[] }) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}
    </>
  );
}
