import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Image from "next/image";

const termSections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing this website, creating an account, contacting us, or placing an order with Origin Peptides, you agree to these Terms of Service. If you do not agree, please do not use the website."
    ]
  },
  {
    title: "2. Eligibility",
    body: [
      "Origin Peptides products are offered only to qualified customers purchasing for legitimate laboratory research purposes. We may refuse, cancel, or request additional verification for any order at our discretion."
    ]
  },
  {
    title: "3. Products and Intended Use",
    body: [
      "All products sold by Origin Peptides are intended for laboratory research use only. Products are not intended to diagnose, treat, cure, or prevent any disease.",
      "Product information on this website is provided for research reference only and is not medical advice, dosing guidance, or a recommendation for human or animal use.",
      "You are responsible for complying with all applicable laws and regulations related to the purchase, possession, handling, storage, and use of research compounds."
    ]
  },
  {
    title: "4. Orders and Payment",
    body: [
      "When you place an order, you agree to provide accurate billing, shipping, and contact information. All orders are subject to acceptance, product availability, payment approval, and review.",
      "Prices, product availability, promotions, and shipping options may change without notice. We reserve the right to correct errors and cancel orders where necessary."
    ]
  },
  {
    title: "5. Shipping and Delivery",
    body: [
      "Shipping dates and delivery windows are estimates. Origin Peptides is not responsible for delays caused by carriers, incorrect shipping information, customs, weather, or events outside our control.",
      "Risk of loss may pass to the customer once an order is transferred to the shipping carrier, unless otherwise required by applicable law."
    ]
  },
  {
    title: "6. Returns and Refunds",
    body: [
      "Returns, replacements, and refunds are handled according to the return policy posted on this website. Damage or missing-item claims may require order details and clear supporting photos.",
      "Products that have been opened, altered, improperly stored, or used may not be eligible for return or replacement."
    ]
  },
  {
    title: "7. Account Responsibility",
    body: [
      "If you create an account, you are responsible for keeping your login information secure and for all activity under your account. Please notify us if you believe your account has been accessed without authorization."
    ]
  },
  {
    title: "8. Prohibited Conduct",
    body: [
      "You agree not to use the website for unlawful activity, misrepresent your identity or research purpose, interfere with website security, scrape the website, resell products without authorization, or use products in any way inconsistent with laboratory research use only."
    ]
  },
  {
    title: "9. Intellectual Property",
    body: [
      "Website content, including text, images, logos, product presentation, graphics, and design elements, belongs to Origin Peptides or its licensors. You may not copy, reproduce, modify, or distribute website content without written permission."
    ]
  },
  {
    title: "10. Disclaimer of Warranties",
    body: [
      "The website and products are provided as available and as described on the website. To the fullest extent permitted by law, Origin Peptides disclaims warranties that are not expressly stated, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "Certificates of Analysis and product documentation reflect testing information available at the time of analysis and do not guarantee suitability for any specific research application."
    ]
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Origin Peptides will not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages arising from use of the website, purchase of products, or reliance on website information.",
      "Our total liability for any claim related to an order will not exceed the amount paid for the product giving rise to that claim."
    ]
  },
  {
    title: "12. Indemnification",
    body: [
      "You agree to defend, indemnify, and hold harmless Origin Peptides and its owners, employees, contractors, and service providers from claims, damages, losses, liabilities, costs, and expenses arising from your use or misuse of products, violation of these Terms, or violation of applicable law."
    ]
  },
  {
    title: "13. Privacy",
    body: [
      "Your use of the website is also governed by our Privacy Policy, which explains how we collect and use information."
    ]
  },
  {
    title: "14. Changes to Terms",
    body: [
      "We may update these Terms from time to time. Updated Terms will be posted on this page with a revised date. Your continued use of the website after changes are posted means you accept the updated Terms."
    ]
  },
  {
    title: "15. Contact",
    body: [
      "For questions about these Terms, please contact Origin Peptides through the contact page."
    ]
  }
];

export const metadata = {
  title: "Terms of Service | Origin Peptides",
  description: "Origin Peptides website terms of service."
};

export default function TermsOfServicePage() {
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
            <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[13px] font-bold text-[#2f3848] shadow-[0_12px_30px_rgba(57,94,131,.12)] [&>span:first-child]:hidden [&>span:nth-child(2)]:grid">
              <span className="size-4 rounded-full bg-[#eef4ff] text-[11px] leading-4 text-[#377aff]">§</span>
              <span className="size-4 rounded-full bg-[#eef4ff] text-[11px] leading-4 text-[#377aff]">i</span>
              Legal Agreement
            </p>
            <h1 className="mt-6 text-[clamp(2.8rem,8vw,5rem)] font-extrabold leading-[.96] tracking-normal text-black">
              Terms of Service
            </h1>
            <p className="mt-6 max-w-[700px] text-[18px] font-medium leading-[1.45] text-[#4c5665] md:text-[24px]">
              Please read these terms carefully before using the Origin Peptides website or placing an order.
            </p>
            <p className="mt-7 inline-flex rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#536174] shadow-[0_12px_30px_rgba(57,94,131,.10)]">
              Last Updated: August 26, 2026
            </p>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[980px] rounded-[18px] border border-[#e6e1f2] bg-white p-6 shadow-[0_20px_70px_rgba(35,28,54,.08)] md:p-10">
            <p className="text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]">
              Welcome to Origin Peptides. These Terms govern your access to and use of this website, including purchases,
              product information, customer support, and related services.
            </p>

            <div className="mt-9 grid gap-8">
              {termSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[22px] font-extrabold leading-tight tracking-[-.02em] text-[#10131b] md:text-[26px]">
                    {section.title}
                  </h2>
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
