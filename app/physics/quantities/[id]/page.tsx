import Link from "next/link";
import { notFound } from "next/navigation";
import { QuantityDetail } from "@/components/QuantityDetail";
import { getQuantity, quantities } from "@/content/physics";

export function generateStaticParams() {
  return quantities.map((q) => ({ id: q.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quantity = getQuantity(id);
  if (!quantity) return { title: "Quantity not found" };
  return {
    title: `${quantity.name} — Physics Ontology`,
    description: quantity.description,
  };
}

export default async function QuantityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quantity = getQuantity(id);
  if (!quantity) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/physics/quantities"
        className="mb-6 inline-flex text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Back to all quantities
      </Link>
      <QuantityDetail quantity={quantity} />
    </div>
  );
}
