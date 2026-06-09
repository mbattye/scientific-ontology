import type { Equation, Quantity, Scientist } from "./types";
import { constants as constantSeeds } from "./data/constants";
import { quantities as quantitySeeds } from "./data/quantities";
import { equations as equationData } from "./data/equations";
import { scientists as scientistSeeds } from "./data/scientists";

export * from "./types";
export { categories, categoryMap, categoryStyles } from "./categories";
export type { CategoryStyle } from "./categories";

// Equations are the single source of truth for quantity <-> equation links.
export const equations: Equation[] = equationData;

// Build quantity.equationIds by scanning every equation's variables.
const equationIdsByQuantity = new Map<string, string[]>();
for (const eq of equationData) {
  for (const v of eq.variables) {
    const list = equationIdsByQuantity.get(v.quantityId) ?? [];
    if (!list.includes(eq.id)) list.push(eq.id);
    equationIdsByQuantity.set(v.quantityId, list);
  }
}

const allQuantitySeeds = [...quantitySeeds, ...constantSeeds];

export const quantities: Quantity[] = allQuantitySeeds.map((q) => ({
  ...q,
  equationIds: equationIdsByQuantity.get(q.id) ?? [],
}));

/** Measurable quantities (periodic table, rows 1–7). */
export const physicalQuantities = quantities.filter(
  (q) => q.category !== "constants",
);

/** Fundamental constants (A-level data sheet values). */
export const fundamentalConstants = quantities.filter(
  (q) => q.category === "constants",
);

// Derive each scientist's quantityIds from their equations, merged with any
// explicitly authored ids.
export const scientists: Scientist[] = scientistSeeds.map((s) => {
  const derived = new Set<string>(s.quantityIds ?? []);
  for (const eqId of s.equationIds) {
    const eq = equationData.find((e) => e.id === eqId);
    eq?.variables.forEach((v) => derived.add(v.quantityId));
  }
  return { ...s, quantityIds: [...derived] };
});

// ----------------------------------------------------------------- lookups
const quantityById = new Map(quantities.map((q) => [q.id, q]));
const equationById = new Map(equations.map((e) => [e.id, e]));
const scientistById = new Map(scientists.map((s) => [s.id, s]));

export function getQuantity(id: string): Quantity | undefined {
  return quantityById.get(id);
}

export function getEquation(id: string): Equation | undefined {
  return equationById.get(id);
}

export function getScientist(id: string): Scientist | undefined {
  return scientistById.get(id);
}

export function getQuantities(ids: string[]): Quantity[] {
  return ids.map((id) => quantityById.get(id)).filter((q): q is Quantity => !!q);
}

export function getEquations(ids: string[]): Equation[] {
  return ids.map((id) => equationById.get(id)).filter((e): e is Equation => !!e);
}

export function getScientists(ids: string[]): Scientist[] {
  return ids
    .map((id) => scientistById.get(id))
    .filter((s): s is Scientist => !!s);
}

/** Equations whose `area` matches the given category. */
export function getEquationsByArea(area: string): Equation[] {
  return equations.filter((e) => e.area === area);
}

/** Scientists associated with a quantity (via shared equations or explicit links). */
export function getScientistsForQuantity(quantityId: string): Scientist[] {
  return scientists.filter((s) => s.quantityIds.includes(quantityId));
}
