import { TimelineTrack } from "@/components/TimelineTrack";
import { scientists } from "@/content/physics";

export const metadata = { title: "Timeline — Physics Ontology" };

export default function PhysicsTimelinePage() {
  const sorted = [...scientists].sort((a, b) => a.born - b.born);

  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-sm text-[var(--muted)]">
        Physics through the people who shaped it. Scroll the timeline; click any
        quantity to drill down.
      </p>

      <TimelineTrack scientists={sorted} />
    </div>
  );
}
