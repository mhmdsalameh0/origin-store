"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionReveal } from "./SectionReveal";

const faqs = [
  {
    question: "What research products are available from Origin Peptides?",
    answer: "Origin Peptides offers a selection of premium research peptides for laboratory applications, backed by trusted suppliers, strict quality verification, and consistent standards to support scientific research."
  },
  {
    question: "How does Origin Peptides handle order processing?",
    answer: "Orders are carefully reviewed and processed promptly to ensure accuracy and quality. Customers receive order confirmation and updates throughout the processing process."
  },
  {
    question: "How long does order processing take?",
    answer: "Orders are typically processed within 1-2 business days. Processing times may vary depending on order volume and verification requirements."
  },
  {
    question: "Do I need an account to place an order?",
    answer: "No, you do not need to create an account to place an order. You can complete your purchase using the available checkout options."
  }
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState(0);

  const toggleItem = (index: number) => {
    setOpenItem((item) => (item === index ? -1 : index));
  };

  return (
    <SectionReveal className="bg-white px-6 py-14 text-origin-ink md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-[760px]">
        <div className="text-center">
          <h2 className="text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-[1.05] text-black md:text-[38px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[18px] font-medium leading-7 text-[#6a6f78]">
            Everything you need to know about peptide research
          </p>
        </div>

        <div className="mt-8 divide-y divide-[#dedede]">
            {faqs.map((faq, index) => {
              const isOpen = openItem === index;

              return (
                <div
                  className="overflow-hidden"
                  key={faq.question}
                >
                  <button
                    aria-expanded={isOpen}
                    className="grid min-h-[46px] w-full grid-cols-[minmax(0,1fr)_32px] items-center gap-4 py-3 text-left"
                    onClick={() => toggleItem(index)}
                  >
                    <span className="text-[16px] font-extrabold leading-snug text-black md:text-[17px]">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="grid size-8 place-items-center rounded-full bg-[#f2f2f2] text-black"
                    >
                      <ChevronDown size={16} strokeWidth={2.5} />
                    </motion.span>
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
                        <div className="pb-4 pr-12">
                          <p className="text-[15px] font-medium leading-[1.65] text-[#6a6f78]">{faq.answer}</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>
      </div>

      <div className="relative mx-[-24px] mt-16 overflow-hidden bg-[linear-gradient(180deg,#fffec8_0%,#f2ffd9_56%,#ebffe8_100%)] px-6 pb-5 pt-16 md:mx-[-32px] md:px-12 md:pb-6 md:pt-20">
        <div className="pointer-events-none absolute -left-2 -top-10 h-[170px] w-[120px] -rotate-[13deg] md:left-16 md:-top-8 md:h-[210px] md:w-[150px]">
          <Image
            src="/images/heroghk-cu.png.png"
            alt=""
            fill
            sizes="150px"
            className="object-contain drop-shadow-[0_14px_20px_rgba(20,30,45,.16)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto flex max-w-[720px] flex-col items-center text-center">
          <h3 className="text-[clamp(1.65rem,4.2vw,2.25rem)] font-extrabold leading-[1.14] text-black">
            All the research peptides you need, with the{" "}
            <span className="relative inline-block">
              confidence
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[4px] w-full origin-left rounded-full bg-[#86df96]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              />
            </span>{" "}
            and support your research deserves.
          </h3>
          <Link
            href="/products"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-black px-8 text-[15px] font-extrabold text-white shadow-[0_12px_24px_rgba(0,0,0,.12)] transition hover:-translate-y-0.5 hover:bg-origin-green"
          >
            Shop Now
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="relative mx-auto mt-12 max-w-[1250px] rounded-[24px] bg-[linear-gradient(105deg,#e8e3ff_0%,#f5e8f5_62%,#ffedf3_100%)] px-7 py-7 shadow-[0_18px_46px_rgba(78,62,106,.11)] md:mt-14 md:rounded-[18px] md:px-9 md:py-8">
          <div className="pointer-events-none absolute -right-3 -top-16 h-[210px] w-[135px] rotate-[9deg] md:-right-1 md:-top-20 md:h-[250px] md:w-[160px]">
            <Image
              src="/images/heronad-plus.png.png"
              alt=""
              fill
              sizes="160px"
              className="object-contain drop-shadow-[0_14px_22px_rgba(20,30,45,.16)]"
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-7 pr-0 md:grid-cols-[minmax(0,1fr)_minmax(360px,32%)] md:items-center md:pr-28 lg:pr-40">
            <div>
              <h4 className="text-[22px] font-extrabold leading-tight text-black md:text-[24px]">
                Research updates from Origin
              </h4>
              <p className="mt-3 max-w-[470px] text-[14px] font-medium leading-6 text-[#74717b]">
                Subscribe for product updates, new research compounds, and quality documentation news
              </p>
              <p className="mt-2 text-[12px] font-medium leading-5 text-[#5f5b65]">
                For researchers and labs. No spam, unsubscribe anytime.
              </p>
            </div>

            <form className="flex min-h-12 overflow-hidden rounded-full bg-white shadow-[0_8px_20px_rgba(30,28,38,.12)] ring-1 ring-black/10">
              <label className="sr-only" htmlFor="origin-newsletter-email">Email</label>
              <input
                id="origin-newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-5 text-[14px] font-medium text-black outline-none placeholder:text-[#9b9ba1]"
              />
              <button
                type="button"
                className="m-1 rounded-full bg-black px-6 text-[14px] font-extrabold text-white transition hover:bg-origin-green"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
