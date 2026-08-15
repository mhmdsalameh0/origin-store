"use client";

import { useCart } from "@/components/cart/CartProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, ShoppingBag, UserRoundCog, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact us", href: "/#contact" }
];

function OriginLogo() {
  return (
    <span className="relative block h-[50px] w-[152px] sm:h-[66px] sm:w-[210px]" aria-hidden="true">
      <Image
        src="/images/ChatGPT-Image-Jul-26-2026-02_19_38-AM-1-768x358.png"
        alt=""
        fill
        sizes="(max-width: 640px) 152px, 210px"
        className="object-contain object-left"
        priority
      />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const { hydrated, openDrawer, totalQuantity } = useCart();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => setOpen(true);

  const closeMenu = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => menuTriggerRef.current?.focus(), shouldReduceMotion ? 0 : 280);
  }, [shouldReduceMotion]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/" && currentHash !== "#contact";
    }

    if (href === "/#contact") {
      return pathname === "/" && currentHash === "#contact";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu, open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-white text-origin-ink">
      <div className="mx-auto flex h-[83px] w-full max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link className="flex items-center gap-3" href="/">
          <OriginLogo />
          <span className="sr-only">Origin Peptides Home</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[34px] lg:flex">
          {navItems.map((item) => (
            <Link
              className="text-[15px] font-bold text-[#0c1220] transition hover:text-origin-green"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-[96px] items-center justify-end gap-2 sm:min-w-[132px] sm:gap-4">
          <button className="relative grid size-11 place-items-center text-black transition hover:text-origin-green" aria-label="Open cart" onClick={openDrawer} type="button">
            <ShoppingBag size={22} strokeWidth={1.8} />
            <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#ff4d5f] text-[10px] font-bold leading-none text-white">
              {hydrated ? totalQuantity : 0}
            </span>
          </button>
          <button className="hidden size-11 place-items-center text-black transition hover:text-origin-green lg:grid" aria-label="My account">
            <UserRoundCog size={27} fill="currentColor" strokeWidth={1.6} />
          </button>
          <button
            ref={menuTriggerRef}
            className="grid size-10 place-items-center text-origin-ink lg:hidden"
            onClick={openMenu}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            type="button"
          >
            <Menu size={36} strokeWidth={2.7} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            aria-modal="true"
            className="fixed inset-0 z-[9999] min-h-dvh overflow-y-auto overflow-x-hidden bg-[#111c31] px-6 text-white lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            onKeyDown={handleMenuKeyDown}
            role="dialog"
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-24 -top-24 size-[320px] rounded-full bg-[#7c55bb]/25 blur-3xl" />
            <div className="relative flex min-h-dvh flex-col pb-[calc(28px+env(safe-area-inset-bottom))] pt-[calc(20px+env(safe-area-inset-top))]">
              <div className="flex items-center justify-between gap-4">
                <Link className="rounded-[12px] bg-white px-3 py-1.5" href="/" onClick={closeMenu}>
                  <OriginLogo />
                  <span className="sr-only">Origin Peptides Home</span>
                </Link>
                <button
                  ref={closeButtonRef}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[.06] text-white transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-[#9c75dc] active:scale-95"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  type="button"
                >
                  <X size={23} strokeWidth={2.2} />
                </button>
              </div>

              <motion.nav
                aria-label="Mobile navigation"
                className="mt-12 flex flex-col border-y border-white/10"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.055 } },
                  closed: {}
                }}
              >
                {navItems.map((item, index) => {
                  const isActive = isActiveLink(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      className="border-b border-white/10 last:border-b-0"
                      variants={{
                        closed: { opacity: 0, x: -16 },
                        open: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group relative grid min-h-14 grid-cols-[44px_minmax(0,1fr)_18px] items-center gap-3 py-5 text-left focus:outline-none"
                      >
                        <span className="self-start pt-1 text-[13px] font-extrabold text-[#9c75dc]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 text-[clamp(1.875rem,8vw,2.125rem)] font-extrabold leading-none tracking-[-.03em] text-white transition group-hover:text-white/82">
                          {item.label}
                          {isActive ? <span className="mt-3 block h-[3px] w-12 rounded-full bg-[#9c75dc]" /> : null}
                        </span>
                        {isActive ? <span className="size-2 rounded-full bg-[#9c75dc]" aria-hidden="true" /> : null}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <Link
                className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full border border-[#9c75dc] px-6 text-[16px] font-extrabold text-white transition hover:bg-[#9c75dc]/18 focus:outline-none focus:ring-2 focus:ring-[#9c75dc] active:scale-[.98]"
                href="/products"
                onClick={closeMenu}
              >
                Browse Products <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>

              <div className="mt-auto pt-12">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#9c75dc]">Research use only</p>
                <p className="mt-3 text-[15px] font-semibold text-white/72">Quality &bull; Transparency &bull; Reliability</p>
                <div className="mt-10 flex items-end justify-between gap-6">
                  <p className="text-[13px] font-semibold text-white/48">&copy; 2026 Origin Peptides</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
