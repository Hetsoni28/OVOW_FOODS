import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OrderReceipt } from "@/components/receipt/OrderReceipt";

export const metadata: Metadata = pageMetadata({
  title: "Order Receipt",
  description: "View and download your OVOW FOODS order receipt.",
  path: "/receipt",
  noIndex: true,
});

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <OrderReceipt orderId={id} />;
}
