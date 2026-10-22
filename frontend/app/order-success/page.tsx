import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { OrderConfirmation } from "./OrderConfirmation";

type OrderSuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export const metadata = {
  title: "Order Confirmation | Origin Restored",
  description: "Review your Origin Restored order and Interac E-Transfer payment instructions."
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { order } = await searchParams;
  return (
    <>
      <Header />
      <OrderConfirmation orderNumber={order ?? ""} />
      <Footer />
    </>
  );
}
