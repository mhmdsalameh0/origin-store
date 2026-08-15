"use client";

import { useCart } from "@/components/cart/CartProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, UserRoundCog, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const { hydrated, openDrawer, totalQuantity } = useCart();

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
            className="grid size-10 place-items-center text-origin-ink lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={36} strokeWidth={2.7} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-white text-origin-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <OriginLogo />
              <button className="grid size-11 place-items-center" onClick={() => setOpen(false)} aria-label="Close navigation">
                <X size={25} />
              </button>
            </div>
            <motion.nav
              className="flex flex-col border-y border-origin-line"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.08 } },
                closed: {}
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  className="border-b border-origin-line px-5 py-5 text-left text-[clamp(1.5rem,8vw,2rem)] font-bold"
                  variants={{
                    closed: { opacity: 0, x: -18 },
                    open: { opacity: 1, x: 0 }
                  }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
