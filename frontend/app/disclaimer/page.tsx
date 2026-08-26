import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Image from "next/image";

const disclaimerSections = [
  {
    title: "1. Research Use Only",
    body: [
      "Origin Peptides products are supplied for laboratory research use only. They are not intended for human or animal consumption, veterinary use, food use, cosmetic use, household use, or any therapeutic application.",
      "Products are not intended to diagnose, treat, cure, or prevent any disease."
    ]
  },
  {
    title: "2. General Information",
    body: [
      "Information on this website is provided for general research reference and customer support purposes. Origin Peptides does not guarantee that website content is complete, current, or suitable for any specific research protocol.",
      "Product descriptions, documentation, and related materials should be reviewed alongside independent professional judgment and applicable regulatory requirements."
    ]
  },
  {
    title: "3. Product Use Disclaimer",
    body: [
      "Products should be handled only by qualified individuals in appropriate laboratory settings.",
      "Customers are responsible for proper storage, handling, documentation review, and use consistent with research-only labeling.",
      "Any use outside the stated research purpose is strictly prohibited."
    ]
  },
  {
    title: "4. No Medical Advice",
    body: [
      "Nothing on this website is medical advice, dosing guidance, treatment guidance, or a recommendation for human or animal use.",
      "Origin Peptides does not provide medical, pharmaceutical, veterinary, diagnostic, or clinical advice."
    ]
  },
  {
    title: "5. Buyer Responsibility",
    body: [
      "By purchasing from Origin Peptides, you confirm that you are purchasing for legitimate laboratory research purposes and that you will comply with all applicable laws, rules, and regulations.",
      "You accept responsibility for determining whether a product is lawful and appropriate for your intended research use in your location."
    ]
  },
  {
    title: "6. Quality and Documentation",
    body: [
      "Certificates of Analysis, purity references, and product documentation reflect information available at the time of testing or publication.",
      "Research outcomes can vary depending on protocol, storage, handling, equipment, and other conditions outside Origin Peptides' control."
    ]
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Origin Peptides is not liable for indirect, incidental, special, consequential, punitive, or similar damages related to website use, product purchase, product handling, or reliance on website information."
    ]
  },
  {
    title: "8. Indemnification",
    body: [
      "You agree to defend, indemnify, and hold harmless Origin Peptides and its owners, employees, contractors, and service providers from claims, losses, liabilities, damages, costs, and expenses arising from misuse of products, violation of this Disclaimer, violation of our Terms of Service, or violation of applicable law."
    ]
  },
  {
    title: "9. External Links",
    body: [
      "This website may link to third-party websites or resources. Origin Peptides is not responsible for third-party content, policies, claims, or practices."
    ]
  },
  {
    title: "10. Updates to This Disclaimer",
    body: [
      "Origin Peptides may update this Disclaimer from time to time. Updates will be posted on this page with a revised date, and continued website use means you accept the updated Disclaimer."
    ]
  },
  {
    title: "11. Contact",
    body: ["Questions about this Disclaimer can be sent through the contact page or to support@originrestored.com."]
  }
];

export const metadata = {
  title: "Disclaimer | Origin Peptides",
  description: "Origin Peptides research-use-only disclaimer and product information notice."
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="relative overflow-hidden border-t border-[#efc64a] bg-[linear-gradient(180deg,#edf7ff_0%,#dcecff_100%)] px-5 py-16 text-center md:px-8 md:py-24">
          <Image
            src="/images/hero-layer-mots-c.png"
            alt=""
            width={118}
            height={150}
            className="pointer-events-none absolute left-[6%] top-20 hidden rotate-[-13deg] object-contain drop-shadow-[0_24px_28px_rgba(57,94,131,.20)] sm:block lg:left-[8%]"
          />
          <Image
            src="/images/showcase-retatrutide-transparent.png"
            alt=""
            width={150}
            height={190}
            className="pointer-events-none absolute right-[15%] top-24 hidden rotate-[-11deg] object-contain drop-shadow-[0_30px_32px_rgba(57,94,131,.20)] md:block"
          />
          <Image
            src="/images/hero-layer-tb-500.png"
            alt=""
            width={126}
            height={164}
            className="pointer-events-none absolute right-[6%] top-14 hidden rotate-[15deg] object-contain drop-shadow-[0_24px_28px_rgba(57,94,131,.20)] sm:block lg:right-[8%]"
          />

          <div className="relative mx-auto flex min-h-[300px] max-w-[760px] flex-col items-center justify-center md:min-h-[330px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[13px] font-bold text-[#2f3848] shadow-[0_12px_30px_rgba(57,94,131,.12)]">
              <span className="grid size-4 place-items-center rounded-full bg-[#eef4ff] text-[11px] leading-4 text-[#377aff]">i</span>
              Important Notice
            </p>
            <h1 className="mt-6 text-[clamp(2.8rem,8vw,5rem)] font-extrabold leading-[.96] tracking-normal text-black">Disclaimer</h1>
            <p className="mt-6 max-w-[700px] text-[18px] font-medium leading-[1.45] text-[#4c5665] md:text-[24px]">
              Please read this important research-use-only notice before using the Origin Peptides website or placing an order.
            </p>
            <p className="mt-7 inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#536174] shadow-[0_12px_30px_rgba(57,94,131,.10)]">
              Last Updated: August 26, 2026
            </p>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[980px] rounded-[18px] border border-[#e6e1f2] bg-white p-6 shadow-[0_20px_70px_rgba(35,28,54,.08)] md:p-10">
            <p className="text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]">
              This Disclaimer explains the limits of the information and products provided by Origin Peptides. It should be read together with our Terms of Service and Privacy Policy.
            </p>

            <div className="mt-9 grid gap-8">
              {disclaimerSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[22px] font-extrabold leading-tight tracking-normal text-[#10131b] md:text-[26px]">{section.title}</h2>
                  <div className="mt-3 grid gap-3">
                    {section.body.map((paragraph) => (
                      <p className="text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
