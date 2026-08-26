import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

const policySections = [
  {
    title: "1. Information We Collect",
    body: [
      "We may collect information you provide directly to us, including your name, email address, phone number, shipping address, billing address, order details, account details, and messages sent through contact or support forms.",
      "When you visit the website, we may automatically collect technical information such as IP address, browser type, device information, pages viewed, referring pages, and cookie or similar tracking data."
    ]
  },
  {
    title: "2. How We Use Information",
    body: [
      "We use collected information to process orders, provide customer support, send order updates, improve website performance, prevent fraud, maintain security, respond to inquiries, and comply with applicable legal obligations.",
      "If you subscribe to marketing communications, we may use your email address to send catalog updates or product information. You can unsubscribe from marketing emails at any time."
    ]
  },
  {
    title: "3. Payment and Order Processing",
    body: [
      "Payment information is handled by payment service providers. Origin Peptides does not intentionally store full payment card numbers on this website.",
      "Order and shipping information may be shared with providers that help complete purchases, fulfill orders, deliver packages, or provide related services."
    ]
  },
  {
    title: "4. Information Sharing",
    body: [
      "We do not sell personal information. We may share information with trusted service providers, payment processors, shipping carriers, technology providers, legal authorities when required, or in connection with a business transfer.",
      "Service providers are expected to use personal information only as needed to provide services to Origin Peptides."
    ]
  },
  {
    title: "5. Cookies and Similar Technologies",
    body: [
      "We may use cookies and similar technologies to remember preferences, support cart functionality, understand website traffic, improve the shopping experience, and help secure the website.",
      "You can manage cookies through your browser settings. Some website features may not work correctly if cookies are disabled."
    ]
  },
  {
    title: "6. Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect personal information. No online system can be guaranteed to be completely secure.",
      "Please contact us promptly if you believe your information or account has been accessed without authorization."
    ]
  },
  {
    title: "7. Your Privacy Choices",
    body: [
      "Depending on your location, you may have rights to request access, correction, deletion, portability, or restriction of certain personal information.",
      "You may also opt out of marketing emails by using the unsubscribe link in those emails or by contacting us."
    ]
  },
  {
    title: "8. Research Use Only",
    body: [
      "Origin Peptides products are provided for laboratory research use only. Product and order information on this website is not intended as medical advice and should not be used to diagnose, treat, cure, or prevent any disease."
    ]
  },
  {
    title: "9. Children's Privacy",
    body: [
      "This website is not intended for children. We do not knowingly collect personal information from children. If we learn that a child has provided personal information, we will take reasonable steps to delete it."
    ]
  },
  {
    title: "10. Third-Party Links",
    body: [
      "The website may include links to third-party websites or services. We are not responsible for the privacy practices, content, or policies of third-party websites."
    ]
  },
  {
    title: "11. Updates to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When changes are made, the updated policy will be posted on this page with a revised date."
    ]
  },
  {
    title: "12. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or your privacy choices, please contact Origin Peptides through the contact page."
    ]
  }
];

export const metadata = {
  title: "Privacy Policy | Origin Peptides",
  description: "Origin Peptides privacy policy and information practices."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="relative overflow-hidden border-t border-[#efc64a] bg-[linear-gradient(180deg,#f1edff_0%,#eef7ff_100%)] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[980px]">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#6f46c7]">Your Privacy Matters</p>
            <h1 className="mt-4 text-[clamp(2.45rem,7vw,4.9rem)] font-extrabold leading-[.98] tracking-normal text-[#10131b]">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-[650px] text-[16px] font-medium leading-[1.7] text-[#5f6878] md:text-[18px]">
              How Origin Peptides collects, uses, and protects information when you visit our website, contact us, or place an order.
            </p>
            <p className="mt-6 inline-flex rounded-full border border-[#dfe7f0] bg-white px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#536174] shadow-[0_12px_30px_rgba(36,43,68,.08)]">
              Last Updated: August 26, 2026
            </p>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[980px]">
            <div className="rounded-[18px] border border-[#e6e1f2] bg-white p-6 shadow-[0_20px_70px_rgba(35,28,54,.08)] md:p-10">
              <p className="text-[15px] font-medium leading-[1.8] text-[#536174] md:text-[16px]">
                At Origin Peptides, we respect your privacy. This Privacy Policy explains the types of information we may collect,
                how we may use it, and the choices available to you.
              </p>

              <div className="mt-9 grid gap-8">
                {policySections.map((section) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
