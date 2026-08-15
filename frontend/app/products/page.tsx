import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { productsPageProducts } from "@/lib/productCatalog";

export const metadata = {
  title: "Products | Origin Store",
  description: "Explore Origin Peptides research products."
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-[linear-gradient(135deg,#fff_0%,#fbf8ff_48%,#f8fbff_100%)] pt-[83px] font-sans text-origin-ink">
        <section className="relative mx-auto max-w-[1780px] overflow-hidden px-5 py-9 md:px-12 md:py-12">
          <div className="pointer-events-none absolute right-0 top-0 h-[210px] w-[390px] bg-[radial-gradient(circle_at_60%_35%,rgba(118,80,216,.12),transparent_58%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-[210px] w-[390px] opacity-35 [background-image:linear-gradient(30deg,rgba(118,80,216,.16)_1px,transparent_1px),linear-gradient(150deg,rgba(118,80,216,.12)_1px,transparent_1px)] [background-size:58px_58px]" />

          <div className="relative">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#7650d8]">Research Collection</p>
            <h1 className="mt-3 font-sans text-[44px] font-extrabold leading-none tracking-[-.025em] text-[#202329] md:text-[58px]">All Products</h1>
            <p className="mt-5 text-[18px] font-medium leading-6 tracking-normal text-[#5d6674]">
              High-Quality Compounds for Laboratory Research
            </p>
          </div>

          <ProductsGrid products={productsPageProducts} />
        </section>
      </main>
      <Footer />
    </>
  );
}
