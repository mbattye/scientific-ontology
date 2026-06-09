import type { MagnitudeRange } from "@/content/physics";

interface RangeScaleProps {
  range: MagnitudeRange;
}

function Sci({ value }: { value: number }) {
  if (value === 0) return <>0</>;
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;
  const mantissaText =
    Math.abs(mantissa - 1) < 0.05 ? "" : `${mantissa.toFixed(1)} × `;
  return (
    <>
      {mantissaText}10<sup>{exponent}</sup>
    </>
  );
}

/**
 * A logarithmic order-of-magnitude bar with example values plotted along it.
 * Anchors the abstract span of a quantity to recognisable physical situations.
 */
export function RangeScale({ range }: RangeScaleProps) {
  const logMin = Math.log10(range.min);
  const logMax = Math.log10(range.max);
  const span = logMax - logMin || 1;

  const pos = (v: number) =>
    Math.min(100, Math.max(0, ((Math.log10(v) - logMin) / span) * 100));

  const sorted = [...range.examples].sort((a, b) => a.value - b.value);

  return (
    <div className="pt-8 pb-10">
      <div className="relative h-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400">
        {sorted.map((ex, i) => {
          const left = pos(ex.value);
          const above = i % 2 === 0;
          return (
            <div
              key={`${ex.label}-${i}`}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%` }}
            >
              <div className="h-3.5 w-3.5 rounded-full border-2 border-[var(--surface)] bg-[var(--foreground)] shadow" />
              <div
                className={`absolute left-1/2 w-32 -translate-x-1/2 text-center text-[11px] leading-tight ${
                  above ? "bottom-5" : "top-5"
                }`}
              >
                <div className="font-medium">{ex.label}</div>
                <div className="text-[var(--muted)]">
                  <Sci value={ex.value} /> {range.unit}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
        <span>
          <Sci value={range.min} /> {range.unit}
        </span>
        <span>
          <Sci value={range.max} /> {range.unit}
        </span>
      </div>
    </div>
  );
}
