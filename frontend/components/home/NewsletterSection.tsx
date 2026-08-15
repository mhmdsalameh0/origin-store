import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

export function NewsletterSection() {
  return (
    <SectionReveal className="bg-white py-12 text-origin-ink md:py-18">
      <div id="contact" className="scroll-mt-24" />
      <div className="section-shell grid gap-6 rounded-[30px] bg-origin-green p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
        <h2 className="display-type text-4xl font-bold leading-tight md:text-5xl">
          Connect with Origin Peptides
        </h2>
          <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/82">
            Subscribe to be updated with research-focused resources and product information.
          </p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            className="h-13 flex-1 rounded-sm border border-white/45 bg-white px-4 text-sm font-semibold text-origin-ink outline-none transition placeholder:text-origin-muted focus:border-white"
            placeholder="Email address"
            type="email"
          />
          <button className="group flex h-13 items-center justify-center gap-3 rounded-sm bg-origin-ink px-6 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-origin-green">
            Subscribe <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </SectionReveal>
  );
}
