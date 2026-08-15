import { LabImagePlaceholder } from "./LabImagePlaceholder";
import { SectionReveal } from "./SectionReveal";

export function StackIntro() {
  return (
    <SectionReveal className="relative overflow-hidden bg-white py-16 text-origin-ink md:py-24">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <LabImagePlaceholder variant="research" className="min-h-[420px] rounded-[28px]" />
          <div className="py-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-origin-green">Origin&apos;s Restored Peptides</p>
            <h2 className="display-type mt-4 max-w-xl text-4xl font-bold leading-tight md:text-6xl">
              Reliable research solutions reviewed for purity and care.
            </h2>
            <p className="mt-6 max-w-lg text-base font-semibold leading-8 text-origin-muted">
              This Home page mirrors the reference structure with original placeholder wording and original lab-style visuals.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["99%+", "3rd Party", "Secure"].map((label) => (
                <div className="rounded-2xl border border-origin-line bg-white p-5 text-center" key={label}>
                  <strong className="display-type text-3xl">{label}</strong>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-origin-muted">Quality signal</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
