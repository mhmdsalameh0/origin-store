import { BadgeCheck, Boxes, CircleDollarSign, ClipboardCheck, FileText, FlaskConical, PackageCheck, ShieldCheck, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "./SectionReveal";

const benefits = [
  {
    icon: Boxes,
    title: "Always in Stock",
    copy: "Top research peptides like BPC-157, TB-500, and Ipamorelin ready to ship. No backorders, no waiting.",
    accent: "#7467f0",
    tintA: "#eeeaff",
    tintB: "#f8f6ff"
  },
  {
    icon: CircleDollarSign,
    title: "Volume Pricing",
    copy: "Bulk pricing available for larger research orders. Lower per-vial cost at higher volumes.",
    accent: "#2fbf87",
    tintA: "#e2f8ee",
    tintB: "#f6fffb"
  },
  {
    icon: PackageCheck,
    title: "Safe & Protected Shipping",
    copy: "Cold-pack shipping keeps peptides stable. Discreet packaging with full tracking on every USA order.",
    accent: "#d8a21c",
    tintA: "#fff2c8",
    tintB: "#fffaf0"
  },
  {
    icon: UsersRound,
    title: "Researcher Community",
    copy: "Connect with fellow researchers. Share peer insights and discuss peptide research applications.",
    accent: "#e56aa7",
    tintA: "#ffe5f2",
    tintB: "#fff7fb"
  },
  {
    icon: FlaskConical,
    title: "99%+ Purity Guaranteed",
    copy: "Every batch tested by US labs via HPLC and Mass Spec. Full Certificate of Analysis included free.",
    accent: "#8b6cf0",
    tintA: "#ece7ff",
    tintB: "#f8f5ff"
  },
  {
    icon: ShieldCheck,
    title: "Shipment Protection",
    copy: "Every order includes free shipment protection. Lost, damaged, or stolen packages are reshipped at no cost.",
    accent: "#22b8a0",
    tintA: "#ddf8f3",
    tintB: "#f3fffc"
  }
];

export function ProductBenefits({ variant }: { variant: "dark" | "light" }) {
  const dark = variant === "dark";

  return (
    <SectionReveal
      className={
        dark
          ? "bg-white py-8 text-origin-ink md:py-10"
          : "relative overflow-hidden bg-[linear-gradient(135deg,#fffdf8_0%,#faf8ff_52%,#f3fff9_100%)] py-16 text-origin-ink md:py-24"
      }
    >
      {!dark ? (
        <>
          <div className="pointer-events-none absolute -left-20 top-16 size-[260px] rounded-full bg-[#b99cff]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-8 size-[300px] rounded-full bg-[#d8c6ff]/24 blur-3xl" />
        </>
      ) : null}
      <div className={dark ? "mx-auto w-full max-w-[1360px] px-5 md:px-8" : "section-shell relative z-10"}>
        {dark ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.97fr)_minmax(0,1.03fr)] lg:items-start">
            <div className="relative z-10">
              <h2 className="max-w-[620px] text-[36px] font-bold leading-[1.12] text-black md:text-[44px]">
                Trusted Quality Backed by Reliable Verification
              </h2>
              <p className="mt-8 max-w-[650px] text-[16px] font-normal leading-[1.75] text-[#263242]">
                Each product undergoes thorough evaluation using strict quality protocols and is supported by comprehensive documentation. We believe trust is built through transparency, which is why our dedication to excellence is reinforced by dependable testing procedures and ongoing quality checks-not simply by claims.
              </p>

              <div className="mt-10 grid max-w-[650px] divide-y divide-[#d7dce3] text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="px-5 py-4 sm:py-2">
                  <strong className="text-[25px] font-bold leading-none text-black">99%+</strong>
                  <p className="mt-2 text-[15px] font-medium leading-tight text-[#263242] md:text-[14px]">Purity Validated</p>
                </div>
                <div className="px-5 py-4 sm:py-2">
                  <strong className="text-[25px] font-bold leading-none text-black">5</strong>
                  <p className="mt-2 text-[15px] font-medium leading-tight text-[#263242] md:text-[14px]">Trusted Validation</p>
                </div>
                <div className="px-5 py-4 sm:py-2 sm:text-right">
                  <strong className="text-[18px] font-bold leading-none text-black">Quality</strong>
                  <p className="mt-2 text-[15px] font-medium leading-tight text-[#263242] md:text-[14px]">Documentation Available</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  ["Performance", BadgeCheck],
                  ["Quality", ShieldCheck],
                  ["Reliability", ClipboardCheck],
                  ["Safety", FlaskConical]
                ].map(([label, Icon], index) => (
                  <button
                    className={`flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold md:text-[14px] ${
                      index === 0 ? "bg-black text-white" : "bg-[#f3f5f2] text-[#263242]"
                    }`}
                    key={label as string}
                    type="button"
                  >
                    <Icon size={15} />
                    {label as string}
                  </button>
                ))}
              </div>

              <div className="relative mt-3 max-w-[595px] rounded-[10px] border border-[#e1e4e8] bg-[#fbfbfb] p-6 shadow-[0_10px_26px_rgba(29,36,25,.045)] sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold text-black">Proven Results</h3>
                    <p className="mt-6 text-[16px] font-normal leading-[1.75] text-[#263242] sm:mt-12">
                      Each item undergoes thorough inspection to confirm it aligns with our strict requirements and matches the details presented, helping you make every purchase with complete trust.
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 text-[15px] font-bold text-[#2f8f5b] md:text-[14px]">
                    <BadgeCheck size={15} />
                    Enhanced Protocol
                  </span>
                </div>

                <div className="mt-9 rounded-[8px] border border-[#13b76b] border-l-[7px] p-5 text-[15px] leading-[1.65] text-[#263242] md:text-[14px]">
                  <span className="font-bold text-origin-green">Why it matters:</span> You can shop with peace of mind knowing each product undergoes detailed evaluation for excellence, uniformity, and dependability-ensuring you receive the reliable standard you deserve with every purchase.
                </div>
              </div>
            </div>

            <div className="relative min-h-[500px] overflow-hidden bg-[#e9edf3]">
              <Image
                src="/images/tb500.png"
                alt="TB-500 Origin Peptides bottle"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain object-center p-8"
              />
              <Link href="/documentation" className="absolute bottom-8 left-1/2 z-10 flex w-[min(266px,calc(100%-32px))] -translate-x-1/2 cursor-pointer items-center gap-4 border border-[#dfe3e8] bg-white px-4 py-4 shadow-[0_8px_22px_rgba(29,36,25,.055)] focus:outline-none focus:ring-2 focus:ring-[#7650d8]">
                <div className="grid size-11 place-items-center rounded border border-[#dfe3e8]">
                  <FileText size={19} />
                </div>
                <div>
                  <p className="text-[14px] font-bold leading-tight text-black">See the Proof</p>
                  <p className="mt-2 text-[13px] text-[#263242]">View Our Quality Procedures</p>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[30px] font-extrabold leading-[1.2] tracking-[-.025em] text-[#07111f] md:text-[42px] md:leading-[1.16]">
                Why choose Origin&apos;s Restored Peptides?
              </h2>
            </div>
            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                className="group flex h-full min-h-[170px] flex-col overflow-hidden rounded-[20px] border border-white/70 bg-white/75 shadow-[0_18px_44px_rgba(44,35,71,.08)] backdrop-blur transition duration-300 motion-safe:hover:-translate-y-1.5 hover:border-[#d9ccff] hover:shadow-[0_24px_58px_rgba(91,66,134,.14)]"
                key={benefit.title}
              >
                <div className="h-[3px] w-full" style={{ backgroundColor: benefit.accent }} />
                <div className="flex flex-1 flex-col p-5">
                <div
                  className="grid size-11 place-items-center rounded-[14px] transition duration-300 motion-safe:group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${benefit.tintA}, ${benefit.tintB})`,
                    color: benefit.accent
                  }}
                >
                  <benefit.icon size={19} strokeWidth={2.1} />
                </div>
                <h3 className="mt-4 text-[18px] font-extrabold leading-tight tracking-[-.02em] text-[#07111f]">{benefit.title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-6 text-[#697386]">{benefit.copy}</p>
                </div>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </SectionReveal>
  );
}
