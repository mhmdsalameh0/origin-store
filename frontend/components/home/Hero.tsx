"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const desktopRainParticles = [
  { left: "6%", top: "-8%", width: 1, height: 18, opacity: 0.36, duration: "6.2s", delay: "-1.1s", drift: "-18px", travel: "520px" },
  { left: "11%", top: "-18%", width: 1, height: 14, opacity: 0.32, duration: "7.4s", delay: "-3.2s", drift: "-14px", travel: "560px" },
  { left: "17%", top: "-10%", width: 2, height: 21, opacity: 0.34, duration: "5.1s", delay: "-4.4s", drift: "-22px", travel: "500px" },
  { left: "23%", top: "-24%", width: 1, height: 16, opacity: 0.31, duration: "7.8s", delay: "-2.6s", drift: "-16px", travel: "590px" },
  { left: "29%", top: "-12%", width: 1, height: 24, opacity: 0.38, duration: "4.8s", delay: "-3.9s", drift: "-24px", travel: "510px" },
  { left: "35%", top: "-20%", width: 2, height: 15, opacity: 0.33, duration: "6.7s", delay: "-5.6s", drift: "-18px", travel: "550px" },
  { left: "41%", top: "-7%", width: 1, height: 20, opacity: 0.35, duration: "5.9s", delay: "-1.8s", drift: "-21px", travel: "515px" },
  { left: "47%", top: "-26%", width: 1, height: 13, opacity: 0.3, duration: "7.1s", delay: "-6.3s", drift: "-13px", travel: "580px" },
  { left: "53%", top: "-14%", width: 2, height: 22, opacity: 0.37, duration: "4.4s", delay: "-2.9s", drift: "-23px", travel: "505px" },
  { left: "59%", top: "-22%", width: 1, height: 17, opacity: 0.32, duration: "6.5s", delay: "-4.8s", drift: "-17px", travel: "555px" },
  { left: "64%", top: "-9%", width: 1, height: 19, opacity: 0.34, duration: "5.6s", delay: "-3.4s", drift: "-20px", travel: "520px" },
  { left: "69%", top: "-27%", width: 2, height: 12, opacity: 0.3, duration: "7.6s", delay: "-7.1s", drift: "-15px", travel: "600px" },
  { left: "74%", top: "-13%", width: 1, height: 23, opacity: 0.39, duration: "4.9s", delay: "-1.5s", drift: "-25px", travel: "505px" },
  { left: "79%", top: "-21%", width: 1, height: 15, opacity: 0.31, duration: "6.9s", delay: "-5.2s", drift: "-16px", travel: "570px" },
  { left: "84%", top: "-11%", width: 2, height: 20, opacity: 0.35, duration: "5.3s", delay: "-4.1s", drift: "-22px", travel: "525px" },
  { left: "89%", top: "-25%", width: 1, height: 14, opacity: 0.33, duration: "7.9s", delay: "-6.7s", drift: "-14px", travel: "595px" },
  { left: "94%", top: "-8%", width: 1, height: 22, opacity: 0.37, duration: "4.6s", delay: "-2.2s", drift: "-24px", travel: "515px" },
  { left: "14%", top: "-31%", width: 2, height: 12, opacity: 0.31, duration: "6.1s", delay: "-5.9s", drift: "-17px", travel: "610px" },
  { left: "32%", top: "-35%", width: 1, height: 18, opacity: 0.34, duration: "7.2s", delay: "-7.4s", drift: "-19px", travel: "625px" },
  { left: "50%", top: "-33%", width: 2, height: 13, opacity: 0.3, duration: "5.7s", delay: "-4.6s", drift: "-15px", travel: "600px" },
  { left: "68%", top: "-34%", width: 1, height: 21, opacity: 0.36, duration: "6.8s", delay: "-6.1s", drift: "-22px", travel: "620px" },
  { left: "86%", top: "-32%", width: 2, height: 16, opacity: 0.32, duration: "5.4s", delay: "-3.6s", drift: "-18px", travel: "610px" }
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative mb-0 overflow-hidden bg-white pb-0 pt-[83px] text-[#020711]">
      <style>{`
        @media (min-width: 1024px) {
          @keyframes heroRainFall {
            0% {
              opacity: 0;
              transform: translate3d(0, -32px, 0) rotate(8deg);
            }

            14% {
              opacity: var(--rain-opacity, 0.34);
            }

            86% {
              opacity: var(--rain-opacity, 0.34);
            }

            100% {
              opacity: 0;
              transform: translate3d(var(--rain-drift, -18px), var(--rain-travel, 540px), 0) rotate(8deg);
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-rain-particle {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
      <div className="mb-0 h-auto overflow-hidden border-0 bg-[#dceeff] pb-0 md:h-[560px] md:bg-white lg:h-auto lg:min-h-0 lg:py-0">
        <motion.div
          className="relative z-0 flex w-full flex-col overflow-hidden md:h-full md:flex-row lg:h-auto"
        >
          <div className="pointer-events-none absolute inset-0 z-0 hidden md:flex">
            <div className="w-1/2 bg-white" />
            <div className="w-1/2 bg-[linear-gradient(135deg,#eef1ff_0%,#dbe8ff_100%)]" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-[#020711]/10 md:block" />
          <motion.div
            className="pointer-events-none relative order-1 z-20 aspect-[1/0.78] w-full shrink origin-center md:pointer-events-auto md:order-2 md:h-full md:w-1/2 md:aspect-auto lg:h-auto lg:self-center"
          >
            <motion.div
              className="relative h-full w-full lg:h-auto"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 24, filter: "blur(10px)" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 72, damping: 19, mass: 0.95, delay: 0.18 }
              }
            >
              <div className="relative h-full w-full lg:h-auto">
                <div className="relative h-full w-full overflow-hidden lg:h-auto" aria-label="Origin Peptides MOTS-C, TB-500, GHK-CU, and NAD+ products">
                  <Image
                    src="/images/WhatsApp Image 2026-08-19 at 7.42.06 AM.jpeg"
                    alt="Origin Peptides MOTS-C, TB-500, NAD+, and GHK-CU products"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="hidden object-cover object-center md:block lg:hidden"
                  />
                  <div className="relative hidden aspect-video w-full overflow-hidden bg-transparent lg:block">
                    <img
                      src="/images/hero/origin-products-desktop-16x9.png"
                      alt="Origin Peptides product collection"
                      className="absolute inset-0 z-0 block h-full w-full object-cover object-center select-none pointer-events-none"
                      draggable="false"
                      loading="eager"
                      fetchPriority="high"
                    />
                    {!shouldReduceMotion ? (
                      <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block" aria-hidden="true">
                        {desktopRainParticles.map((particle, index) => (
                          <span
                            className="hero-rain-particle absolute rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.94),rgba(168,211,247,0.62),rgba(255,255,255,0))] blur-[0.15px] shadow-[0_0_10px_rgba(218,238,255,0.46)] [animation-fill-mode:both] [animation-iteration-count:infinite] [animation-name:heroRainFall] [animation-timing-function:ease-in-out]"
                            key={index}
                            style={{
                              left: particle.left,
                              top: particle.top,
                              width: `${particle.width}px`,
                              height: `${particle.height}px`,
                              opacity: particle.opacity,
                              animationDelay: particle.delay,
                              animationDuration: particle.duration,
                              "--rain-drift": particle.drift,
                              "--rain-opacity": particle.opacity,
                              "--rain-travel": particle.travel
                            } as CSSProperties}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <Image
                    src="/images/hero-products-cutout-transparent.png"
                    alt="Origin Peptides MOTS-C, TB-500, NAD+, and GHK-CU products"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-center md:hidden"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

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
