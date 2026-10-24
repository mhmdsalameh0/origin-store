"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";

export function ResearcherVerification({ onVerified }: { onVerified: () => void }) {
  const [isAdult, setIsAdult] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);
  const canEnter = isAdult && isResearcher;

  const handleEnterSite = () => {
    if (canEnter) {
      onVerified();
    }
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-[#f1f1f1] px-3 py-3 font-sans text-[#071325] sm:px-6 sm:py-8">
      <section className="w-[calc(100vw-24px)] max-w-[558px] rounded-[7px] bg-white px-6 py-10 shadow-[0_18px_70px_rgba(15,23,42,.13)] sm:w-[calc(100vw-48px)] sm:px-12 sm:py-14">
        <div className="mx-auto mb-12 flex justify-center sm:mb-14">
          <span className="relative block h-[82px] w-[230px] sm:h-[94px] sm:w-[260px]">
            <Image
              src="/images/ChatGPT-Image-Jul-26-2026-02_19_38-AM-1-768x358.png"
              alt="Origin Peptides"
              fill
              priority
              sizes="(max-width: 640px) 230px, 260px"
              className="object-contain"
            />
          </span>
        </div>

        <h1 className="text-[27px] font-extrabold leading-tight tracking-[-.035em] text-[#071325] sm:text-[30px]">Researcher Verification</h1>
        <p className="mt-4 text-[15px] font-medium leading-[1.65] text-[#101827] sm:text-[16px]">
          Origin&apos;s Restored Peptides supplies research peptides exclusively to qualified researchers and laboratories
          for in vitro and laboratory research. Please confirm before continuing.
        </p>

        <div className="mt-8 space-y-4">
          <label className="flex min-h-[64px] cursor-pointer items-center gap-4 rounded-[7px] border border-[#d9dde5] px-5 text-[15px] font-medium leading-snug text-[#0b1424] transition hover:border-[#aeb7c5] focus-within:border-[#315fca] focus-within:ring-2 focus-within:ring-[#315fca]/15 sm:text-[16px]">
            <input
              checked={isAdult}
              className="peer sr-only"
              onChange={(event) => setIsAdult(event.target.checked)}
              type="checkbox"
            />
            <span className="grid size-6 shrink-0 place-items-center rounded-[7px] border-2 border-[#9299a3] bg-white text-white transition peer-checked:border-[#315fca] peer-checked:bg-[#315fca]">
              {isAdult ? <Check aria-hidden="true" size={16} strokeWidth={3} /> : null}
            </span>
            <span className="min-w-0">I am at least 18 years of age.</span>
          </label>

          <label className="flex min-h-[76px] cursor-pointer items-center gap-4 rounded-[7px] border border-[#d9dde5] px-5 text-[15px] font-medium leading-snug text-[#0b1424] transition hover:border-[#aeb7c5] focus-within:border-[#315fca] focus-within:ring-2 focus-within:ring-[#315fca]/15 sm:text-[16px]">
            <input
              checked={isResearcher}
              className="peer sr-only"
              onChange={(event) => setIsResearcher(event.target.checked)}
              type="checkbox"
            />
            <span className="grid size-6 shrink-0 place-items-center rounded-[7px] border-2 border-[#9299a3] bg-white text-white transition peer-checked:border-[#315fca] peer-checked:bg-[#315fca]">
              {isResearcher ? <Check aria-hidden="true" size={16} strokeWidth={3} /> : null}
            </span>
            <span className="min-w-0">I confirm I am a qualified researcher purchasing for laboratory research only.</span>
          </label>
        </div>

        <button
          className={[
            "mt-7 flex min-h-[66px] w-full items-center justify-center rounded-[7px] text-[16px] font-extrabold text-white transition sm:text-[17px]",
            canEnter ? "bg-[#101d31] hover:bg-[#172a49] focus:outline-none focus:ring-2 focus:ring-[#315fca] focus:ring-offset-2 active:scale-[.99]" : "cursor-not-allowed bg-[#89aceb]"
          ].join(" ")}
          disabled={!canEnter}
          onClick={handleEnterSite}
          type="button"
        >
          Enter Site <span className="ml-1" aria-hidden="true">&rarr;</span>
        </button>

        <p className="mt-7 text-[12px] font-medium leading-[1.65] text-[#5a6472] sm:text-[13px]">
          By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not for use
          in diagnostic procedures, and have not been evaluated by the U.S. Food and Drug Administration.{" "}
          <Link className="font-semibold text-[#ef4444] hover:underline" href="/disclaimer">
            Full disclaimer
          </Link>
        </p>
      </section>
    </main>
  );
}
