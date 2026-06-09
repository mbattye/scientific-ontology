"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
}

const items: NavItem[] = [
  { label: "Physics", href: "/physics", enabled: true },
  { label: "Chemistry", href: "/chemistry", enabled: false },
  { label: "Biology", href: "/biology", enabled: false },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white">
            SO
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Scientific Ontology
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          {items.map((item) => {
            const active =
              item.enabled &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

            if (!item.enabled) {
              return (
                <span
                  key={item.label}
                  title="Coming soon"
                  className="cursor-not-allowed rounded-full px-3 py-1.5 text-sm text-[var(--muted)]/60"
                >
                  {item.label}
                  <span className="ml-1 hidden text-[10px] uppercase tracking-wide opacity-70 sm:inline">
                    soon
                  </span>
                </span>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sky-500/15 text-sky-600 dark:text-sky-300"
                    : "text-[var(--foreground)]/80 hover:bg-[var(--foreground)]/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
