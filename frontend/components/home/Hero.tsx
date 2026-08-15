"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.35 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  const handleMediaPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative mb-0 overflow-hidden bg-white pb-0 pt-[83px] text-[#020711]">
      <div className="mb-0 grid h-auto items-stretch gap-0 overflow-hidden border-0 bg-[#eef1f7] pb-0 [column-gap:0] md:h-[424px] md:grid-cols-[50%_50%] md:bg-white">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-2 flex min-h-[300px] flex-col items-center justify-center overflow-hidden px-5 py-10 text-center md:order-1 md:h-full md:min-h-0 md:items-start md:justify-center md:bg-white md:py-12 md:pl-[12vw] md:pr-10 md:text-left lg:pl-[12vw] xl:pl-[12%]"
        >
          <h1 className="max-w-[760px] text-[56px] font-extrabold leading-[1.04] tracking-[-.04em] text-black sm:text-[58px] md:max-w-[620px] md:text-[40px] md:leading-[1.08] md:tracking-[-.03em] lg:text-[42px]">
            Origin&apos;s Restored Peptides
            <br />
            Excellence in Research
          </h1>
          <p className="mt-6 max-w-[680px] text-[24px] font-normal leading-[1.55] text-[#00102a] md:mt-6 md:max-w-[430px] md:text-[14px] md:leading-[1.55] lg:text-[15px]">
            Manufactured to 99%+ purity standards and verified through independent third-party testing.
          </p>
          <button className="mt-7 w-fit rounded-[24px] bg-black px-9 py-4 text-[22px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-origin-green md:mt-9 md:rounded-[17px] md:px-6 md:py-3 md:text-[16px]">
            Contact →
          </button>
        </motion.div>

        <motion.div
          className="relative z-0 order-1 block h-[330px] w-full overflow-hidden md:order-2 md:h-full md:min-h-0"
          onMouseMove={handleMediaPointerMove}
          onMouseLeave={resetParallax}
        >
          {!shouldReduceMotion ? (
            <motion.div
              className="pointer-events-none absolute inset-y-0 z-20 w-1/3 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.42)_48%,transparent_100%)] blur-sm"
              initial={{ x: "-130%" }}
              animate={{ x: "330%" }}
              transition={{ duration: 1.05, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
          <motion.div
            className="absolute inset-0 z-0 origin-center"
            style={shouldReduceMotion ? undefined : { x: parallaxX, y: parallaxY }}
          >
            <motion.div
              className="relative h-full w-full"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 24, filter: "blur(10px)" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 72, damping: 19, mass: 0.95, delay: 0.18 }
              }
            >
              <motion.div
                className="relative h-full w-full"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 6.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 1.1 }
                }
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_44%,rgba(255,255,255,0.9)_0%,rgba(238,243,255,0.88)_38%,rgba(214,225,250,0.95)_100%)]" />
                <div className="absolute inset-x-[8%] bottom-[10%] h-[16%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(82,116,171,0.2)_0%,rgba(153,176,215,0.12)_42%,transparent_72%)] blur-md" />
                <Image
                  src="/images/heromots-c.png.png"
                  alt="Origin MOTS-C peptide vial"
                  width={390}
                  height={390}
                  priority
                  sizes="(max-width: 768px) 58vw, 25vw"
                  className="absolute left-[1%] top-[6%] z-10 h-[245px] w-auto -rotate-[18deg] object-contain drop-shadow-[0_22px_28px_rgba(88,113,152,.18)] sm:left-[4%] sm:h-[280px] md:left-[2%] md:top-[7%] md:h-[315px] lg:left-[3%] lg:h-[340px]"
                />
                <Image
                  src="/images/herotb-500.png.png"
                  alt="Origin TB-500 peptide vial"
                  width={280}
                  height={280}
                  priority
                  sizes="(max-width: 768px) 38vw, 18vw"
                  className="absolute left-[58%] top-[12%] z-20 h-[180px] w-auto -translate-x-1/2 rotate-[12deg] object-contain drop-shadow-[0_20px_24px_rgba(88,113,152,.16)] sm:h-[205px] md:left-[56%] md:top-[14%] md:h-[235px] lg:h-[260px]"
                />
                <Image
                  src="/images/heroghk-cu.png.png"
                  alt="Origin GHK-CU peptide vial"
                  width={210}
                  height={210}
                  priority
                  sizes="(max-width: 768px) 30vw, 14vw"
                  className="absolute left-[47%] top-[50%] z-30 h-[120px] w-auto -translate-x-1/2 rotate-[-13deg] object-contain drop-shadow-[0_18px_20px_rgba(88,113,152,.2)] sm:h-[140px] md:left-[48%] md:top-[52%] md:h-[160px] lg:h-[178px]"
                />
                <Image
                  src="/images/heronad-plus.png.png"
                  alt="Origin NAD+ peptide bottle"
                  width={170}
                  height={170}
                  priority
                  sizes="(max-width: 768px) 26vw, 12vw"
                  className="absolute right-[10%] top-[25%] z-10 h-[165px] w-auto rotate-[4deg] object-contain drop-shadow-[0_20px_22px_rgba(88,113,152,.14)] sm:right-[13%] sm:h-[190px] md:right-[12%] md:top-[24%] md:h-[220px] lg:right-[13%] lg:h-[245px]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
