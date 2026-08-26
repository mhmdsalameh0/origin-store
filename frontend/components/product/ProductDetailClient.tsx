"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CatalogProduct, formatPrice } from "@/lib/productCatalog";
import { CheckCircle2, Minus, Plus, RotateCcw, ShieldCheck, Truck, X, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = ["Description", "Additional Information", "COA", "Reviews"] as const;

const detailImages: Record<string, string> = {
  "ghk-cu": "/images/showcase-ghk-cu-clean.png",
  "mots-c": "/images/showcase-mots-c-clean.png",
  "tb-500": "/images/showcase-tb-500-clean.png",
  retatrutide: "/images/showcase-retatrutide-transparent.png"
};

export function ProductDetailClient({ product }: { product: CatalogProduct }) {
  const { addItem, openDrawer } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dosageGroupRef = useRef<HTMLDivElement>(null);
  const modalOkRef = useRef<HTMLButtonElement>(null);
  const [selectedDosage, setSelectedDosage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(() => (searchParams.get("tab") === "coa" ? "COA" : "Description"));
  const [showOptionModal, setShowOptionModal] = useState(false);
  const detailImage = detailImages[product.slug] ?? product.image;

  useEffect(() => {
    if (searchParams.get("tab") === "coa") {
      setActiveTab("COA");
    }
  }, [searchParams]);

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

  const fulfillmentRows = [
    { icon: CheckCircle2, title: "Order confirmation", copy: "Our support team reviews each submitted order." },
    { icon: Truck, title: "Tracked delivery", copy: "Free standard shipping on qualifying orders." },
    { icon: ShieldCheck, title: "Free shipment protection", copy: "Lost, stolen, or damaged claims are reviewed by support." },
    { icon: Zap, title: "Overnight and 2-day options", copy: "Pick your speed at checkout when available." }
  ];

  return (
    <>
      <main className="bg-white pt-[83px] font-sans text-origin-ink">
        <section className="mx-auto grid max-w-[1320px] gap-5 px-5 py-10 md:grid-cols-[1fr_1.08fr] md:px-8 md:py-14">
          <div className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[12px] border border-[#e1e3e8] bg-[#fbfbfc] p-6 md:min-h-[640px]">
            <div className="pointer-events-none absolute inset-x-[13%] bottom-[14%] h-[210px] rounded-full bg-[#dff8e8] blur-3xl" />
            <div className="relative aspect-[1122/1235] w-[min(390px,82vw)] overflow-hidden md:w-[min(520px,88%)]">
              <Image
                src={detailImage}
                alt={`${product.name} product`}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#dfe7f0] bg-white px-2.5 py-1 text-[8px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#526074]">
                <span className="size-[4px] rounded-full bg-origin-green" />
                8x Tested
              </span>
              <span className="rounded-full border border-[#dfe7f0] bg-white px-2.5 py-1 text-[8px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#526074]">99%+ Purity</span>
              <span className="rounded-full border border-[#dfe7f0] bg-white px-2.5 py-1 text-[8px] font-extrabold uppercase leading-none tracking-[0.12em] text-[#526074]">Research Use Only</span>
            </div>
          </div>

          <div className="rounded-[12px] border border-[#e1e3e8] bg-white p-6 md:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#697386]">{product.category}</p>
            <h1 className="mt-2 text-[38px] font-extrabold leading-none tracking-normal text-black md:text-[46px]">{product.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#e1e6ee] bg-white px-3 py-1 text-[11px] font-bold text-[#697386]">Peptide</span>
              <span className="rounded-full border border-[#e1e6ee] bg-white px-3 py-1 text-[11px] font-bold text-[#697386]">{product.dose}</span>
              <span className="rounded-full border border-[#e1e6ee] bg-white px-3 py-1 text-[11px] font-bold text-[#697386]">{product.sku}</span>
            </div>
            <p className="mt-6 border-b border-[#e8ebf0] pb-6 text-[14px] font-medium leading-[1.7] text-[#5d6674]">{product.description}</p>

            <div className="mt-7 grid gap-4">
              <div className="grid grid-cols-[72px_1fr_auto] items-center gap-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#697386]">Mass</p>
                <div
                  ref={dosageGroupRef}
                  tabIndex={-1}
                  className="flex flex-wrap gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#202329]"
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
                        className={`h-10 rounded-[8px] border px-5 text-[13px] font-extrabold transition ${
                          selected ? "border-black bg-black text-white" : "border-[#d8dde6] text-[#202329] hover:border-[#202329]"
                        }`}
                      >
                        {option.replace(/\s+/g, "")}
                      </button>
                    );
                  })}
                </div>
                <p className="text-right text-[24px] font-extrabold leading-none text-[#202329]">{product.price}</p>
              </div>

              <div className="grid grid-cols-[72px_1fr] items-center gap-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#697386]">Quantity</p>
                <div className="flex h-10 w-fit items-center rounded-full border border-origin-line" aria-label="Quantity selector">
                  <button className="grid size-10 place-items-center" type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
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
                  <button className="grid size-10 place-items-center" type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[56px_1fr] gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("COA")}
                className="h-11 rounded-full border border-[#d8dde6] bg-white text-[12px] font-bold text-[#202329] transition hover:border-[#202329] hover:bg-slate-50"
              >
                COA
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-11 rounded-full bg-black px-9 text-[13px] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_8px_18px_rgba(15,23,42,.14)] transition-colors hover:bg-[#202329]"
              >
                Add to cart {formatPrice(product.priceCents * quantity)}
              </button>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-3 h-11 w-full rounded-full border border-black text-[13px] font-extrabold text-black transition hover:bg-slate-50"
            >
              Checkout
            </button>

            <div className="mt-5 overflow-hidden rounded-[12px] border border-[#dfe9df]">
              {fulfillmentRows.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div className={`grid grid-cols-[22px_1fr] gap-3 border-b border-[#e8ebf0] px-4 py-3 last:border-b-0 ${index === 0 ? "bg-[#f0fbef]" : "bg-[#fbfbfc]"}`} key={item.title}>
                    <Icon className="mt-0.5 text-origin-green" size={15} strokeWidth={2.2} />
                    <div>
                      <p className="text-[12px] font-extrabold text-[#202329]">{item.title}</p>
                      <p className="mt-0.5 text-[11px] font-medium leading-snug text-[#697386]">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#697386]">
              <RotateCcw size={12} />
              Secure research checkout
            </p>
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
              {activeTab === "COA" ? (
                <div className="grid gap-5 rounded-[14px] border border-[#e6e1f2] bg-[#fbfaff] p-5">
                  <div>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#7650d8]">Certificate of Analysis</p>
                    <h2 className="mt-2 text-[24px] font-extrabold leading-tight text-black">{product.displayName}</h2>
                  </div>
                  <dl className="grid gap-3 text-[14px] sm:grid-cols-[160px_1fr]">
                    <dt className="font-bold text-black">Status</dt>
                    <dd>Documentation available for review</dd>
                    <dt className="font-bold text-black">Purity</dt>
                    <dd>{product.additionalInformation.Purity ?? "99%+"}</dd>
                    <dt className="font-bold text-black">Category</dt>
                    <dd>{product.category}</dd>
                    <dt className="font-bold text-black">SKU</dt>
                    <dd>{product.sku}</dd>
                    <dt className="font-bold text-black">Use</dt>
                    <dd>For laboratory research use only</dd>
                  </dl>
                  <Link
                    href="/documentation"
                    className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-[#202329] px-6 text-[13px] font-bold text-white transition hover:bg-[#0f1115]"
                  >
                    View COA
                  </Link>
                </div>
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
