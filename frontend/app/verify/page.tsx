"use client";

import { hasResearcherVerification, saveResearcherVerification } from "@/components/verification/VerificationGate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResearcherVerificationPage() {
  const router = useRouter();
  const [isAdult, setIsAdult] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);
  const canEnter = isAdult && isResearcher;

  useEffect(() => {
    try {
      if (hasResearcherVerification()) {
        saveResearcherVerification();
        router.replace("/");
      }
    } catch {
      // Stay on the verification page if browser storage is unavailable.
    }
  }, [router]);

  const handleEnterSite = () => {
    if (!canEnter) {
      return;
    }

    saveResearcherVerification();
    router.replace("/");
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-[#f2f2f2] px-5 py-8 font-sans text-[#061224]">
      <section className="w-full max-w-[558px] rounded-[8px] bg-white px-9 py-12 shadow-[0_22px_80px_rgba(0,0,0,.12)] sm:px-9 md:px-9">
        <div className="mx-auto mb-12 flex justify-center">
          <span className="relative block h-[86px] w-[230px]">
            <Image
              src="/images/ChatGPT-Image-Jul-26-2026-02_19_38-AM-1-768x358.png"
              alt="Origin Peptides"
              fill
              priority
              sizes="230px"
              className="object-contain"
            />
          </span>
        </div>

        <h1 className="text-[22px] font-extrabold leading-tight tracking-[-.03em] text-[#061224]">Researcher Verification</h1>
        <p className="mt-2 text-[12px] font-medium leading-[1.65] text-[#061224] sm:text-[12.5px]">
          Origin&apos;s Restored Peptides supplies research peptides exclusively to qualified researchers and laboratories
          for in vitro and laboratory research. Please confirm before continuing..
        </p>

        <div className="mt-6 space-y-3.5">
          <label className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[6px] border border-[#d9dee8] px-4 text-[12.5px] font-medium text-[#061224] transition focus-within:border-[#2f66e8]">
            <input
              checked={isAdult}
              className="size-4 accent-[#2f66e8]"
              onChange={(event) => setIsAdult(event.target.checked)}
              type="checkbox"
            />
            <span>I am at least 18 years of age.</span>
          </label>

          <label className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[6px] border border-[#d9dee8] px-4 text-[12.5px] font-medium text-[#061224] transition focus-within:border-[#2f66e8]">
            <input
              checked={isResearcher}
              className="size-4 accent-[#2f66e8]"
              onChange={(event) => setIsResearcher(event.target.checked)}
              type="checkbox"
            />
            <span>I confirm I am a qualified researcher purchasing for laboratory research only.</span>
          </label>
        </div>

        <button
          className={[
            "mt-5 flex min-h-[50px] w-full items-center justify-center rounded-[7px] text-[13px] font-extrabold text-white transition",
            canEnter ? "bg-[#101d31] hover:bg-[#172a49] focus:outline-none focus:ring-2 focus:ring-[#2f66e8] active:scale-[.99]" : "cursor-not-allowed bg-[#8fb0f4]"
          ].join(" ")}
          disabled={!canEnter}
          onClick={handleEnterSite}
          type="button"
        >
          Enter Site <span className="ml-1" aria-hidden="true">&rarr;</span>
        </button>

        <p className="mt-5 text-[10px] font-medium leading-[1.65] text-[#526073]">
          By proceeding you affirm the statements above are true. Products are not for human or veterinary use, not for use
          in diagnostic procedures, and have not been evaluated by the U.S. Food and Drug Administration.{" "}
          <Link className="text-[#ef4444]" href="#">
            Full disclaimer
          </Link>
        </p>
      </section>
    </main>
  );
}
