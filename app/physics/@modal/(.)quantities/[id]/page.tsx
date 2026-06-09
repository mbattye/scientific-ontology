import { notFound } from "next/navigation";
import { Modal } from "@/components/Modal";
import { QuantityDetail } from "@/components/QuantityDetail";
import { getQuantity } from "@/content/physics";

export default async function QuantityModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quantity = getQuantity(id);
  if (!quantity) notFound();

  return (
    <Modal>
      <QuantityDetail quantity={quantity} />
    </Modal>
  );
}
