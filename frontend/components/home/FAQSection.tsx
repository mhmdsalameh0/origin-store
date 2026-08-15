"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Microscope } from "lucide-react";
import Image from "next/image";
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
    <SectionReveal className="relative overflow-hidden bg-[linear-gradient(135deg,#fffaf2_0%,#fbf7ff_48%,#fffdf8_100%)] px-6 py-12 text-origin-ink md:px-8 md:py-14">
      <div className="pointer-events-none absolute left-0 top-0 size-[360px] bg-[#d7c5ff]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[320px] bg-[#ffe4c7]/22 blur-3xl" />

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-64px))] items-center gap-8 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-12">
        <div className="relative h-[clamp(480px,42vw,550px)] overflow-hidden rounded-[24px] border-2 border-white bg-white shadow-[0_18px_52px_rgba(68,55,35,.11)]">
          <Image
            src="/images/section.png"
            alt="Origin GHK-CU vial in a laboratory"
            fill
            sizes="(max-width: 1024px) calc(100vw - 64px), 543px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/18" />
          <div className="absolute bottom-6 left-6 flex w-[min(320px,calc(100%-48px))] items-center gap-4 rounded-[18px] border border-white/80 bg-white/72 px-[18px] py-[14px] shadow-[0_16px_38px_rgba(31,25,20,.11)] backdrop-blur-md">
            <div className="grid size-[42px] shrink-0 place-items-center rounded-full bg-[#efe5ff] text-[#7650d8]">
              <Microscope size={22} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#7650d8]">Research Support</p>
              <p className="mt-1 text-[14px] font-medium leading-tight text-[#5d6575]">Clear answers. Reliable guidance.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center text-[30px] font-extrabold leading-none tracking-[-.01em] text-black">FAQ</h2>

          <div className="mt-4 space-y-[10px]">
            {faqs.map((faq, index) => {
              const isOpen = openItem === index;

              return (
                <div
                  className="overflow-hidden rounded-[12px] border border-[#dfd0ff] bg-white/82 shadow-[0_8px_22px_rgba(96,72,132,.055)] backdrop-blur"
                  key={faq.question}
                >
                  <button
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-4 px-[18px] py-[15px] text-left transition hover:bg-white"
                    onClick={() => toggleItem(index)}
                  >
                    <span className="grid size-9 place-items-center rounded-[8px] bg-[#f1e7ff] text-[15px] font-bold text-[#7650d8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-bold leading-snug text-[#10162b] md:text-[16px]">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="grid size-9 place-items-center rounded-full bg-[#f2e8ff] text-[#7650d8]"
                    >
                      <ChevronDown size={17} strokeWidth={2.5} />
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
                        <div className="ml-[70px] mr-[18px] border-t border-[#dfd0ff] pb-[15px] pt-3">
                          <p className="max-w-[650px] text-[14px] font-medium leading-[1.55] text-[#6a7182]">{faq.answer}</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
