"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const views = [
  {
    href: "/physics/quantities",
    label: "Quantities",
    hint: "Periodic table of physical quantities",
  },
  {
    href: "/physics/areas",
    label: "Areas & Equations",
    hint: "Browse by field of physics",
  },
  {
    href: "/physics/timeline",
    label: "Timeline",
    hint: "History through its scientists",
  },
];

export function ViewSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {views.map((v) => {
        const active = pathname.startsWith(v.href);
        return (
          <Link
            key={v.href}
            href={v.href}
            title={v.hint}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-300"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]/80 hover:border-sky-400/60"
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
