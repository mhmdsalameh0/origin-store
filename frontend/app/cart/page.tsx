"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { formatPrice } from "@/lib/productCatalog";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();

  return (
    <>
      <Header />
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 border-b border-origin-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-origin-muted">Origin Peptides</p>
              <h1 className="mt-2 text-[42px] font-bold leading-none text-black md:text-[64px]">Cart</h1>
            </div>
            <Link href="/products" className="text-sm font-bold text-[#202329] transition hover:text-origin-green">
              Continue shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="grid min-h-[360px] place-items-center text-center">
              <div>
                <h2 className="text-2xl font-bold text-black">Your cart is empty.</h2>
                <p className="mt-3 text-origin-muted">Select a product dosage to begin checkout.</p>
                <Link href="/products" className="mt-7 inline-grid h-12 place-items-center rounded-full bg-[#202329] px-8 text-sm font-bold text-white transition hover:bg-[#0f1115]">
                  View products
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 py-10 lg:grid-cols-[1fr_360px]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-origin-line text-xs font-bold uppercase tracking-[0.18em] text-origin-muted">
                      <th className="py-4">Product</th>
                      <th className="py-4">Price</th>
                      <th className="py-4">Quantity</th>
                      <th className="py-4 text-right">Total</th>
                      <th className="py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={`${item.productId}-${item.dosage}`} className="border-b border-origin-line">
                        <td className="py-5">
                          <div className="flex items-center gap-4">
                            <div className="grid h-24 w-20 place-items-center rounded bg-[#f5f7fb]">
                              <Image src={item.image} alt="" width={58} height={82} className="h-20 w-auto object-contain" />
                            </div>
                            <div>
                              <Link href={`/products/${item.slug}`} className="font-bold text-black transition hover:text-origin-green">
                                {item.name}
                              </Link>
                              <p className="mt-1 text-sm text-origin-muted">Dosage: {item.dosage}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 font-semibold">{formatPrice(item.price)}</td>
                        <td className="py-5">
                          <div className="flex h-10 w-fit items-center rounded-full border border-origin-line">
                            <button className="grid size-10 place-items-center" onClick={() => updateQuantity(item.productId, item.dosage, item.quantity - 1)} aria-label="Decrease quantity">
                              <Minus size={14} />
                            </button>
                            <input
                              className="h-9 w-12 border-0 bg-transparent text-center text-sm font-bold outline-none"
                              min={1}
                              type="number"
                              value={item.quantity}
                              onChange={(event) => updateQuantity(item.productId, item.dosage, Number(event.target.value) || 1)}
                              aria-label={`Quantity for ${item.name}`}
                            />
                            <button className="grid size-10 place-items-center" onClick={() => updateQuantity(item.productId, item.dosage, item.quantity + 1)} aria-label="Increase quantity">
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-5 text-right font-bold">{formatPrice(item.price * item.quantity)}</td>
                        <td className="py-5 text-right">
                          <button className="text-origin-muted transition hover:text-black" onClick={() => removeItem(item.productId, item.dosage)} aria-label={`Remove ${item.name}`}>
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <aside className="h-fit rounded-[8px] border border-origin-line p-6 shadow-[0_16px_45px_rgba(29,36,25,.06)]">
                <h2 className="text-2xl font-bold text-black">Cart totals</h2>
                <div className="mt-6 flex items-center justify-between border-b border-origin-line pb-4 text-lg font-bold">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout" className="mt-6 grid h-12 place-items-center rounded-full bg-[#202329] text-sm font-bold text-white transition hover:bg-[#0f1115]">
                  Checkout
                </Link>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
