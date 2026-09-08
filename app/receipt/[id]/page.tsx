import { Metadata } from "next";
import { OrderReceipt } from "@/components/receipt/OrderReceipt";

export const metadata: Metadata = {
  title: "Order Receipt | OVOW FOODS",
  description: "View and download your OVOW FOODS order receipt.",
};

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <OrderReceipt orderId={id} />;
}
