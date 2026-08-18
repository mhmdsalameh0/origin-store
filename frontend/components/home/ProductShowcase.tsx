"use client";

import { catalogProducts } from "@/lib/productCatalog";
import { LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { SectionReveal } from "./SectionReveal";

const carouselTransition = { duration: 0.68, ease: "easeInOut" } as const;

const products = catalogProducts;
const showcaseImages: Record<string, string> = {
  "TB-500": "/images/showcase-tb-500-clean.png",
  "GHK-CU": "/images/showcase-ghk-cu-clean.png",
  "MOTS-C": "/images/showcase-mots-c-clean.png",
  Retatrutide: "/images/showcase-retatrutide-clean.png"
};

function getShowcaseImage(product: (typeof products)[number]) {
  return showcaseImages[product.name] ?? product.image;
}

function MobileProductCard({ product }: { product: (typeof products)[number] }) {
  const isRetatrutide = product.name === "Retatrutide";
  const imageSrc = getShowcaseImage(product);

  return (
    <article className="flex h-full flex-col items-center bg-white text-center">
      <div className="grid h-[245px] w-full place-items-center bg-white">
        <Image
          src={imageSrc}
          alt={`${product.name} Origin Peptides vial`}
          width={260}
          height={320}
          sizes="(max-width: 640px) 78vw"
          className="h-full max-h-[232px] w-auto object-contain object-center"
        />
      </div>

      <div className="flex w-full flex-col items-center px-5 pb-3 pt-4">
        <div className="h-[3px] w-[112px]" style={{ backgroundColor: product.accent }} />
        <h3
          className={`mt-4 flex min-h-0 max-w-full items-start justify-center text-center font-sans font-bold uppercase leading-tight tracking-normal text-[#111111] ${
            isRetatrutide ? "text-[18px]" : "text-[22px]"
          }`}
        >
          {product.displayName}
        </h3>
        <p className="mt-2 flex max-w-full items-start justify-center text-center font-sans text-[14px] font-normal normal-case leading-tight tracking-normal text-[#1f2933]">
          {product.category}
        </p>
        <p className="mt-4 font-sans text-[28px] font-semibold leading-none text-[#29313c]">{product.price}</p>
        <Link
          href={`/products/${product.slug}`}
          scroll
          className="mt-5 flex min-h-11 w-[78%] items-center justify-center gap-1.5 rounded-full bg-[#202329] px-5 font-sans text-[15px] font-semibold normal-case tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_8px_18px_rgba(15,23,42,.14)] transition-colors duration-300 hover:bg-[#0f1115]"
        >
          <ShoppingCart size={14} strokeWidth={2} />
          <span>Add to Cart</span>
        </Link>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isRetatrutide = product.name === "Retatrutide";
  const imageSrc = getShowcaseImage(product);

  return (
    <motion.article
      layout="position"
      className="group flex h-full flex-col items-center bg-white text-center"
      whileHover={{ y: -5 }}
      transition={{ layout: carouselTransition, duration: 0.25 }}
    >
      <div className="grid h-[310px] w-full place-items-center">
        <div className="relative h-full aspect-[2/3] overflow-hidden bg-white">
          <Image
            src={imageSrc}
            alt={`${product.name} Origin Peptides vial`}
            fill
            sizes="(max-width: 768px) 190px, 207px"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="mt-4 grid w-full grid-rows-[3px_40px_34px_40px_44px] justify-items-center gap-y-3 px-5 pb-3">
        <div className="h-[3px] w-[112px] self-start justify-self-center" style={{ backgroundColor: product.accent }} />
        <h3
          className={`flex min-h-[42px] items-start justify-center whitespace-nowrap font-sans font-bold uppercase leading-none tracking-normal text-[#111111] ${
            isRetatrutide ? "text-[18px] md:text-[23px] 2xl:text-[24px]" : "text-[22px] md:text-[25px] xl:text-[26px]"
          }`}
        >
          {product.displayName}
        </h3>
        <p className="flex min-h-10 max-w-full items-start justify-center text-center font-sans text-[15px] font-normal normal-case leading-tight tracking-normal text-[#1f2933] md:text-[13px]">
          {product.category}
        </p>
        <p className="self-start font-sans text-[29px] font-semibold leading-none text-[#29313c]">{product.price}</p>
        <Link
          href={`/products/${product.slug}`}
          scroll
          className="flex min-h-11 w-[218px] items-center justify-center gap-1.5 self-start rounded-full bg-[#202329] px-5 font-sans text-[15px] font-semibold normal-case tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_8px_18px_rgba(15,23,42,.14)] transition-colors duration-300 hover:bg-[#0f1115] md:text-[12px]"
        >
          <ShoppingCart size={14} strokeWidth={2} />
          <span>Add to Cart</span>
        </Link>
      </div>
    </motion.article>
  );
}

export function ProductShowcase() {
  const autoplayResumeTimer = useRef<number | null>(null);
  const mobileAutoplayResumeTimer = useRef<number | null>(null);
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const [orderedProducts, setOrderedProducts] = useState(products);
  const [mobileIndex, setMobileIndex] = useState(1);
  const [mobileTransitionEnabled, setMobileTransitionEnabled] = useState(true);
  const [mobileMetrics, setMobileMetrics] = useState({ offset: 0, sidePadding: 0, slideWidth: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileHovering, setIsMobileHovering] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [isMobileInteractionPaused, setIsMobileInteractionPaused] = useState(false);

  const mobileSlides = [products[products.length - 1], ...products, products[0]];

  const rotateProducts = useCallback((direction: "previous" | "next") => {
    setOrderedProducts((currentProducts) => {
      if (direction === "next") {
        return [...currentProducts.slice(1), currentProducts[0]];
      }

      return [currentProducts[currentProducts.length - 1], ...currentProducts.slice(0, -1)];
    });
  }, []);

  const pauseAfterInteraction = useCallback(() => {
    if (autoplayResumeTimer.current) {
      window.clearTimeout(autoplayResumeTimer.current);
    }

    setIsInteractionPaused(true);
    autoplayResumeTimer.current = window.setTimeout(() => {
      setIsInteractionPaused(false);
      autoplayResumeTimer.current = null;
    }, 3000);
  }, []);

  const pauseMobileAfterInteraction = useCallback(() => {
    if (mobileAutoplayResumeTimer.current) {
      window.clearTimeout(mobileAutoplayResumeTimer.current);
    }

    setIsMobileInteractionPaused(true);
    mobileAutoplayResumeTimer.current = window.setTimeout(() => {
      setIsMobileInteractionPaused(false);
      mobileAutoplayResumeTimer.current = null;
    }, 4000);
  }, []);

  const handleArrowClick = (direction: "previous" | "next") => {
    rotateProducts(direction);
    pauseAfterInteraction();
  };

  const rotateMobileProducts = useCallback((direction: "previous" | "next") => {
    setMobileTransitionEnabled(true);
    setMobileIndex((currentIndex) => currentIndex + (direction === "next" ? 1 : -1));
  }, []);

  const handleMobileArrowClick = (direction: "previous" | "next") => {
    rotateMobileProducts(direction);
    pauseMobileAfterInteraction();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const swipeDistance = touchEndX - touchStartX.current;

    if (Math.abs(swipeDistance) < 40) {
      return;
    }

    rotateMobileProducts(swipeDistance < 0 ? "next" : "previous");
    pauseMobileAfterInteraction();
  };

  const handleMobileTransitionEnd = () => {
    if (mobileIndex === products.length + 1) {
      setMobileTransitionEnabled(false);
      setMobileIndex(1);
      requestAnimationFrame(() => setMobileTransitionEnabled(true));
    }

    if (mobileIndex === 0) {
      setMobileTransitionEnabled(false);
      setMobileIndex(products.length);
      requestAnimationFrame(() => setMobileTransitionEnabled(true));
    }
  };

  useEffect(() => {
    if (isHovering || isInteractionPaused) {
      return;
    }

    const autoplay = window.setInterval(() => rotateProducts("next"), 3000);

    return () => window.clearInterval(autoplay);
  }, [isHovering, isInteractionPaused, rotateProducts]);

  useEffect(() => {
    if (isMobileHovering || isMobileInteractionPaused) {
      return;
    }

    const autoplay = window.setInterval(() => rotateMobileProducts("next"), 4000);

    return () => window.clearInterval(autoplay);
  }, [isMobileHovering, isMobileInteractionPaused, rotateMobileProducts]);

  useEffect(() => {
    const updateMobileMetrics = () => {
      const viewportWidth = mobileViewportRef.current?.clientWidth ?? 0;

      if (!viewportWidth) {
        return;
      }

      const slideWidth = viewportWidth * 0.62;

      setMobileMetrics({
        offset: slideWidth + 16,
        sidePadding: viewportWidth * 0.05,
        slideWidth
      });
    };

    updateMobileMetrics();
    window.addEventListener("resize", updateMobileMetrics);

    return () => window.removeEventListener("resize", updateMobileMetrics);
  }, []);

  useEffect(() => {
    return () => {
      if (autoplayResumeTimer.current) {
        window.clearTimeout(autoplayResumeTimer.current);
      }

      if (mobileAutoplayResumeTimer.current) {
        window.clearTimeout(mobileAutoplayResumeTimer.current);
      }
    };
  }, []);

  return (
    <SectionReveal className="bg-white py-16 font-sans text-origin-ink md:py-20">
      <div id="products" className="mx-auto max-w-[1780px] px-5">
        <div className="mx-auto mb-10 max-w-6xl text-center">
          <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-[-.03em] text-black">
            Explore the Origin&apos;s Restored Peptides
          </h2>
          <p className="mt-2 text-[14px] font-normal leading-6 tracking-[0.01em] text-[#5d6674] md:text-[16px]">
            Reliable research solutions developed to support your scientific goals.
          </p>
        </div>

        <div className="relative md:hidden" onMouseEnter={() => setIsMobileHovering(true)} onMouseLeave={() => setIsMobileHovering(false)}>
          <button
            className="absolute left-0 top-[122px] z-10 grid size-[54px] -translate-y-1/2 place-items-center text-[#111722] transition hover:-translate-x-1"
            aria-label="Previous products"
            onClick={() => handleMobileArrowClick("previous")}
            type="button"
          >
            <ChevronLeft size={46} strokeWidth={1.5} />
          </button>
          <div ref={mobileViewportRef} className="overflow-hidden" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
            <div
              className="flex gap-4"
              onTransitionEnd={handleMobileTransitionEnd}
              style={{
                paddingInline: mobileMetrics.sidePadding ? `${mobileMetrics.sidePadding}px` : "5%",
                transform: mobileMetrics.offset
                  ? `translate3d(-${mobileIndex * mobileMetrics.offset}px, 0, 0)`
                  : `translate3d(-${mobileIndex * 62}%, 0, 0)`,
                transition: "none"
              }}
            >
              {mobileSlides.map((product, index) => (
                <div
                  key={`${product.name}-mobile-${index}`}
                  className="shrink-0"
                  style={{ flexBasis: mobileMetrics.slideWidth ? `${mobileMetrics.slideWidth}px` : "62%" }}
                >
                  <MobileProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute right-0 top-[122px] z-10 grid size-[54px] -translate-y-1/2 place-items-center text-[#111722] transition hover:translate-x-1"
            aria-label="Next products"
            onClick={() => handleMobileArrowClick("next")}
            type="button"
          >
            <ChevronRight size={46} strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative hidden md:block" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <button
            className="absolute left-8 top-[165px] z-10 hidden size-[54px] -translate-y-1/2 place-items-center text-[#111722] transition hover:-translate-x-1 xl:grid"
            aria-label="Previous products"
            onClick={() => handleArrowClick("previous")}
            type="button"
          >
            <ChevronLeft size={46} strokeWidth={1.5} />
          </button>
          <LayoutGroup>
            <div className="grid gap-11 sm:grid-cols-2 xl:grid-cols-4 xl:px-24">
              {orderedProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </LayoutGroup>
          <button
            className="absolute right-8 top-[165px] z-10 hidden size-[54px] -translate-y-1/2 place-items-center text-[#111722] transition hover:translate-x-1 xl:grid"
            aria-label="Next products"
            onClick={() => handleArrowClick("next")}
            type="button"
          >
            <ChevronRight size={46} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </SectionReveal>
  );
}
