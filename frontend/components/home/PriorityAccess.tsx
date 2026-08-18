import Link from "next/link";
import { Atom, FlaskConical, Microscope, Search, Timer, Truck } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const resourceCards = [
  {
    title: "Research Starts with Quality",
    copy: "Explore research resources, scientific insights, and product information from Origin Peptides to support informed laboratory research.",
    icon: FlaskConical,
    action: { label: "Shop", href: "/products" },
    className: "md:col-span-1"
  },
  {
    title: "Superior Standards with Fair Value",
    copy: "Origin's Restored Peptides delivers premium research peptides with a focus on quality, transparency, and reliability-providing trusted products for researchers and laboratories with confidence.",
    icon: Microscope,
    action: { label: "Shop", href: "/products" },
    className: "md:col-span-1"
  },
  {
    title: "Support You Can Count On",
    icon: Search,
    action: { label: "Contact", href: "/contact" },
    className: "md:col-span-1 lg:col-span-1"
  },
  {
    title: "Reliable Research Information, Always",
    copy: "Discover research-focused articles, scientific insights, and educational resources designed to support informed laboratory research.",
    icon: Atom,
    action: { label: "Contact", href: "/#contact" },
    className: "md:row-span-2"
  },
  {
    title: "Supporting Research Across Canada",
    icon: Timer,
    action: { label: "Contact", href: "/contact" },
    className: "md:col-span-1 lg:col-span-1"
  },
  {
    title: "Connect with Origin Peptides",
    copy: "Connect with Origin's Restored Peptides to explore trusted research resources, educational insights, and reliable information designed to support informed research and scientific discovery.",
    icon: Truck,
    action: { label: "Shop & Join Community", href: "/#contact" },
    className: "md:col-span-2"
  }
];

export function PriorityAccess() {
  return (
    <SectionReveal className="bg-[#e9fbe5] py-10 text-origin-ink md:py-12">
      <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8">
        {resourceCards.map((card) => (
          <article
            className={`relative min-h-[132px] overflow-hidden rounded-[8px] bg-white p-7 shadow-[0_10px_30px_rgba(29,36,25,.04)] ${card.className}`}
            key={card.title}
          >
            <div className="relative z-10 max-w-[560px]">
              <h2 className="text-xl font-bold leading-tight text-black">{card.title}</h2>
              {card.copy ? <p className="mt-6 max-w-lg text-[15px] font-normal leading-7 text-[#263242]">{card.copy}</p> : null}
              {card.action ? (
                <Link
                  href={card.action.href}
                  className="mt-7 inline-grid min-h-11 place-items-center rounded-full border border-[#111722] px-7 text-[15px] font-semibold text-black transition hover:bg-[#111722] hover:text-white"
                >
                  {card.action.label}
                </Link>
              ) : null}
            </div>
            <card.icon
              aria-hidden="true"
              className="absolute bottom-6 right-8 text-[#0f172a]/20"
              size={card.title === "Connect with Origin Peptides" ? 84 : 68}
              strokeWidth={1.45}
            />
          </article>
        ))}
      </div>
    </SectionReveal>
  );
}
