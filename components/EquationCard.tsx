import { MathRenderer } from "./MathRenderer";
import { QuantityChip } from "./QuantityChip";
import {
  categoryStyles,
  getQuantity,
  getScientists,
  type Equation,
} from "@/content/physics";

interface EquationCardProps {
  equation: Equation;
}

/**
 * Displays an equation with its rendered LaTeX and a row of clickable variable
 * chips. Each chip carries the exact symbol from the equation and drills down
 * into the corresponding quantity.
 */
export function EquationCard({ equation }: EquationCardProps) {
  const style = categoryStyles[equation.area];
  const scientists = getScientists(equation.scientistIds);

  return (
    <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold">{equation.name}</h3>
        <span className={`text-xs font-medium ${style.text}`}>
          {equation.subsection}
        </span>
      </div>

      <div className="my-4 overflow-x-auto py-2 text-xl">
        <MathRenderer latex={equation.latex} display />
      </div>

      <p className="text-sm text-[var(--muted)]">{equation.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {equation.variables.map((v, i) => {
          const quantity = getQuantity(v.quantityId);
          if (!quantity) return null;
          return (
            <QuantityChip
              key={`${v.symbol}-${i}`}
              quantity={quantity}
              symbol={v.symbol}
              label={v.role ?? quantity.name}
            />
          );
        })}
      </div>

      {scientists.length > 0 && (
        <div className="mt-3 text-xs text-[var(--muted)]">
          {scientists.map((s) => s.name).join(" · ")}
        </div>
      )}
    </div>
  );
}
