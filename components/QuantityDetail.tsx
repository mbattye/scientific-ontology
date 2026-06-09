import Link from "next/link";
import { MathRenderer } from "./MathRenderer";
import { RangeScale } from "./RangeScale";
import {
  categoryMap,
  categoryStyles,
  getEquations,
  getScientistsForQuantity,
  type Quantity,
} from "@/content/physics";

interface QuantityDetailProps {
  quantity: Quantity;
}

export function QuantityDetail({ quantity }: QuantityDetailProps) {
  const style = categoryStyles[quantity.category];
  const category = categoryMap[quantity.category];
  const equations = getEquations(quantity.equationIds);
  const scientists = getScientistsForQuantity(quantity.id);
  const siUnit = quantity.units[0];

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="flex items-start gap-4">
        <div
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl border text-3xl ${style.tile} ${style.border}`}
        >
          <MathRenderer latex={quantity.symbol} />
        </div>
        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${style.border} ${style.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${style.swatch}`} />
            {category.name}
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            {quantity.name}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-[var(--muted)]">
            {quantity.description}
          </p>
        </div>
      </header>

      {/* Units + dimension */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              SI unit
            </h3>
            {siUnit && (
              <p className="text-lg font-semibold">
                {siUnit.name}{" "}
                <span className="text-[var(--muted)]">({siUnit.symbol})</span>
              </p>
            )}
            <p className="mt-2 text-sm text-[var(--muted)]">
              Dimension:{" "}
              <span className="font-mono">
                <MathRenderer latex={`[\\,${quantity.dimension}\\,]`} />
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Other units
            </h3>
            <ul className="space-y-1 text-sm">
              {quantity.units.map((u) => (
                <li key={u.symbol} className="flex justify-between gap-2">
                  <span>
                    {u.name}{" "}
                    <span className="text-[var(--muted)]">({u.symbol})</span>
                  </span>
                  {u.siFactor !== 1 && (
                    <span className="font-mono text-[var(--muted)]">
                      ×{u.siFactor.toExponential(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Order-of-magnitude range */}
      <section>
        <h3 className="mb-1 text-sm font-semibold">Order of magnitude</h3>
        <p className="text-xs text-[var(--muted)]">
          How values of {quantity.name.toLowerCase()} span the physical world (in{" "}
          {quantity.magnitudeRange.unit}, log scale).
        </p>
        <div className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5">
          <RangeScale range={quantity.magnitudeRange} />
        </div>
      </section>

      {/* Equations */}
      {equations.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold">
            Appears in {equations.length} equation
            {equations.length > 1 ? "s" : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {equations.map((eq) => (
              <div
                key={eq.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              >
                <div className="text-xs text-[var(--muted)]">{eq.name}</div>
                <div className="text-lg">
                  <MathRenderer latex={eq.latex} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Scientists */}
      {scientists.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold">Associated scientists</h3>
          <div className="flex flex-wrap gap-2">
            {scientists.map((s) => (
              <Link
                key={s.id}
                href={`/physics/timeline#${s.id}`}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm hover:border-sky-400/60"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
