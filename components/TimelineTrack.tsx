import { ScientistCard } from "./ScientistCard";
import type { Scientist } from "@/content/physics";

interface TimelineTrackProps {
  /** Scientists already sorted chronologically by the caller. */
  scientists: Scientist[];
}

/**
 * A horizontally scrolling chronological timeline. A connecting line runs
 * along the track; each scientist sits above a birth-year marker, with their
 * card below. Falls back to wrapping on very small screens.
 */
export function TimelineTrack({ scientists }: TimelineTrackProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <ol className="flex min-w-max flex-wrap gap-6 sm:flex-nowrap">
        {scientists.map((scientist) => (
          <li
            key={scientist.id}
            className="relative flex w-72 shrink-0 flex-col"
          >
            <div className="relative flex items-center pb-4">
              {/* Connecting line behind the marker. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--border)]"
              />
              <span
                aria-hidden
                className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 ring-4 ring-[var(--background)]"
              />
              <span className="relative z-10 ml-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs font-medium tabular-nums text-[var(--foreground)]">
                {scientist.born}
              </span>
            </div>
            <ScientistCard scientist={scientist} />
          </li>
        ))}
      </ol>
    </div>
  );
}
