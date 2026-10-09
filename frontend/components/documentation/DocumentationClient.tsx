"use client";

import { CoaDocument, documentationCards } from "@/lib/coaReports";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function DocumentationClient() {
  const [selectedDocument, setSelectedDocument] = useState<CoaDocument | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedDocument?.pdfPath) {
      return;
    }

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedDocument(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDocument]);

  return (
    <>
      <div className="mx-auto mt-8 grid max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documentationCards.map((document) => {
          const isAvailable = Boolean(document.pdfPath);

          return (
            <article
              className="relative flex min-h-[310px] flex-col border border-[#5f35b2] bg-white px-10 pb-10 pt-20 shadow-[0_8px_20px_rgba(15,23,42,.08)]"
              key={document.slug}
            >
              <span
                className={`absolute left-0 top-0 px-2 py-1 text-[8px] font-extrabold text-white ${
                  isAvailable ? "bg-[#7650d8]" : "bg-[#697386]"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
              <h2 className="text-[14px] font-extrabold leading-tight text-black">{document.name}</h2>
              <p className="mt-4 text-[11px] font-medium leading-tight text-[#536174]">{document.subtitle}</p>
              <p className="mt-2 text-[11px] font-medium leading-[1.55] text-[#536174]">{document.copy}</p>
              <button
                className="mt-auto h-10 w-[136px] bg-black text-[10px] font-extrabold text-white transition hover:bg-[#202329] focus:outline-none focus:ring-2 focus:ring-[#7650d8] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#a2a8b0]"
                disabled={!isAvailable}
                onClick={() => setSelectedDocument(document)}
                type="button"
              >
                {isAvailable ? "VIEW COA" : "NOT AVAILABLE"}
              </button>
            </article>
          );
        })}
      </div>

      {selectedDocument?.pdfPath ? (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-black/85 px-3 py-4 sm:px-6 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedDocument.subtitle} Certificate of Analysis`}
        >
          <div className="mx-auto mb-3 flex w-full max-w-[1100px] items-center justify-between gap-4 text-white">
            <h2 className="text-sm font-extrabold sm:text-base">{selectedDocument.name} — Certificate of Analysis</h2>
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-extrabold text-black transition hover:bg-slate-100"
                href={selectedDocument.pdfPath}
                rel="noreferrer"
                target="_blank"
              >
                OPEN PDF
                <ExternalLink size={14} />
              </a>
              <button
                ref={closeButtonRef}
                className="grid size-10 place-items-center rounded-full bg-white text-black transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#7650d8]"
                onClick={() => setSelectedDocument(null)}
                type="button"
                aria-label="Close COA"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="mx-auto min-h-0 w-full max-w-[1100px] flex-1 overflow-hidden rounded-md bg-white shadow-[0_18px_60px_rgba(0,0,0,.45)]">
            <iframe
              className="h-full min-h-[70vh] w-full border-0"
              src={`${selectedDocument.pdfPath}#view=FitH`}
              title={`${selectedDocument.subtitle} Certificate of Analysis PDF`}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
