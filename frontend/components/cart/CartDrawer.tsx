"use client";

import { formatPrice } from "@/lib/productCatalog";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { closeDrawer, isDrawerOpen, items, removeItem, subtotal, updateQuantity } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer, isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            className="absolute inset-0 bg-black/35"
            aria-label="Close cart"
            type="button"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white font-sans text-origin-ink shadow-[-22px_0_70px_rgba(15,23,42,.22)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-origin-line px-6 py-5">
              <div>
                <h2 id="cart-drawer-title" className="text-2xl font-bold text-black">
                  Cart
                </h2>
                <p className="mt-1 text-sm text-origin-muted">Review your selected research products.</p>
              </div>
              <button ref={closeButtonRef} className="grid size-10 place-items-center rounded-full hover:bg-slate-100" onClick={closeDrawer} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="text-lg font-bold">Your cart is empty.</p>
                    <p className="mt-2 text-sm text-origin-muted">Select a dosage to add a product.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-5">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.dosage}`} className="grid grid-cols-[76px_1fr] gap-4 border-b border-origin-line pb-5">
                      <div className="grid h-[92px] place-items-center rounded bg-[#f5f7fb]">
                        <Image src={item.image} alt="" width={58} height={80} className="h-[76px] w-auto object-contain" />
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-black">{item.name}</p>
                            <p className="mt-1 text-xs text-origin-muted">Dosage: {item.dosage}</p>
                          </div>
                          <button className="text-origin-muted transition hover:text-black" onClick={() => removeItem(item.productId, item.dosage)} aria-label={`Remove ${item.name}`}>
                            <Trash2 size={17} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex h-8 items-center rounded-full border border-origin-line">
                            <button className="grid size-8 place-items-center" onClick={() => updateQuantity(item.productId, item.dosage, item.quantity - 1)} aria-label="Decrease quantity">
                              <Minus size={13} />
                            </button>
                            <span className="min-w-7 text-center text-sm font-semibold">{item.quantity}</span>
                            <button className="grid size-8 place-items-center" onClick={() => updateQuantity(item.productId, item.dosage, item.quantity + 1)} aria-label="Increase quantity">
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-black">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-origin-line px-6 py-5">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href="/cart" onClick={closeDrawer} className="grid h-11 place-items-center rounded-full border border-[#202329] text-sm font-bold text-[#202329] transition hover:bg-slate-50">
                  View cart
                </Link>
                <Link href="/checkout" onClick={closeDrawer} className="grid h-11 place-items-center rounded-full bg-[#202329] text-sm font-bold text-white transition hover:bg-[#0f1115]">
                  Checkout
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
