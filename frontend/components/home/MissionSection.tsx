"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionReveal } from "./SectionReveal";

export function MissionSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal className="relative overflow-hidden bg-[#171920] text-white">
      <div id="about" className="scroll-mt-24" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[190px] w-[34%] opacity-45">
        <div className="absolute bottom-8 left-0 h-px w-full bg-[linear-gradient(100deg,rgba(139,89,206,.55),transparent)]" />
        <div className="absolute bottom-16 left-0 h-px w-[86%] bg-[linear-gradient(100deg,rgba(139,89,206,.35),transparent)]" />
        <div className="absolute bottom-24 left-0 h-px w-[70%] bg-[linear-gradient(100deg,rgba(139,89,206,.22),transparent)]" />
      </div>
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:px-12 md:py-[72px] lg:grid-cols-[minmax(0,56%)_minmax(0,44%)] lg:items-center lg:gap-12">
        <div className="relative min-w-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(138,82,212,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.04),transparent_42%)]" />
          <div className="relative z-10 max-w-[680px]">
            <p className="inline-flex items-center rounded-full border border-white/12 bg-white/[.03] py-2.5 pl-4 pr-5 text-[15px] font-extrabold leading-none tracking-[-.02em] shadow-[0_0_34px_rgba(128,85,184,.18)]">
              <span className="mr-3 h-7 w-[3px] rounded-full bg-[#a96dff] shadow-[0_0_18px_rgba(169,109,255,.85)]" />
              Discover Our Mission
            </p>
            <h2 className="mt-7 max-w-[680px] text-[32px] font-extrabold leading-[1.08] tracking-[-.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,.22)] md:text-[clamp(38px,3.4vw,50px)]">
              Advancing Research Through Reliable Quality
            </h2>
            <div className="mt-6 h-[4px] w-[168px] rounded-full bg-[#a96dff] shadow-[0_0_20px_rgba(169,109,255,.8)]" />
            <p className="mt-8 max-w-[680px] text-[16px] font-medium leading-[1.65] text-white/88">
              Origin&apos;s Restored Peptides is committed to providing high-quality research peptides backed by transparency,
              consistency, and scientific excellence. We focus on delivering reliable products that support researchers,
              laboratories, and institutions with confidence.
            </p>
            <p className="mt-6 max-w-[680px] text-[16px] font-medium leading-[1.65] text-white/88">
              Our goal is to make premium research peptides more accessible through trusted quality standards, dependable
              service, and clear communication. At Origin Peptides, meaningful scientific progress begins with reliable
              products, rigorous quality, and a commitment to excellence in research.
            </p>
          </div>
        </div>

        <div className="relative grid min-h-[390px] place-items-center bg-[#8055b8] py-8 lg:min-h-0 lg:bg-transparent lg:py-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_22%,rgba(255,255,255,.24),transparent_34%),linear-gradient(180deg,rgba(45,24,82,.18),transparent_50%)]" />
          <motion.div
            className="relative z-10 h-[350px] w-full max-w-[480px] overflow-hidden rounded-bl-[82px] rounded-tr-[82px] border border-[#b987ff]/80 bg-[#fffef1] shadow-[0_0_42px_rgba(169,109,255,.42),0_28px_70px_rgba(0,0,0,.3)]"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(223,31,45,.10),transparent_42%)]" />
            <div className="absolute bottom-11 left-1/2 h-5 w-[42%] -translate-x-1/2 rounded-full bg-black/18 blur-xl" />
            <motion.div
              className="relative h-full w-full"
              animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 6.2, ease: "easeInOut", repeat: Infinity }}
            >
              <Image
                src="/images/quality-tb500-vial.png"
                alt="Origin Peptides TB-500 vial"
                fill
                sizes="(max-width: 1024px) 86vw, 480px"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
