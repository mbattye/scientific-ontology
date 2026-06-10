import { SciNotation } from "./SciNotation";
import type { MagnitudeExample, MagnitudeRange } from "@/content/physics";

interface RangeScaleProps {
  range: MagnitudeRange;
}

type Anchor = "start" | "center" | "end";

interface LabelLayout {
  example: MagnitudeExample;
  pos: number;
  lane: number;
  above: boolean;
  anchor: Anchor;
}

/** Approximate horizontal footprint of a label card as % of track width. */
const LABEL_WIDTH_PCT = 34;
const MIN_GAP_PCT = 3;
/** Label card height (title + value + padding + superscripts). */
const CARD_HEIGHT = 3.25; // rem
/** Half-height of the marker dot. */
const DOT_HALF = 0.5; // rem
/** Gap between the track dot and the nearest label row. */
const GAP_FROM_DOT = 0.75; // rem
/** Extra vertical space per additional stacked lane. */
const LANE_STACK = 3.35; // rem
/** Horizontal inset so edge labels stay inside the container (% each side). */
const TRACK_INSET = 8;

function anchorFor(pos: number): Anchor {
  if (pos < 20) return "start";
  if (pos > 80) return "end";
  return "center";
}

function spanFor(pos: number, anchor: Anchor): { start: number; end: number } {
  if (anchor === "start") return { start: pos, end: pos + LABEL_WIDTH_PCT };
  if (anchor === "end") return { start: pos - LABEL_WIDTH_PCT, end: pos };
  const half = LABEL_WIDTH_PCT / 2;
  return { start: pos - half, end: pos + half };
}

function overlaps(
  a: { start: number; end: number },
  b: { start: number; end: number },
): boolean {
  return !(a.end + MIN_GAP_PCT < b.start || a.start > b.end + MIN_GAP_PCT);
}

function firstFreeLane(
  position: number,
  anchor: Anchor,
  lanes: Array<Array<{ start: number; end: number }>>,
): number {
  const span = spanFor(position, anchor);
  for (let lane = 0; lane < lanes.length; lane++) {
    const busy = lanes[lane].some((occupied) => overlaps(span, occupied));
    if (!busy) return lane;
  }
  return lanes.length;
}

function layoutLabels(
  examples: MagnitudeExample[],
  pos: (v: number) => number,
): LabelLayout[] {
  const sorted = [...examples]
    .map((example) => ({ example, pos: pos(example.value) }))
    .sort((a, b) => a.pos - b.pos);

  const aboveLanes: Array<Array<{ start: number; end: number }>> = [];
  const belowLanes: Array<Array<{ start: number; end: number }>> = [];
  const layouts: LabelLayout[] = [];

  sorted.forEach(({ example, pos: position }, index) => {
    const anchor = anchorFor(position);
    const aboveLane = firstFreeLane(position, anchor, aboveLanes);
    const belowLane = firstFreeLane(position, anchor, belowLanes);
    // When lanes tie, alternate above/below so labels don't all stack on one side.
    const above =
      aboveLane < belowLane ||
      (aboveLane === belowLane && index % 2 === 0);
    const lane = above ? aboveLane : belowLane;
    const lanes = above ? aboveLanes : belowLanes;

    if (!lanes[lane]) lanes[lane] = [];
    lanes[lane].push(spanFor(position, anchor));

    layouts.push({ example, pos: position, lane, above, anchor });
  });

  return layouts;
}

function labelPosition(anchor: Anchor): string {
  if (anchor === "start") return "left-0";
  if (anchor === "end") return "right-0";
  return "left-1/2 -translate-x-1/2";
}

function ExampleLabel({
  example,
  unit,
}: {
  example: MagnitudeExample;
  unit: string;
}) {
  return (
    <div className="w-[8.5rem] rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 shadow-sm">
      <div className="text-[11px] font-medium leading-snug text-[var(--foreground)]">
        {example.label}
      </div>
      <div className="mt-0.5 text-[10px] leading-snug text-[var(--muted)]">
        <SciNotation value={example.value} /> {unit}
      </div>
    </div>
  );
}

/**
 * A logarithmic order-of-magnitude bar with example values plotted along it.
 * Labels are collision-aware, edge-anchored, and sit in dedicated lanes so they
 * never overlap the track or clip the container.
 */
export function RangeScale({ range }: RangeScaleProps) {
  const logMin = Math.log10(range.min);
  const logMax = Math.log10(range.max);
  const span = logMax - logMin || 1;

  const pos = (v: number) =>
    Math.min(100, Math.max(0, ((Math.log10(v) - logMin) / span) * 100));

  /** Map data position → inset visual position so edge labels have room. */
  const displayPos = (v: number) =>
    TRACK_INSET + (pos(v) / 100) * (100 - 2 * TRACK_INSET);

  const layouts = layoutLabels(range.examples, displayPos);

  const maxAboveLane = layouts.reduce(
    (max, l) => (l.above ? Math.max(max, l.lane) : max),
    -1,
  );
  const maxBelowLane = layouts.reduce(
    (max, l) => (!l.above ? Math.max(max, l.lane) : max),
    -1,
  );

  const laneOffset = (lane: number) => GAP_FROM_DOT + lane * LANE_STACK;

  const verticalExtent = (maxLane: number) =>
    maxLane >= 0
      ? laneOffset(maxLane) + CARD_HEIGHT + DOT_HALF + 1.75
      : 1.25;

  const paddingTop = verticalExtent(maxAboveLane);
  const paddingBottom = verticalExtent(maxBelowLane);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[17rem] px-2">
        <div
          className="relative"
          style={{
            paddingTop: `${paddingTop}rem`,
            paddingBottom: `${paddingBottom}rem`,
          }}
        >
          {/* Gradient track */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 shadow-inner"
            aria-hidden
          />

          {layouts.map(({ example, pos: position, lane, above, anchor }) => {
            const offset = laneOffset(lane);

            return (
              <div
                key={`${example.label}-${example.value}`}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position}%` }}
              >
                {/* Marker dot — always centred on the track */}
                <div
                  className="relative z-20 h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[var(--foreground)] shadow-sm ring-2 ring-[var(--foreground)]/10"
                  aria-hidden
                />

                {/* Connector line */}
                <div
                  className={`absolute left-1/2 z-0 w-px -translate-x-1/2 bg-[var(--border)] ${
                    above ? "bottom-full" : "top-full"
                  }`}
                  style={{ height: `${Math.max(0.25, offset - 0.2)}rem` }}
                  aria-hidden
                />

                {/* Label card */}
                <div
                  className={`absolute z-10 ${labelPosition(anchor)} ${
                    above ? "bottom-full" : "top-full"
                  }`}
                  style={
                    above
                      ? { marginBottom: `${offset}rem` }
                      : { marginTop: `${offset}rem` }
                  }
                >
                  <ExampleLabel example={example} unit={range.unit} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Endpoints */}
        <div className="mt-1 flex items-start justify-between gap-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
          <span className="min-w-0 shrink-0">
            <span className="block text-[10px] uppercase tracking-wide opacity-70">
              Lower limit
            </span>
            <SciNotation value={range.min} /> {range.unit}
          </span>
          <span className="min-w-0 shrink-0 text-right">
            <span className="block text-[10px] uppercase tracking-wide opacity-70">
              Upper limit
            </span>
            <SciNotation value={range.max} /> {range.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
