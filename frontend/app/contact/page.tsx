"use client";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ChevronDown, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const supportFaqs = [
  {
    question: "How quickly will I receive a response?",
    answer: "We typically respond to all email inquiries within 24 hours on business days (Monday-Friday, 9am-6pm EST). For urgent order issues, please include your order number in the subject line for priority handling."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships you'll receive an email with a tracking number. You can also use the order lookup above - just enter your order number and email, no account needed."
  },
  {
    question: "I received the wrong item or my order is damaged. What should I do?",
    answer: "Email us within 7 days of delivery with your order number and a photo of the item and packaging. We'll arrange a replacement or refund right away."
  },
  {
    question: "How can I verify the quality of my order?",
    answer: "Every batch is third-party tested. Certificates of Analysis list purity, identity, and batch number, and are matched to the lot printed on your vial."
  },
  {
    question: "Do you offer bulk or wholesale pricing?",
    answer: "Yes. We offer tiered pricing for labs and research institutions. Email our team with the compounds, quantities, and timeline you need and we'll send a quote."
  },
  {
    question: "Can you recommend products for my research?",
    answer: "Our team can share available documentation and specifications so you can select what fits your protocol. We cannot advise on research design or dosing."
  },
  {
    question: "How do I get a Certificate of Analysis (CoA) for my order?",
    answer: "CoAs are linked on each product page and can be sent for your specific lot - email us the order number and batch printed on the vial."
  },
  {
    question: "My payment was declined. What should I do?",
    answer: "Declines usually come from the issuing bank. Confirm the billing address matches your card, then retry or use an alternate method. Contact us if it keeps failing."
  }
];

export default function ContactPage() {
  const [openItem, setOpenItem] = useState(1);

  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="relative overflow-hidden border-t border-[#efc64a] bg-[linear-gradient(180deg,#f1edff_0%,#dfeeff_100%)] px-5 py-16 text-center md:px-8 md:py-20">
          <Image
            src="/images/tb500.png"
            alt=""
            width={86}
            height={86}
            className="pointer-events-none absolute left-[4%] top-8 hidden rotate-[9deg] drop-shadow-[0_18px_28px_rgba(38,72,116,.18)] sm:block"
          />
          <Image
            src="/images/heroghk-cu.png.png"
            alt=""
            width={96}
            height={96}
            className="pointer-events-none absolute right-[8%] top-7 hidden rotate-[-10deg] drop-shadow-[0_18px_28px_rgba(88,62,130,.18)] sm:block"
          />

          <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
            <div className="inline-flex min-h-8 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-bold text-[#3f4655] shadow-[0_12px_30px_rgba(36,43,68,.12)]">
              <span className="grid size-4 place-items-center rounded-full bg-[#e9fbef]">
                <span className="size-2 rounded-full bg-[#35d875]" />
              </span>
              Typically respond within 24 hours
            </div>

            <h1 className="mt-7 text-[clamp(2.65rem,7vw,4.75rem)] font-extrabold leading-[.98] tracking-[-.055em] text-[#10131b]">
              How can we help?
            </h1>
            <p className="mt-5 max-w-[520px] text-[16px] font-medium leading-[1.55] text-[#5f6878] md:text-[17px]">
              Our research support team is here to assist with product information, documentation, order inquiries,
              shipping, and general support.
            </p>

            <Link
              href="mailto:support@originpeptides.com"
              className="mt-7 inline-flex min-h-[46px] items-center justify-center gap-3 rounded-full bg-[#10131b] px-7 text-[14px] font-extrabold text-white shadow-[0_14px_36px_rgba(16,19,27,.18)] transition hover:bg-[#1b2435] focus:outline-none focus:ring-2 focus:ring-[#6d48c9] active:scale-[.98]"
            >
              <Mail size={17} strokeWidth={2} />
              Email Us
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <a
              href="#support-faq"
              aria-label="Jump to support FAQ"
              className="mt-9 grid size-9 place-items-center rounded-full text-[#657184] transition hover:bg-white/45 focus:outline-none focus:ring-2 focus:ring-[#6d48c9]"
            >
              <ArrowDown size={27} strokeWidth={1.8} />
            </a>
          </div>
        </section>

        <section id="support-faq" className="bg-[#f6f7fb] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[680px]">
            <div className="text-center">
              <h2 className="text-[30px] font-extrabold leading-none tracking-[-.035em] text-black md:text-[34px]">Support FAQ</h2>
              <p className="mt-2 text-[12px] font-medium text-[#8a92a1]">Quick answers to common questions</p>
            </div>

            <div className="mt-9 space-y-4">
              {supportFaqs.map((faq, index) => {
                const isOpen = openItem === index;

                return (
                  <motion.article
                    layout
                    className="overflow-hidden rounded-[10px] bg-white shadow-[0_10px_24px_rgba(15,23,42,.035)]"
                    key={faq.question}
                    transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <button
                      aria-expanded={isOpen}
                      className={[
                        "grid min-h-[56px] w-full grid-cols-[minmax(0,1fr)_28px] items-center gap-4 px-5 text-left text-[13px] font-extrabold leading-snug transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#cf2f6a]",
                        isOpen ? "bg-[#cf2f6a] text-white" : "text-black hover:bg-white/70"
                      ].join(" ")}
                      onClick={() => setOpenItem((item) => (item === index ? -1 : index))}
                      type="button"
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className={["grid size-6 place-items-center rounded-full transition-colors duration-300", isOpen ? "bg-white text-[#cf2f6a]" : "bg-[#eef1f6] text-[#7c8494]"].join(" ")}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown size={14} strokeWidth={2.4} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: -8 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -6 }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 pt-5 text-[13px] font-medium leading-[1.75] text-[#687284]">{faq.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>

            <div className="mx-auto mt-11 max-w-[420px] rounded-[18px] bg-white px-8 py-10 text-center shadow-[0_16px_40px_rgba(15,23,42,.045)]">
              <div className="mx-auto grid size-9 place-items-center rounded-full bg-[#f1efff] text-[#7650d8]">
                <Mail size={15} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-[16px] font-extrabold text-black">Still have questions?</h3>
              <p className="mx-auto mt-3 max-w-[280px] text-[12px] font-medium leading-[1.55] text-[#8a92a1]">
                Can&rsquo;t find what you&rsquo;re looking for? Our support team is ready to help with questions about
                products, documentation, orders, and research support.
              </p>
              <Link
                href="mailto:support@originpeptides.com"
                className="mt-6 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#10131b] px-5 text-[11px] font-extrabold text-white transition hover:bg-[#1b2435] focus:outline-none focus:ring-2 focus:ring-[#6d48c9] active:scale-[.98]"
              >
                <Mail size={13} strokeWidth={2} />
                Email Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
