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

        <section className="relative overflow-hidden bg-[#0d1119] px-5 py-14 text-white md:px-8 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(55,122,255,.16),transparent_34%),radial-gradient(circle_at_74%_66%,rgba(100,73,204,.14),transparent_36%)]" />

          <div className="relative mx-auto max-w-[1280px]">
            <div className="grid gap-9 lg:grid-cols-[minmax(0,41%)_minmax(0,59%)] lg:items-center lg:gap-14">
              <div className="relative min-w-0 py-2 md:pl-10">
                <span className="pointer-events-none absolute -left-1 -top-8 text-[96px] font-extrabold leading-none text-white/[.035] md:left-0 md:text-[128px]">
                  01
                </span>
                <p className="relative flex items-center gap-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#3f8cff]">
                  <span className="h-9 w-[3px] rounded-full bg-[#2f86ff]" aria-hidden="true" />
                  Our Purpose
                </p>
                <h2 className="relative mt-5 text-[clamp(2.55rem,8vw,4rem)] font-extrabold leading-[1.02] tracking-[-.04em] text-white">
                  Our Mission
                </h2>
                <p className="relative mt-6 max-w-[520px] text-[16px] font-medium leading-[1.75] text-white/82">
                  Our mission is to provide researchers with premium-quality research peptides that meet the highest
                  standards of purity, consistency, and reliability. Through rigorous quality control, transparent practices,
                  and exceptional customer support, <span className="font-extrabold text-white">Origin Peptides</span> is
                  committed to advancing scientific research by delivering trusted compounds for laboratory and preclinical
                  research use only.
                </p>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-[18px] bg-[#111827] shadow-[0_28px_70px_rgba(0,0,0,.26)] md:min-h-[390px]">
                <Image
                  src="/images/ChatGPT Image Aug 16, 2026, 01_00_01 AM.png"
                  alt="Origin Peptides vials in a dark laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="my-10 h-px bg-white/14 md:my-12" />

            <div className="grid gap-9 lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:items-center lg:gap-16">
              <div className="relative min-h-[280px] overflow-hidden rounded-[18px] bg-[#111827] shadow-[0_28px_70px_rgba(0,0,0,.26)] md:min-h-[390px]">
                <Image
                  src="/images/ChatGPT Image Aug 16, 2026, 01_00_01 AM.png"
                  alt="Origin Peptides research vials on a laboratory counter"
                  fill
                  sizes="(max-width: 1024px) 100vw, 670px"
                  className="object-cover object-center"
                />
              </div>

              <div className="relative min-w-0 py-2 md:pr-10">
                <span className="pointer-events-none absolute right-0 -top-8 text-[96px] font-extrabold leading-none text-white/[.035] md:text-[128px]">
                  02
                </span>
                <p className="relative flex items-center gap-4 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#3f8cff]">
                  <span className="h-9 w-[3px] rounded-full bg-[#2f86ff]" aria-hidden="true" />
                  Looking Ahead
                </p>
                <h2 className="relative mt-5 text-[clamp(2.55rem,8vw,4rem)] font-extrabold leading-[1.02] tracking-[-.04em] text-white">
                  Our Vision
                </h2>
                <p className="relative mt-6 max-w-[560px] text-[16px] font-medium leading-[1.75] text-white/82">
                  Our vision is to become a trusted leader in the research peptide industry by making premium-quality
                  research compounds more accessible to the scientific community. Through rigorous quality standards,
                  transparency, and continuous innovation, <span className="font-extrabold text-white">Origin Peptides</span>{" "}
                  is dedicated to supporting researchers with reliable products that advance scientific discovery and
                  laboratory research.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
