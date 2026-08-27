import { DocumentationClient } from "@/components/documentation/DocumentationClient";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export const metadata = {
  title: "Product Documentation | Origin Store",
  description: "Current Origin Peptides product documentation and available COAs."
};

export default function DocumentationPage() {
  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="mx-auto max-w-[1160px] px-5 py-12 md:px-8 md:py-16">
          <div className="text-center">
            <p className="text-[12px] font-extrabold uppercase italic tracking-normal text-black">AVAILABLE COAS</p>
            <h1 className="mt-2 text-[30px] font-bold italic leading-tight tracking-normal text-[#061224] md:text-[34px]">
              Current Product Documentation
            </h1>
          </div>

          <DocumentationClient />
        </section>
      </main>
      <Footer />
    </>
  );
}
