import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="relative min-h-[440px] overflow-hidden bg-[#eef3fb] md:min-h-[520px]">
          <Image
            src="/images/1.png"
            alt="Origin Peptides product vials"
            fill
            priority
            sizes="100vw"
            className="object-contain object-center"
          />
          <div className="absolute inset-0 bg-black/48" />
          <div className="relative z-10 grid min-h-[440px] place-items-center px-6 text-center md:min-h-[520px]">
            <h1 className="text-[44px] font-extrabold leading-none text-white drop-shadow-[0_8px_28px_rgba(0,0,0,.36)] md:text-[64px]">
              About Us
            </h1>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-14 md:px-8 md:py-[70px]">
          <div className="pointer-events-none absolute -left-24 top-10 h-44 w-44 rounded-full bg-[#6f37b8]/[.06] blur-3xl" />
          <div className="pointer-events-none absolute bottom-8 right-8 h-56 w-56 rounded-full bg-[#6f37b8]/[.07] blur-3xl" />

          <div className="relative mx-auto grid max-w-[1200px] gap-8 md:gap-10 xl:grid-cols-2 xl:items-center">
            <div className="min-w-0">
              <h2 className="max-w-full text-[32px] font-bold leading-[1.05] tracking-[-.03em] text-black md:max-w-[600px] md:text-[44px] md:leading-[1.08]">
                <span className="block md:whitespace-nowrap">Discover the Story Behind</span>
                <span className="block md:whitespace-nowrap">Origin&rsquo;s Restored Peptides</span>
              </h2>

              <div className="mt-6 max-w-full space-y-3.5 text-[15px] font-normal leading-[1.65] text-[#2f3745] md:max-w-[560px] md:space-y-4 md:text-[16px]">
                <p>
                  Origin&rsquo;s Restored Peptides is committed to providing premium research peptides manufactured to the
                  highest quality standards. We focus on purity, consistency, and scientific integrity, supplying researchers
                  with reliable compounds that support laboratory and preclinical research applications.
                </p>

                <p>
                  At <span className="font-bold text-[#171c28]">Origin&rsquo;s Restored Peptides</span> we believe that
                  quality and transparency are the foundation of trusted research. Our mission is to deliver rigorously tested
                  research compounds, backed by strict quality control and dependable service, enabling researchers to conduct
                  their work with confidence.
                </p>
              </div>

              <div className="mt-8 grid w-full max-w-full gap-0 text-[14px] font-extrabold text-[#171c28] sm:max-w-[560px] sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center sm:text-center sm:text-[15px]">
                <span className="border-b border-[#d8cde9] py-3 sm:border-b-0 sm:py-0">99% Purity</span>
                <span className="hidden h-5 w-px bg-[#d8cde9] sm:block" aria-hidden="true" />
                <span className="border-b border-[#d8cde9] py-3 sm:border-b-0 sm:py-0">Quality Tested</span>
                <span className="hidden h-5 w-px bg-[#d8cde9] sm:block" aria-hidden="true" />
                <span className="py-3 sm:py-0">Research Use Only</span>
              </div>

            </div>

            <div className="flex min-w-0 justify-center xl:justify-end">
              <div className="relative mt-7 aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[#dfe3eb] bg-[#f7f8fb] md:mt-0 md:h-[320px] md:max-w-[500px] lg:h-[340px]">
                <Image
                  src="/images/about-origin-vials-closeup.png"
                  alt="Origin Peptides research vials in a laboratory"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 500px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
