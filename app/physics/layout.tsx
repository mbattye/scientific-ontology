import type { ReactNode } from "react";
import { ViewSwitcher } from "@/components/ViewSwitcher";

export default function PhysicsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Physics Ontology
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            One map of physics, three ways in. Drill down on any quantity to see
            its units, the equations it lives in, and how its values span the
            universe.
          </p>
        </div>
        <ViewSwitcher />
      </div>
      {children}
      {modal}
    </div>
  );
}
