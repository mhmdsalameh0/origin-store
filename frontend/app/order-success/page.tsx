import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Link from "next/link";

type OrderSuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export const metadata = {
  title: "Order Received | Origin Store",
  description: "Your Origin Peptides order was received."
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { order } = await searchParams;
  const orderNumber = order ?? "Pending";

  return (
    <>
      <Header />
      <main className="grid min-h-[calc(100vh-360px)] place-items-center bg-white px-5 pt-[83px] font-sans text-origin-ink">
        <section className="my-16 w-full max-w-2xl rounded-[12px] border border-origin-line bg-white p-8 text-center shadow-[0_18px_55px_rgba(29,36,25,.08)] md:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#7650d8]">Order Received</p>
          <h1 className="mt-4 text-[36px] font-bold leading-tight text-black md:text-[52px]">Thank you for your order</h1>
          <p className="mt-5 text-base font-medium leading-7 text-[#5d6674]">
            Your order was saved successfully. Our team will contact you regarding payment and confirmation.
          </p>
          <div className="mx-auto mt-8 w-fit rounded-full border border-[#d8c9f7] bg-[#f7f3ff] px-6 py-3 text-sm font-bold text-[#202329]">
            Order number: <span className="text-[#7650d8]">{orderNumber}</span>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#5d6674]">Status: Pending Payment</p>
          <Link
            href="/products"
            className="mt-8 inline-grid h-12 place-items-center rounded-full bg-[#202329] px-8 text-sm font-bold text-white transition hover:bg-[#0f1115]"
          >
            Continue shopping
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
