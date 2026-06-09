import Link from "next/link";

const disciplines = [
  {
    name: "Physics",
    href: "/physics",
    enabled: true,
    blurb:
      "Quantities, equations and the scientists who found them — from femtometres to the cosmic scale.",
    accent: "from-sky-500 to-indigo-600",
  },
  {
    name: "Chemistry",
    href: "#",
    enabled: false,
    blurb: "Elements, reactions and the molecular world. Coming soon.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    name: "Biology",
    href: "#",
    enabled: false,
    blurb: "Life from molecules to ecosystems. Coming soon.",
    accent: "from-rose-500 to-pink-600",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Scientific Ontology
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
          A topsight of the sciences. See the whole landscape of physical
          phenomena, then drill down into the quantities, units and equations
          that connect them.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {disciplines.map((d) => {
          const card = (
            <div
              className={`group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow ${
                d.enabled ? "hover:shadow-lg" : "opacity-70"
              }`}
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${d.accent} px-3 py-1 text-sm font-semibold text-white`}
              >
                {d.name}
              </div>
              <p className="text-sm text-[var(--muted)]">{d.blurb}</p>
              {d.enabled ? (
                <span className="mt-4 inline-block text-sm font-medium text-sky-600 dark:text-sky-300">
                  Explore →
                </span>
              ) : (
                <span className="mt-4 inline-block text-sm font-medium text-[var(--muted)]/70">
                  Coming soon
                </span>
              )}
            </div>
          );

          return d.enabled ? (
            <Link key={d.name} href={d.href}>
              {card}
            </Link>
          ) : (
            <div key={d.name}>{card}</div>
          );
        })}
      </div>
    </main>
  );
}
