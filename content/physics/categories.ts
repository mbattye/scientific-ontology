import type { Category, CategoryMeta } from "./types";

export const categories: CategoryMeta[] = [
  {
    id: "base-si",
    name: "Base SI",
    blurb: "The seven base quantities from which all others are derived.",
  },
  {
    id: "mechanics",
    name: "Mechanics",
    blurb: "Motion, forces, energy and the dynamics of bodies.",
  },
  {
    id: "electromagnetism",
    name: "Electromagnetism",
    blurb: "Charges, currents, and electric and magnetic fields.",
  },
  {
    id: "thermodynamics",
    name: "Thermodynamics",
    blurb: "Heat, temperature, entropy and energy transfer.",
  },
  {
    id: "waves",
    name: "Waves",
    blurb: "Oscillations and the propagation of disturbances.",
  },
  {
    id: "optics",
    name: "Optics",
    blurb: "The behaviour and properties of light.",
  },
  {
    id: "quantum",
    name: "Quantum",
    blurb: "Physics at the smallest scales, where action is quantised.",
  },
  {
    id: "relativity",
    name: "Relativity",
    blurb: "Space, time and gravity at high speeds and large scales.",
  },
];

export const categoryMap: Record<Category, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<Category, CategoryMeta>;

/**
 * Static Tailwind class strings per category. Written out in full so the
 * Tailwind compiler can see every class literally (no dynamic concatenation).
 */
export interface CategoryStyle {
  /** Tile background + text. */
  tile: string;
  /** Hover state for interactive tiles. */
  tileHover: string;
  /** Small swatch / accent background. */
  swatch: string;
  /** Text color for accents on dark surfaces. */
  text: string;
  /** Subtle border. */
  border: string;
}

export const categoryStyles: Record<Category, CategoryStyle> = {
  "base-si": {
    tile: "bg-slate-100 text-slate-900 dark:bg-slate-800/60 dark:text-slate-100",
    tileHover: "hover:bg-slate-200 dark:hover:bg-slate-700",
    swatch: "bg-slate-400",
    text: "text-slate-600 dark:text-slate-300",
    border: "border-slate-300 dark:border-slate-700",
  },
  mechanics: {
    tile: "bg-sky-100 text-sky-950 dark:bg-sky-900/50 dark:text-sky-100",
    tileHover: "hover:bg-sky-200 dark:hover:bg-sky-800",
    swatch: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-300 dark:border-sky-700",
  },
  electromagnetism: {
    tile: "bg-amber-100 text-amber-950 dark:bg-amber-900/50 dark:text-amber-100",
    tileHover: "hover:bg-amber-200 dark:hover:bg-amber-800",
    swatch: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
  },
  thermodynamics: {
    tile: "bg-rose-100 text-rose-950 dark:bg-rose-900/50 dark:text-rose-100",
    tileHover: "hover:bg-rose-200 dark:hover:bg-rose-800",
    swatch: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-700",
  },
  waves: {
    tile: "bg-violet-100 text-violet-950 dark:bg-violet-900/50 dark:text-violet-100",
    tileHover: "hover:bg-violet-200 dark:hover:bg-violet-800",
    swatch: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-300 dark:border-violet-700",
  },
  optics: {
    tile: "bg-teal-100 text-teal-950 dark:bg-teal-900/50 dark:text-teal-100",
    tileHover: "hover:bg-teal-200 dark:hover:bg-teal-800",
    swatch: "bg-teal-500",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-300 dark:border-teal-700",
  },
  quantum: {
    tile: "bg-emerald-100 text-emerald-950 dark:bg-emerald-900/50 dark:text-emerald-100",
    tileHover: "hover:bg-emerald-200 dark:hover:bg-emerald-800",
    swatch: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  relativity: {
    tile: "bg-indigo-100 text-indigo-950 dark:bg-indigo-900/50 dark:text-indigo-100",
    tileHover: "hover:bg-indigo-200 dark:hover:bg-indigo-800",
    swatch: "bg-indigo-500",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-300 dark:border-indigo-700",
  },
};
