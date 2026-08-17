"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      <div className="mb-0 h-auto overflow-hidden border-0 bg-[#eef1f7] pb-0 md:h-[424px] md:bg-white">
        <motion.div
          className="relative z-0 flex w-full flex-col overflow-hidden md:h-full md:flex-row"
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
            className="relative z-0 h-[240px] w-full origin-center md:order-2 md:h-full md:w-1/2"
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
                <div className="relative h-full w-full overflow-hidden bg-white" aria-label="Origin Peptides MOTS-C, TB-500, GHK-CU, and NAD+ products">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_18%,#eef1ff_56%,#dfeeff_100%)]" />
                  <Image
                    src="/images/hero-origin-amino-composite-overlap-preview.png"
                    alt="Origin Peptides MOTS-C, TB-500, NAD+, and GHK-CU products"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-[58%_58%] scale-[0.88] md:scale-[0.84]"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 flex flex-col items-center px-5 pb-10 pt-8 text-center md:order-1 md:w-1/2 md:items-start md:justify-center md:px-12 md:py-0 md:pr-8 md:text-left lg:px-[50px] lg:pr-10"
          >
            <h1 className="max-w-[360px] text-[30px] font-extrabold leading-[1.02] tracking-normal text-black md:max-w-none md:whitespace-nowrap md:text-[43px] lg:text-[45px]">
              Origin&apos;s Restored Peptides
            </h1>
            <p className="mt-4 max-w-[320px] text-[11px] font-normal leading-[1.45] text-[#00102a] md:mt-7 md:max-w-[430px] md:text-[16px] md:leading-[1.55]">
              Manufactured to 99%+ purity standards and verified through independent third-party testing.
            </p>
            <Link href="/contact" className="mt-5 flex min-h-10 w-fit items-center gap-4 rounded-[24px] bg-black px-7 py-2.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-origin-green md:mt-7 md:min-h-11 md:px-8 md:py-3 md:text-[15px]">
              Contact Us
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
