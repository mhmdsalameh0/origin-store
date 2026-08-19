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
  { label: "Contact us", href: "/contact" }
];

function OriginLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "relative block h-[22px] w-[68px]" : "relative block h-[50px] w-[152px] sm:h-[66px] sm:w-[210px]"}
      aria-hidden="true"
    >
      <Image
        src="/images/ChatGPT-Image-Jul-26-2026-02_19_38-AM-1-768x358.png"
        alt=""
        fill
        sizes={compact ? "68px" : "(max-width: 640px) 152px, 210px"}
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
            className="fixed inset-0 z-[9999] min-h-dvh overflow-y-auto overflow-x-hidden bg-[#fbfbfe] px-5 text-[#101d31] lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            onKeyDown={handleMenuKeyDown}
            role="dialog"
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-28 -top-24 size-[280px] rounded-full bg-[#8055bd]/12 blur-3xl" />
            <div className="relative flex min-h-dvh flex-col pb-[calc(20px+env(safe-area-inset-bottom))] pt-[calc(14px+env(safe-area-inset-top))]">
              <div className="flex items-center justify-between gap-4">
                <Link className="-ml-1 inline-flex rounded-[8px] px-1 py-1 focus:outline-none focus:ring-2 focus:ring-[#8055bd]" href="/" onClick={closeMenu}>
                  <OriginLogo compact />
                  <span className="sr-only">Origin Peptides Home</span>
                </Link>
                <button
                  ref={closeButtonRef}
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-[#101d31]/55 bg-transparent text-[#101d31] transition hover:bg-[#101d31]/5 focus:outline-none focus:ring-2 focus:ring-[#8055bd] active:scale-95"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  type="button"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>

              <motion.nav
                aria-label="Mobile navigation"
                className="mt-9 flex flex-col items-start gap-4"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.055 } },
                  closed: {}
                }}
              >
                {navItems.map((item) => {
                  const isActive = isActiveLink(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        closed: { opacity: 0, x: -16 },
                        open: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group relative inline-flex min-h-10 items-center text-left text-[25px] font-bold leading-none text-[#101d31] transition hover:text-[#8055bd] focus:outline-none focus:ring-2 focus:ring-[#8055bd]"
                      >
                        <span className="min-w-0">
                          {item.label}
                          {isActive ? <span className="mt-1.5 block h-[2px] w-9 rounded-full bg-[#8055bd]" /> : null}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <Link
                className="mt-5 inline-flex min-h-10 w-fit items-center justify-center rounded-full bg-[#101d31] px-7 text-[10px] font-extrabold text-white shadow-sm transition hover:bg-[#182845] focus:outline-none focus:ring-2 focus:ring-[#8055bd] active:scale-[.98]"
                href="/products"
                onClick={closeMenu}
              >
                Browse Products <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>

              <div className="mt-auto pt-12">
                <p className="text-[7px] font-extrabold uppercase tracking-[0.18em] text-[#8b96aa]">Research use only</p>
                <p className="mt-3 text-[8px] font-semibold text-[#8b96aa]">&copy; 2026 Origin Peptides</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
