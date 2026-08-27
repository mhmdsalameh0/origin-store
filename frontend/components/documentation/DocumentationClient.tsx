"use client";

import { CoaReport, coaReports, documentationCards, vanguardLab } from "@/lib/coaReports";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CoaDocument({ report }: { report: CoaReport }) {
  return (
    <div className="mx-auto flex min-h-[min(980px,calc(100vh-48px))] w-full max-w-[760px] flex-col bg-white px-5 py-8 text-black shadow-[0_18px_60px_rgba(0,0,0,.35)] sm:min-h-[min(1120px,calc(100vh-96px))] sm:px-12 sm:py-9">
      <div className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          <div className="text-[36px] font-black leading-none text-[#07585c] sm:text-[42px]">V</div>
          <p className="mt-1 text-[7px] font-extrabold uppercase tracking-[0.22em] text-[#07585c] sm:text-[8px]">Vanguard</p>
        </div>
        <div className="text-right text-[7px] font-semibold leading-tight sm:text-[8px]">
          <p>{vanguardLab.name}</p>
          <p>{vanguardLab.address}</p>
          <p>{vanguardLab.cityStateZip}</p>
          <p>{vanguardLab.phone}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_1.6fr_1fr] sm:gap-3">
        <div className="order-2 text-[8px] font-semibold leading-tight sm:order-none sm:pt-7">
          <p className="font-extrabold">Report To:</p>
          <p>{report.reportTo}</p>
        </div>
        <div className="order-1 text-center sm:order-none">
          <h2 className="text-[24px] font-extrabold leading-tight sm:text-[18px]">{report.title}</h2>
          <p className="text-[11px] font-extrabold leading-tight">{report.subtitle}</p>
          <dl className="mx-auto mt-4 grid max-w-[250px] grid-cols-[96px_minmax(0,1fr)] text-left text-[8px] font-semibold leading-tight">
            {Object.entries(report.details).map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="font-extrabold">{label}:</dt>
                <dd className="break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hidden sm:block" />
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <p className="mb-3 text-center text-[8px] italic text-[#5b6470]">{report.note}</p>
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse text-center text-[6px] leading-tight min-[390px]:text-[7px] sm:text-[8px]">
            <colgroup>
              <col className="w-[34%]" />
              <col className="w-[26%]" />
              <col className="w-[13.33%]" />
              <col className="w-[13.33%]" />
              <col className="w-[13.34%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#eef0f2]">
                <th className="border border-[#8d9299] px-1 py-1 font-extrabold sm:px-2">Analysis</th>
                <th className="border border-[#8d9299] px-1 py-1 font-extrabold sm:px-2">Method</th>
                <th className="border border-[#8d9299] px-1 py-1 font-extrabold sm:px-2" colSpan={report.results[0]?.result.length ?? 1}>
                  Result (per Vial)
                </th>
              </tr>
            </thead>
            <tbody>
              {report.results.map((row) => (
                <tr key={row.analysis}>
                  <td className="border border-[#8d9299] px-1 py-1 font-semibold sm:px-2">{row.analysis}</td>
                  <td className="border border-[#8d9299] px-1 py-1 font-semibold sm:px-2">{row.method}</td>
                  {row.result.map((value, index) => (
                    <td className="break-words border border-[#8d9299] px-1 py-1 font-semibold sm:px-2" key={`${row.analysis}-${index}`}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-28 grid w-full max-w-[330px] gap-4 text-[8px] font-semibold leading-tight sm:mt-44">
          {report.footer.map((line) => (
            <p className="border-t border-black pt-1" key={line}>
              {line}
            </p>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[520px] text-center text-[7px] font-medium leading-snug text-[#5b6470] sm:mt-12">
          Please consult A2LA Certificate #8377.01 for a list of accredited tests. Samples were received in acceptable
          condition. The results in this report relate only to the portion of the sample(s) tested. All analyses were
          performed consistent with the Vanguard Laboratory Quality Management System. Vanguard Laboratory and its staff
          do not observe or participate in the sample selection process and cannot confirm the authenticity of the sample
          or its representativeness of the associated lot/batch.
        </p>
        <div className="mt-3 text-center text-[7px] font-medium leading-tight text-[#5b6470]">
          <p>vanguardlaboratory.com</p>
          <p>testing@vanguardlaboratory.com</p>
        </div>
      </div>
    </div>
  );
}

export function DocumentationClient() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const selectedReport = selectedSlug ? coaReports[selectedSlug] : null;

  useEffect(() => {
    if (!selectedReport) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSlug(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReport]);

  return (
    <>
      <div className="mx-auto mt-8 grid max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documentationCards.map((document) => (
          <article
            className="relative min-h-[310px] border border-[#5f35b2] bg-white px-10 pb-10 pt-20 shadow-[0_8px_20px_rgba(15,23,42,.08)]"
            key={document.name}
          >
            <span className="absolute left-0 top-0 bg-[#7650d8] px-2 py-1 text-[8px] font-extrabold text-white">Available</span>
            <h2 className="text-[14px] font-extrabold leading-tight text-black">{document.name}</h2>
            <p className="mt-4 text-[11px] font-medium leading-tight text-[#536174]">{document.subtitle}</p>
            <p className="mt-2 text-[11px] font-medium leading-[1.55] text-[#536174]">{document.copy}</p>
            <button
              className="mt-5 h-10 w-[136px] bg-black text-[10px] font-extrabold text-white transition hover:bg-[#202329] focus:outline-none focus:ring-2 focus:ring-[#7650d8] focus:ring-offset-2"
              onClick={() => setSelectedSlug(document.slug)}
              type="button"
            >
              VIEW COA
            </button>
          </article>
        ))}
      </div>

      {selectedReport ? (
        <div className="fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden bg-black/80 px-3 py-6 sm:px-4 sm:py-8" role="dialog" aria-modal="true" aria-label={selectedReport.subtitle}>
          <button
            ref={closeButtonRef}
            className="fixed right-4 top-4 z-[91] grid size-10 place-items-center rounded-full bg-white text-black shadow-lg transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#7650d8]"
            onClick={() => setSelectedSlug(null)}
            type="button"
            aria-label="Close COA"
          >
            <X size={20} />
          </button>
          <CoaDocument report={selectedReport} />
        </div>
      ) : null}
    </>
  );
}
