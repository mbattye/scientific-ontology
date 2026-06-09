import { QuantityTile } from "@/components/QuantityTile";
import type { Quantity } from "@/content/physics";

/**
 * Lays quantity tiles out on a 12-column CSS grid, placing each tile at its
 * authored `grid.col` / `grid.row` like a periodic table. Scrolls horizontally
 * on narrow screens so the layout never collapses.
 */
export function PeriodicGrid({ quantities }: { quantities: Quantity[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="grid min-w-[44rem]"
        style={{
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "0.4rem",
        }}
      >
        {quantities.map((q) => (
          <div
            key={q.id}
            style={{ gridColumn: q.grid.col, gridRow: q.grid.row }}
          >
            <QuantityTile quantity={q} />
          </div>
        ))}
      </div>
    </div>
  );
}
