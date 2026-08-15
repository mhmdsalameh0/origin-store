import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { BadgeCheck, Headphones, IdCard, Truck } from "lucide-react";
import Image from "next/image";

const serviceHighlights = [
  { label: "Fast Delivery", icon: Truck },
  { label: "Research-Grade Quality Standards", icon: IdCard },
  { label: "24/7 Customer Support", icon: Headphones },
  { label: "Quality-Checked Orders", icon: BadgeCheck }
];

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
                <h2 className="relative text-[clamp(2.55rem,8vw,4rem)] font-extrabold leading-[1.02] tracking-[-.04em] text-white">
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
                <h2 className="relative text-[clamp(2.55rem,8vw,4rem)] font-extrabold leading-[1.02] tracking-[-.04em] text-white">
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

        <section className="relative overflow-hidden bg-white px-5 py-14 text-origin-ink md:px-8 md:py-20">
          <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#6f37b8]/[.08] blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#f4efff] blur-3xl" />

          <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:items-center lg:gap-14">
            <div className="relative min-w-0">
              <div className="absolute -bottom-6 -left-5 h-[78%] w-[78%] rounded-[24px] bg-[#d7c5ff]/55" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#f7f4ff] shadow-[0_24px_70px_rgba(35,28,54,.12)]">
                <Image
                  src="/images/ChatGPT Image Aug 16, 2026, 01_30_49 AM.png"
                  alt="Origin Peptides product vials and packaging"
                  fill
                  sizes="(max-width: 1024px) 100vw, 660px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#6f37b8]">
                Our Commitment
                <span className="h-px w-16 bg-[#6f37b8]" aria-hidden="true" />
              </p>
              <h2 className="mt-6 max-w-[760px] text-[clamp(2.25rem,5vw,3.35rem)] font-normal leading-[1.08] tracking-[-.04em] text-black">
                Built on Quality, Driven by Research
              </h2>

              <div className="mt-8 max-w-[760px] space-y-6 text-[17px] font-normal leading-[1.85] text-[#171c28]">
                <p>
                  <span className="font-extrabold text-black">Origin&rsquo;s Restored Peptides</span> is focused on
                  delivering dependable research compounds for laboratory and preclinical applications. Through rigorous
                  sourcing, careful quality verification, and batch-specific testing, we work to maintain consistent
                  standards across every product we offer.
                </p>

                <p>
                  <span className="font-extrabold text-black">Our approach</span> is built around transparency, reliability,
                  and scientific integrity. By providing clear product information, supporting documentation, and dependable
                  service, we aim to help researchers make informed decisions and carry out their work with confidence.
                </p>
              </div>

              <div className="mt-8 grid gap-0 border-t border-[#d8cde9] pt-6 text-[15px] font-medium text-[#171c28] sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center sm:text-center md:text-[16px]">
                <span className="border-b border-[#d8cde9] py-3 sm:border-b-0 sm:py-0">Verified Quality</span>
                <span className="hidden h-5 w-px bg-[#d8cde9] sm:block" aria-hidden="true" />
                <span className="border-b border-[#d8cde9] py-3 sm:border-b-0 sm:py-0">Transparent Standards</span>
                <span className="hidden h-5 w-px bg-[#d8cde9] sm:block" aria-hidden="true" />
                <span className="py-3 sm:py-0">Research Focused</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((item) => (
              <article
                className="grid min-h-[158px] place-items-center rounded-[16px] bg-[#7c55bb] px-5 py-8 text-center text-white shadow-[0_18px_44px_rgba(12,18,30,.16)]"
                key={item.label}
              >
                <item.icon size={46} strokeWidth={2.2} />
                <h2 className="mt-5 text-[15px] font-extrabold leading-snug">{item.label}</h2>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
