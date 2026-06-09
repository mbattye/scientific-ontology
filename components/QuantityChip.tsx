import Link from "next/link";
import { MathRenderer } from "./MathRenderer";
import { categoryStyles, type Quantity } from "@/content/physics";

interface QuantityChipProps {
  quantity: Quantity;
  /** Override the displayed symbol (e.g. the exact token from an equation). */
  symbol?: string;
  /** Override the displayed label (e.g. a variable's role). */
  label?: string;
}

/**
 * A clickable pill that drills down into a quantity. Used to make every symbol
 * in an equation (and every quantity reference) a doorway into its detail.
 */
export function QuantityChip({ quantity, symbol, label }: QuantityChipProps) {
  const style = categoryStyles[quantity.category];
  return (
    <Link
      href={`/physics/quantities/${quantity.id}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm transition-colors ${style.tile} ${style.tileHover} ${style.border}`}
    >
      <span className="font-medium">
        <MathRenderer latex={symbol ?? quantity.symbol} />
      </span>
      <span className="opacity-80">{label ?? quantity.name}</span>
    </Link>
  );
}
