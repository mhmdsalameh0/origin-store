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
    answer: "Our research support team typically responds within 24 hours during business days."
  },
  {
    question: "How can I track my order?",
    answer: "Order updates are provided after checkout. If you need help locating an update, email support with your order details."
  },
  {
    question: "I received the wrong item or my order is damaged. What should I do?",
    answer: "Please contact support with your order number and clear photos of the package or item so our team can review it quickly."
  },
  {
    question: "How can I verify the quality of my order?",
    answer: "Product quality documentation is reviewed and provided where available so researchers can confirm batch-specific details."
  },
  {
    question: "Do you offer bulk or wholesale pricing?",
    answer: "Bulk requests are reviewed case by case. Contact support with the products and quantities you need."
  },
  {
    question: "Can you recommend products for my research?",
    answer: "We can help with product information and documentation, but we cannot provide medical, treatment, or dosing guidance."
  },
  {
    question: "How do I get a Certificate of Analysis (CoA) for my order?",
    answer: "Email support with your order number and product name, and our team will help with available documentation."
  },
  {
    question: "My payment was declined. What should I do?",
    answer: "Please verify your billing details and contact support if the issue continues."
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

            <div className="mt-9 space-y-3">
              {supportFaqs.map((faq, index) => {
                const isOpen = openItem === index;

                return (
                  <article className="overflow-hidden rounded-[10px] bg-white shadow-[0_10px_24px_rgba(15,23,42,.035)]" key={faq.question}>
                    <button
                      aria-expanded={isOpen}
                      className={[
                        "grid min-h-[50px] w-full grid-cols-[minmax(0,1fr)_28px] items-center gap-4 px-5 text-left text-[13px] font-extrabold leading-snug transition focus:outline-none focus:ring-2 focus:ring-[#cf2f6a]",
                        isOpen ? "bg-[#cf2f6a] text-white" : "text-black hover:bg-white/70"
                      ].join(" ")}
                      onClick={() => setOpenItem((item) => (item === index ? -1 : index))}
                      type="button"
                    >
                      <span>{faq.question}</span>
                      <span className={["grid size-6 place-items-center rounded-full", isOpen ? "bg-white text-[#cf2f6a]" : "bg-[#eef1f6] text-[#7c8494]"].join(" ")}>
                        <ChevronDown size={14} strokeWidth={2.4} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pt-1 text-[13px] font-medium leading-[1.65] text-[#687284]">{faq.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
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
