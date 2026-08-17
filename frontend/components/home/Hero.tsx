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
          className="relative z-10 order-2 flex min-h-[300px] flex-col items-center justify-center overflow-hidden px-5 py-9 text-center md:order-1 md:h-full md:min-h-0 md:items-start md:justify-center md:bg-white md:px-8 md:py-12 md:text-left lg:pl-[8vw] lg:pr-10 xl:pl-[calc((100vw-1200px)/2)]"
        >
          <h1 className="max-w-[760px] text-[32px] font-extrabold leading-[1.04] tracking-normal text-black md:max-w-[620px] md:text-[40px] md:leading-[1.08] lg:text-[42px]">
            Origin&apos;s Restored Peptides
            <br />
            Excellence in Research
          </h1>
          <p className="mt-5 max-w-[680px] text-[13px] font-normal leading-[1.55] text-[#00102a] sm:text-[15px] md:mt-6 md:max-w-[430px] md:text-[15px] md:leading-[1.55]">
            Manufactured to 99%+ purity standards and verified through independent third-party testing.
          </p>
          <button className="mt-7 min-h-11 w-fit rounded-[24px] bg-black px-8 py-3 text-[17px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-origin-green md:mt-9 md:rounded-[17px] md:px-6 md:text-[16px]">
            Contact →
          </button>
        </motion.div>

        <motion.div
          className="relative z-0 order-1 block h-[240px] w-full overflow-hidden md:order-2 md:h-full md:min-h-0"
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
                <Image
                  src="/images/hero-origin-products-mobile.png"
                  alt="Origin Peptides products"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center md:hidden"
                />
                <Image
                  src="/images/hero-origin-products-website.png"
                  alt="Origin Peptides MOTS-C, TB-500, GHK-CU, and NAD+ products"
                  fill
                  priority
                  sizes="50vw"
                  className="hidden object-cover object-[64%_center] md:block"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
