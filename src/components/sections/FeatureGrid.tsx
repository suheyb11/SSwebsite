// Renders a group of Feature rows as outline cards.
// Used by /Career (benefits, hiring steps) and /contact-us (ways to reach us).

import { Card } from "@/components/ui";
import Glyph from "@/components/ui/Glyph";
import { Stagger, StaggerItem } from "@/components/motion";
import { iconFor } from "@/lib/icons";

type FeatureTile = {
  id: number;
  icon: string | null;
  title: string;
  text: string;
  // Somali twins, null when the tile has not been translated yet.
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function FeatureGrid({
  features,
  columns = 3,
}: {
  features: FeatureTile[];
  columns?: 2 | 3 | 4;
}) {
  if (features.length === 0) return null;

  return (
    <Stagger className={`grid gap-6 ${columnClasses[columns]}`}>
      {features.map((feature) => {
        const Icon = iconFor(feature.icon);

        return (
          <StaggerItem key={feature.id}>
            <Card>
              {/* Tinted glyph, no box around the icon itself. */}
              <Glyph Icon={Icon} />
              <h3 className="mt-5 text-lg font-semibold text-fg">{(feature.title ?? "")}</h3>
              <p className="mt-2.5 text-muted">{(feature.text ?? "")}</p>
            </Card>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
