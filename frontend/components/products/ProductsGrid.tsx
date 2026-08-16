"use client";

import { CatalogProduct } from "@/lib/productCatalog";
import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const categories = ["Cellular Research", "Circadian Research", "Dermal Research", "Neuro Research", "Regenerative Research"] as const;

const sortOptions = [
  "Most Popular",
  "Name",
  "Price: Highest to Lowest",
  "Price: Lowest to Highest",
  "Oldest to Newest",
  "Newest to Oldest"
] as const;

type SortOption = (typeof sortOptions)[number];

function ProductGridCard({ product }: { product: CatalogProduct }) {
  const isRetatrutide = product.name === "Retatrutide";
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group flex h-full flex-col items-center rounded-[18px] border border-[#e2def1] bg-white/88 px-5 py-7 text-center shadow-[0_18px_48px_rgba(36,31,57,.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(36,31,57,.09)]">
      <Link className="grid h-[260px] w-full place-items-center rounded-[14px] bg-[#f5f7fb]" href={productHref}>
        <Image
          src={product.image}
          alt={`${product.name} Origin Peptides vial`}
          width={260}
          height={330}
          sizes="(max-width: 768px) 100vw, 25vw"
          className="h-full w-full object-contain object-center"
        />
      </Link>

      <div className="mt-5 grid w-full grid-rows-[3px_40px_34px_44px_48px] justify-items-center gap-y-4">
        <div className="h-[3px] w-[112px] self-start justify-self-center" style={{ backgroundColor: product.accent }} />
        <Link
          className={`flex min-h-[42px] items-start justify-center whitespace-nowrap font-sans font-bold uppercase leading-none tracking-normal text-[#111111] transition hover:text-[#202329] ${
            isRetatrutide ? "text-[18px] md:text-[20px] 2xl:text-[22px]" : "text-[22px] md:text-[23px] xl:text-[24px]"
          }`}
          href={productHref}
        >
          {product.displayName}
        </Link>
        <p className="flex min-h-10 items-start justify-center whitespace-nowrap font-sans text-[16px] font-normal normal-case leading-none tracking-normal text-[#697386]">
          {product.category}
        </p>
        <p className="self-start font-sans text-[32px] font-semibold leading-none text-[#202329]">{product.price}</p>
        <Link
          href={productHref}
          scroll
          className="flex h-12 w-full items-center justify-center gap-3 self-start rounded-[14px] bg-[linear-gradient(180deg,#262b34,#12161d)] px-5 font-sans text-[16px] font-bold normal-case tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_10px_22px_rgba(15,23,42,.16)] transition duration-300 hover:bg-[#0f1115] hover:brightness-110"
        >
          <ShoppingCart size={19} strokeWidth={2} />
          <span>View Product</span>
          <ArrowRight size={18} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

function FilterCheck({ checked }: { checked: boolean }) {
  return (
    <span
      className={`grid size-[17px] place-items-center rounded-[4px] border transition ${
        checked ? "border-[#7650d8] bg-[#7650d8] text-white" : "border-[#cdb9f6] bg-white text-transparent"
      }`}
    >
      <Check size={12} strokeWidth={3} />
    </span>
  );
}

export function ProductsGrid({ products }: { products: CatalogProduct[] }) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState<SortOption>("Most Popular");

  const visibleProducts = useMemo(() => {
    const filteredProducts =
      activeCategory === "All Products" ? products : products.filter((product) => product.category === activeCategory);

    return [...filteredProducts].sort((first, second) => {
      if (sortOption === "Name") {
        return first.displayName.localeCompare(second.displayName);
      }

      if (sortOption === "Price: Highest to Lowest") {
        return second.priceCents - first.priceCents;
      }

      if (sortOption === "Price: Lowest to Highest") {
        return first.priceCents - second.priceCents;
      }

      if (sortOption === "Oldest to Newest") {
        return new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();
      }

      if (sortOption === "Newest to Oldest") {
        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
      }

      return products.findIndex((product) => product.slug === first.slug) - products.findIndex((product) => product.slug === second.slug);
    });
  }, [products, activeCategory, sortOption]);

  return (
    <>
      <div className="my-9 flex items-center justify-between gap-6 rounded-[16px] border border-[#e2def1] bg-white/88 px-8 py-6 shadow-[0_14px_44px_rgba(36,31,57,.06)] max-md:flex-col max-md:items-stretch">
        <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3">
          <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-[#202329]">
            <input
              checked={activeCategory === "All Products"}
              className="sr-only"
              onChange={() => setActiveCategory("All Products")}
              type="checkbox"
            />
            <FilterCheck checked={activeCategory === "All Products"} />
            All Products
          </label>

          {categories.map((category) => (
            <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-[#202329]" key={category}>
              <input
                checked={activeCategory === category}
                className="sr-only"
                onChange={() => setActiveCategory(category)}
                type="checkbox"
              />
              <FilterCheck checked={activeCategory === category} />
              {category}
            </label>
          ))}
        </div>

        <label className="flex shrink-0 items-center gap-4 text-[14px] font-semibold text-[#5d6674] max-md:grid max-md:w-full max-md:gap-2">
          Sort by
          <select
            className="h-12 min-w-[260px] rounded-[10px] border border-[#d8c9f7] bg-white px-5 text-[16px] font-medium text-[#202329] outline-none transition focus:border-[#7650d8] max-md:w-full"
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            value={sortOption}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductGridCard key={product.name} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid min-h-[240px] place-items-center text-center">
          <p className="text-[16px] font-semibold text-[#5d6674]">No products found in the selected categories.</p>
        </div>
      )}
    </>
  );
}
