import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Image from "next/image";

const returnSteps = [
  {
    number: "1",
    title: "Document the Issue",
    copy: "Take clear photos of the product, packaging, label, and shipping box as soon as the order arrives."
  },
  {
    number: "2",
    title: "Contact Support",
    copy: "Email support@originrestored.com with your order number, photos, and a short description of the issue."
  },
  {
    number: "3",
    title: "Review and Resolution",
    copy: "Once the claim is reviewed, approved replacement requests are handled as quickly as possible."
  }
];

const eligibleItems = [
  "Products damaged during shipping with clear photo evidence",
  "Incorrect items received",
  "Defective products that do not match Origin Peptides quality documentation",
  "Issues reported within 14 days of delivery"
];

const ineligibleItems = [
  "Claims reported more than 14 days after delivery",
  "Opened, reconstituted, altered, or used products",
  "Products stored improperly after delivery",
  "Damage claims without photo evidence",
  "Orders without proof of purchase"
];

const timelineItems = [
  { label: "Claim submitted with photos", value: "Day 1" },
  { label: "Claim reviewed by support", value: "1-2 business days" },
  { label: "Approved replacement prepared", value: "After approval" }
];

export const metadata = {
  title: "Refund and Returns Policy | Origin Peptides",
  description: "Origin Peptides refund, replacement, and return policy for research product orders."
};

export default function RefundAndReturnsPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="relative overflow-hidden border-t border-[#efc64a] bg-[linear-gradient(180deg,#edf7ff_0%,#dcecff_100%)] px-5 py-16 text-center md:px-8 md:py-24">
          <Image
            src="/images/hero-layer-ghk-cu.png"
            alt=""
            width={126}
            height={164}
            className="legal-vial-float-left pointer-events-none absolute left-2 top-5 block w-[72px] overflow-visible border-none bg-transparent object-contain shadow-none sm:left-[6%] sm:top-14 sm:w-[126px] lg:left-[8%]"
          />
          <Image
            src="/images/hero-layer-mots-c.png"
            alt=""
            width={126}
            height={164}
            className="legal-vial-float-right pointer-events-none absolute right-2 top-5 block w-[72px] object-contain sm:right-[8%] sm:top-14 sm:w-[126px]"
          />

          <div className="relative mx-auto flex min-h-[300px] max-w-[760px] flex-col items-center justify-center md:min-h-[330px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[13px] font-bold text-[#2f3848] shadow-[0_12px_30px_rgba(57,94,131,.12)]">
              <span className="grid size-4 place-items-center rounded-full bg-[#eef4ff] text-[11px] leading-4 text-[#377aff]">i</span>
              Damage Protection
            </p>
            <h1 className="mt-6 text-[clamp(2.55rem,7vw,4.75rem)] font-extrabold leading-[.98] tracking-normal text-black">
              Refunds & Returns
            </h1>
            <p className="mt-6 max-w-[700px] text-[18px] font-medium leading-[1.45] text-[#4c5665] md:text-[24px]">
              Every Origin Peptides order is reviewed with care, and eligible transit damage claims are protected.
            </p>
            <p className="mt-7 inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#536174] shadow-[0_12px_30px_rgba(57,94,131,.10)]">
              Last Updated: August 26, 2026
            </p>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[980px] rounded-[18px] border border-[#e6e1f2] bg-white p-6 shadow-[0_20px_70px_rgba(35,28,54,.08)] md:p-10">
            <div>
              <h2 className="text-[24px] font-extrabold leading-tight tracking-normal text-[#10131b] md:text-[30px]">Damage Protection Policy</h2>
              <p className="mt-3 text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]">
                If your order arrives damaged in transit, Origin Peptides may provide a one-time replacement after reviewing the claim. Photo evidence is required, and all claims are subject to approval.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-[24px] font-extrabold leading-tight tracking-normal text-[#10131b] md:text-[30px]">How Returns Work</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {returnSteps.map((step) => (
                  <article className="rounded-[14px] border border-[#e6e1f2] bg-[#fbfaff] p-5" key={step.number}>
                    <span className="grid size-8 place-items-center rounded-full bg-[#202329] text-[13px] font-extrabold text-white">{step.number}</span>
                    <h3 className="mt-4 text-[17px] font-extrabold text-[#10131b]">{step.title}</h3>
                    <p className="mt-2 text-[14px] font-medium leading-[1.7] text-[#536174]">{step.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <section>
                <h2 className="text-[22px] font-extrabold leading-tight tracking-normal text-[#10131b]">Eligible for Return or Replacement</h2>
                <ul className="mt-4 grid gap-3 text-[15px] font-medium leading-[1.7] text-[#536174]">
                  {eligibleItems.map((item) => (
                    <li className="rounded-[10px] border border-[#e5eef2] bg-white px-4 py-3" key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-[22px] font-extrabold leading-tight tracking-normal text-[#10131b]">Not Eligible</h2>
                <ul className="mt-4 grid gap-3 text-[15px] font-medium leading-[1.7] text-[#536174]">
                  {ineligibleItems.map((item) => (
                    <li className="rounded-[10px] border border-[#eee4e4] bg-white px-4 py-3" key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-10 rounded-[14px] border border-[#e6e1f2] bg-[#fbfaff] p-5 md:p-6">
              <h2 className="text-[22px] font-extrabold leading-tight tracking-normal text-[#10131b]">Replacement Timeline</h2>
              <div className="mt-5 grid gap-3">
                {timelineItems.map((item) => (
                  <div className="flex items-center justify-between gap-5 rounded-[10px] bg-white px-4 py-3 text-[14px] font-bold" key={item.label}>
                    <span className="text-[#536174]">{item.label}</span>
                    <span className="text-[#202329]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-[22px] font-extrabold leading-tight tracking-normal text-[#10131b]">Important Disclaimer</h2>
              <div className="mt-3 grid gap-3 text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]">
                <p>All Origin Peptides products are sold strictly for laboratory research use only.</p>
                <p>Replacements are offered for approved transit damage or verified order issues. Origin Peptides does not offer refunds for change of mind, dissatisfaction, improper handling, improper storage, or product misuse.</p>
                <p>Excessive, incomplete, or suspicious claims may be denied. By placing an order, you acknowledge and agree to this policy.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
