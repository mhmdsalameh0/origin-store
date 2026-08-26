"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative mb-0 overflow-hidden bg-white pb-0 pt-[83px] text-[#020711]">
      <div className="mb-0 h-auto w-full overflow-hidden border-0 bg-[#dceeff] pb-0 md:h-[560px] md:bg-white lg:h-auto lg:min-h-0 lg:py-0">
        <motion.div
          className="relative z-0 flex w-full flex-col overflow-hidden md:h-full md:flex-row lg:h-auto"
        >
          <div className="pointer-events-none absolute inset-0 z-0 hidden md:flex">
            <div className="w-1/2 bg-white" />
            <div className="w-1/2 bg-[linear-gradient(135deg,#eef1ff_0%,#dbe8ff_100%)]" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-[#020711]/10 md:block" />
          <div
            className="pointer-events-none relative order-1 z-20 w-full shrink bg-[#dceeff] md:pointer-events-auto md:order-2 md:w-1/2 lg:self-center"
            aria-label="Origin Peptides MOTS-C, TB-500, GHK-CU, and NAD+ products"
          >
            <img
              src="/images/WhatsApp Image 2026-08-19 at 7.42.06 AM.jpeg"
              alt="Origin Peptides MOTS-C, TB-500, NAD+, and GHK-CU products"
              className="block h-auto w-full object-contain object-center"
              draggable="false"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 order-2 flex flex-col items-center px-5 pb-5 pt-2 text-center md:order-1 md:w-1/2 md:items-start md:justify-center md:px-12 md:py-0 md:pr-8 md:text-left lg:px-[50px] lg:pr-10"
          >
            <h1 className="max-w-[340px] text-[31px] font-extrabold leading-[1.08] tracking-normal text-black md:max-w-none md:whitespace-nowrap md:text-[43px] lg:text-[36px]">
              Research Peptides You Can Trust
            </h1>
            <p className="mt-4 max-w-[330px] text-[11px] font-normal leading-[1.55] text-[#00102a] md:mt-7 md:max-w-[430px] md:text-[16px] md:leading-[1.55]">
              Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, third-party tested.
            </p>
            <Link href="/products" className="mt-5 flex min-h-10 w-fit items-center gap-4 rounded-[24px] bg-black px-7 py-2.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-origin-green md:mt-7 md:min-h-11 md:px-8 md:py-3 md:text-[15px]">
              Browse Catalog
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
