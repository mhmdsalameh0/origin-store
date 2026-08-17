import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

const documents = [
  {
    name: "GHK-CU 50 MG",
    subtitle: "GHK-CU 50 MG",
    copy: "PDF Document Review certificate documentation for Glow 70mg including batch reference and supporting quality verification details."
  },
  {
    name: "MOTS-C 10 MG",
    subtitle: "MOTS-C 10 MG",
    copy: "PDF Document Review certificate documentation for Glow 70mg including batch reference and supporting quality verification details."
  },
  {
    name: "TB-500 5 MG",
    subtitle: "TB-500 5 MG",
    copy: "PDF Document Review certificate documentation for KLOW 80mg including batch reference and supporting quality verification details."
  },
  {
    name: "BPC-157",
    subtitle: "BPC-157",
    copy: "PDF Document Review certificate documentation for KLOW 80mg including batch reference and supporting quality verification details."
  },
  {
    name: "Retatrutide 10 MG",
    subtitle: "Retatrutide 10 MG",
    copy: "PDF Document Review certificate documentation for KLOW 80mg including batch reference and supporting quality verification details."
  }
];

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

          <div className="mx-auto mt-8 grid max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <article
                className="relative min-h-[310px] border border-[#5f35b2] bg-white px-10 pb-10 pt-20 shadow-[0_8px_20px_rgba(15,23,42,.08)]"
                key={document.name}
              >
                <span className="absolute left-0 top-0 bg-[#7650d8] px-2 py-1 text-[8px] font-extrabold text-white">Available</span>
                <h2 className="text-[14px] font-extrabold leading-tight text-black">{document.name}</h2>
                <p className="mt-4 text-[11px] font-medium leading-tight text-[#536174]">{document.subtitle}</p>
                <p className="mt-2 text-[11px] font-medium leading-[1.55] text-[#536174]">{document.copy}</p>
                <button
                  aria-disabled="true"
                  className="mt-5 h-10 w-[136px] cursor-not-allowed bg-black text-[10px] font-extrabold text-white opacity-100"
                  disabled
                  type="button"
                >
                  VIEW COA
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
