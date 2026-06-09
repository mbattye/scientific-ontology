import Link from "next/link";
import { categoryStyles, type Quantity } from "@/content/physics";
import { MathRenderer } from "@/components/MathRenderer";

/**
 * A single periodic-table-style tile for a physical quantity. Links to the
 * drill-down route, which opens as an in-context slide-over modal.
 */
export function QuantityTile({ quantity }: { quantity: Quantity }) {
  const s = categoryStyles[quantity.category];
  const siUnit = quantity.units[0]?.symbol;

  return (
    <Link
      href={`/physics/quantities/${quantity.id}`}
      title={quantity.name}
      className={`group relative flex aspect-square flex-col justify-between rounded-xl border p-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] sm:p-2 ${s.tile} ${s.tileHover} ${s.border}`}
    >
      {siUnit ? (
        <span className="absolute right-1.5 top-1 text-[0.6rem] font-medium opacity-60">
          {siUnit}
        </span>
      ) : null}
      <span className="flex flex-1 items-center justify-center text-lg leading-none sm:text-xl">
        <MathRenderer latex={quantity.symbol} />
      </span>
      <span className="block truncate text-center text-[0.6rem] font-medium leading-tight opacity-80 sm:text-[0.65rem]">
        {quantity.name}
      </span>
    </Link>
  );
}
