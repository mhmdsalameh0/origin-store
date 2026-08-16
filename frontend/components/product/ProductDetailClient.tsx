"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CatalogProduct } from "@/lib/productCatalog";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = ["Description", "Additional Information", "Reviews"] as const;

export function ProductDetailClient({ product }: { product: CatalogProduct }) {
  const { addItem, openDrawer } = useCart();
  const router = useRouter();
  const dosageGroupRef = useRef<HTMLDivElement>(null);
  const modalOkRef = useRef<HTMLButtonElement>(null);
  const [selectedDosage, setSelectedDosage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");
  const [showOptionModal, setShowOptionModal] = useState(false);

  useEffect(() => {
    if (!showOptionModal) {
      return;
    }

    modalOkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOptionModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showOptionModal]);

  const closeOptionModal = () => {
    setShowOptionModal(false);
    window.setTimeout(() => dosageGroupRef.current?.focus(), 0);
  };

  const validateDosage = () => {
    if (selectedDosage) {
      return true;
    }

    setShowOptionModal(true);
    return false;
  };

  const addCurrentProduct = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.displayName,
      image: product.image,
      dosage: selectedDosage,
      price: product.priceCents,
      quantity
    });
  };

  const handleAddToCart = () => {
    if (!validateDosage()) {
      return;
    }

    addCurrentProduct();
    openDrawer();
  };

  const handleCheckout = () => {
    if (!validateDosage()) {
      return;
    }

    addCurrentProduct();
    router.push("/checkout");
  };

  return (
    <>
      <main className="bg-white font-sans text-origin-ink">
        <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-start md:px-8 md:py-24">
          <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-[8px] bg-[#f5f7fb] p-5 md:min-h-[560px]">
            <div className="relative h-[min(500px,72vw)] w-full max-w-[560px]">
              <Image
                src={product.image}
                alt={`${product.name} product`}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <nav className="text-sm font-semibold text-[#5d6674]" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="transition hover:text-black">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">{product.displayName}</span>
            </nav>

            <div className="mt-8 h-[3px] w-[112px]" style={{ backgroundColor: product.accent }} />
            <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.45em] text-[#5d6674]">{product.category}</p>
            <h1 className="mt-4 text-[42px] font-bold leading-[1.05] text-black md:text-[64px]">{product.displayName}</h1>
            <p className="mt-6 text-[32px] font-semibold leading-none text-[#29313c]">{product.price}</p>

            <div className="mt-9">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#111111]">Dosage</p>
              <div
                ref={dosageGroupRef}
                tabIndex={-1}
                className="mt-4 flex flex-wrap gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#202329]"
                role="radiogroup"
                aria-label="Required dosage selection"
                aria-required="true"
              >
                {product.dosageOptions.map((option) => {
                  const selected = selectedDosage === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedDosage(option)}
                      className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                        selected ? "border-[#202329] bg-[#202329] text-white" : "border-[#d8dde6] text-[#202329] hover:border-[#202329]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex h-11 items-center rounded-full border border-origin-line" aria-label="Quantity selector">
                <button className="grid size-11 place-items-center" type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                  <Minus size={15} />
                </button>
                <input
                  className="h-10 w-12 border-0 bg-transparent text-center text-sm font-bold outline-none"
                  min={1}
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                  aria-label="Quantity"
                />
                <button className="grid size-11 place-items-center" type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="h-12 rounded-full bg-[#202329] px-9 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_8px_18px_rgba(15,23,42,.14)] transition-colors hover:bg-[#0f1115]"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="h-12 rounded-full border border-[#202329] px-9 text-sm font-bold text-[#202329] transition hover:bg-slate-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-8 grid gap-2 text-sm leading-6 text-[#5d6674]">
              <p className="font-semibold text-[#202329]">Warning: For research use only. Not for human consumption.</p>
              <p>
                <span className="font-semibold text-[#202329]">SKU:</span> {selectedDosage ? `${product.sku}-${selectedDosage.replace(/\s+/g, "")}` : product.sku}
              </p>
              <p>
                <span className="font-semibold text-[#202329]">Category:</span> {product.category}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="border-t border-origin-line">
            <div className="flex flex-wrap gap-2 pt-7" role="tablist" aria-label="Product information">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    activeTab === tab ? "bg-[#202329] text-white" : "bg-[#f5f7fb] text-[#202329] hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-8 max-w-3xl text-base leading-8 text-[#5d6674]" role="tabpanel">
              {activeTab === "Description" ? <p>{product.description}</p> : null}
              {activeTab === "Additional Information" ? (
                <dl className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  {Object.entries(product.additionalInformation).map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt className="font-bold text-black">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {activeTab === "Reviews" ? <p>There are no reviews yet. Reviews can be enabled when the live commerce backend is connected.</p> : null}
            </div>
          </div>
        </section>
      </main>

      {showOptionModal ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/35 px-5" role="presentation">
          <div
            className="w-full max-w-md rounded-[8px] bg-white p-6 text-center font-sans shadow-[0_24px_80px_rgba(15,23,42,.24)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-option-modal-title"
            aria-describedby="product-option-modal-message"
          >
            <div className="flex justify-end">
              <button className="grid size-8 place-items-center rounded-full hover:bg-slate-100" onClick={closeOptionModal} aria-label="Close option warning">
                <X size={18} />
              </button>
            </div>
            <h2 id="product-option-modal-title" className="sr-only">
              Product options required
            </h2>
            <p id="product-option-modal-message" className="mt-2 text-base font-semibold leading-7 text-[#202329]">
              Please select some product options before adding this product to your cart.
            </p>
            <button ref={modalOkRef} type="button" onClick={closeOptionModal} className="mt-6 h-11 rounded-full bg-[#202329] px-10 text-sm font-bold text-white transition hover:bg-[#0f1115]">
              OK
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
