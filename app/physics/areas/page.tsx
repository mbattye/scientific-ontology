import type { Metadata } from "next";
import { EquationCard } from "@/components/EquationCard";
import {
  categories,
  categoryMap,
  categoryStyles,
  getEquationsByArea,
  type Equation,
} from "@/content/physics";

export const metadata: Metadata = {
  title: "Areas & Equations — Physics Ontology",
};

/** Group a list of equations by their `subsection` field, preserving order. */
function groupBySubsection(items: Equation[]): Record<string, Equation[]> {
  return items.reduce<Record<string, Equation[]>>((acc, eq) => {
    (acc[eq.subsection] ??= []).push(eq);
    return acc;
  }, {});
}

export default function AreasPage() {
  // Only areas that actually have equations (base-si has none).
  const areas = categories
    .map((c) => ({ meta: c, equations: getEquationsByArea(c.id) }))
    .filter((a) => a.equations.length > 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Browse physics field by field. Each equation is interactive — click any
          symbol chip to drill into the underlying quantity, its units, and the
          equations it appears in.
        </p>

        <nav className="sticky top-0 z-10 -mx-4 flex flex-wrap gap-2 border-b border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-4">
          {areas.map(({ meta }) => {
            const style = categoryStyles[meta.id];
            return (
              <a
                key={meta.id}
                href={`#${meta.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              >
                <span
                  className={`h-2 w-2 rounded-full ${style.swatch}`}
                  aria-hidden
                />
                {meta.name}
              </a>
            );
          })}
        </nav>
      </div>

      {areas.map(({ meta, equations }) => {
        const style = categoryStyles[meta.id];
        const subsections = groupBySubsection(equations);

        return (
          <section
            key={meta.id}
            id={meta.id}
            className="scroll-mt-24 flex flex-col gap-5"
          >
            <header className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-3 w-3 rounded-full ${style.swatch}`}
                  aria-hidden
                />
                <h2
                  className={`text-xl font-bold tracking-tight ${style.text}`}
                >
                  {meta.name}
                </h2>
              </div>
              <p className="text-sm text-[var(--muted)]">
                {categoryMap[meta.id].blurb}
              </p>
            </header>

            <div className="flex flex-col gap-6">
              {Object.entries(subsections).map(([subsection, eqs]) => (
                <div key={subsection} className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {subsection}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {eqs.map((eq) => (
                      <EquationCard key={eq.id} equation={eq} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
