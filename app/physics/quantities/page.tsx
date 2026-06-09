import type { Metadata } from "next";
import { PeriodicGrid } from "@/components/PeriodicGrid";
import { categories, categoryStyles, quantities } from "@/content/physics";

export const metadata: Metadata = {
  title: "Quantities — Physics Ontology",
};

export default function QuantitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-sm text-[var(--muted)]">
        Every tile is a physical quantity, grouped like the periodic table.
        Click any to drill into its units, equations and scale.
      </p>

      <PeriodicGrid quantities={quantities} />

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
