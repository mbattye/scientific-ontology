import { MathRenderer } from "./MathRenderer";
import { QuantityChip } from "./QuantityChip";
import { getEquations, getQuantities, type Scientist } from "@/content/physics";

interface ScientistCardProps {
  scientist: Scientist;
}

/** First letters of the first and last name, e.g. "Isaac Newton" -> "IN". */
function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "?";
}

function lifespan(scientist: Scientist): string {
  return scientist.died !== undefined
    ? `${scientist.born}\u2013${scientist.died}`
    : `b. ${scientist.born}`;
}

/**
 * A self-contained card for a single scientist: avatar (portrait or initials
 * badge), lifespan, blurb, their equations, and clickable quantity chips.
 * Server component — no client JS required.
 */
export function ScientistCard({ scientist }: ScientistCardProps) {
  const equations = getEquations(scientist.equationIds);
  const quantities = getQuantities(scientist.quantityIds);

  return (
    <article
      id={scientist.id}
      className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 scroll-mt-24"
    >
      <header className="flex items-center gap-3">
        {scientist.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scientist.image}
            alt={scientist.name}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white"
          >
            {initialsFor(scientist.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[var(--foreground)]">
            {scientist.name}
          </h3>
          <p className="text-xs tabular-nums text-[var(--muted)]">
            {lifespan(scientist)}
          </p>
        </div>
      </header>

      <p className="mt-3 text-sm text-[var(--muted)]">{scientist.blurb}</p>

      {equations.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <h4 className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Equations
          </h4>
          <ul className="flex flex-col gap-1.5">
            {equations.map((eq) => (
              <li
                key={eq.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5"
              >
                <span className="truncate text-xs text-[var(--muted)]">
                  {eq.name}
                </span>
                <span className="shrink-0 text-sm">
                  <MathRenderer latex={eq.latex} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quantities.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {quantities.map((q) => (
            <QuantityChip key={q.id} quantity={q} />
          ))}
        </div>
      )}
    </article>
  );
}
