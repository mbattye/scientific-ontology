import type { Metadata } from "next";
import { PeriodicGrid } from "@/components/PeriodicGrid";
import {
  categories,
  categoryStyles,
  fundamentalConstants,
  physicalQuantities,
} from "@/content/physics";

export const metadata: Metadata = {
  title: "Quantities — Physics Ontology",
};

export default function QuantitiesPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Every tile is a physical quantity, grouped like the periodic table.
          Click any to drill into its units, equations and scale.
        </p>

        <PeriodicGrid quantities={physicalQuantities} />
      </section>

      <section id="constants" className="flex scroll-mt-24 flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Fundamental Constants
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            Fixed values from AQA and Edexcel A-level data sheets. Each links
            into the same drill-down — units, defining equations, and where the
            constant appears across physics.
          </p>
        </div>

        <PeriodicGrid quantities={fundamentalConstants} />
      </section>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center gap-2 text-sm">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${categoryStyles[c.id].swatch}`}
              aria-hidden
            />
            <span className="text-[var(--foreground)]">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
