// Core domain types for the Physics Ontology.
// The entire app is driven by three typed collections (quantities, equations,
// scientists) so that content can be authored and expanded independently.

export type Category =
  | "base-si"
  | "mechanics"
  | "electromagnetism"
  | "thermodynamics"
  | "waves"
  | "optics"
  | "quantum"
  | "relativity";

export interface CategoryMeta {
  id: Category;
  name: string;
  /** Short blurb describing the area of physics. */
  blurb: string;
}

/** A single unit a quantity can be expressed in. */
export interface Unit {
  name: string;
  symbol: string;
  /** Multiply a value in this unit by `siFactor` to convert to the SI unit. */
  siFactor: number;
}

/** A notable value used to anchor a quantity's order-of-magnitude range. */
export interface MagnitudeExample {
  label: string;
  /** Value expressed in `MagnitudeRange.unit`. */
  value: number;
}

/** The order-of-magnitude span a quantity occupies in the physical world. */
export interface MagnitudeRange {
  /** Unit the min/max/examples are expressed in (usually the SI symbol). */
  unit: string;
  min: number;
  max: number;
  examples: MagnitudeExample[];
}

export interface Quantity {
  id: string;
  name: string;
  /** Rendered as LaTeX, e.g. "B", "\\vec{F}", "\\Phi". */
  symbol: string;
  category: Category;
  /** Periodic-table-style placement (1-indexed). */
  grid: { col: number; row: number };
  /** Dimensional formula, e.g. "M T^{-2} I^{-1}". */
  dimension: string;
  /** Short description of what the quantity represents. */
  description: string;
  units: Unit[];
  /** Ids of equations this quantity appears in. */
  equationIds: string[];
  magnitudeRange: MagnitudeRange;
}

/** Maps a symbol within an equation's LaTeX to a drill-down quantity. */
export interface EquationVariable {
  /** The plain token as it appears, e.g. "F", "m", "a". */
  symbol: string;
  quantityId: string;
  /** Optional role label, e.g. "force", "mass". */
  role?: string;
}

export interface Equation {
  id: string;
  name: string;
  /** Full equation in LaTeX, e.g. "\\vec{F} = m\\vec{a}". */
  latex: string;
  area: Category;
  /** Grouping within an area, e.g. "Newtonian dynamics". */
  subsection: string;
  description: string;
  variables: EquationVariable[];
  scientistIds: string[];
}

export interface Scientist {
  id: string;
  name: string;
  born: number;
  died?: number;
  /** Path (relative to /public) or remote URL for a portrait. */
  image?: string;
  blurb: string;
  /** Ids of equations associated with this scientist. */
  equationIds: string[];
  /** Ids of quantities associated with this scientist. */
  quantityIds: string[];
}
