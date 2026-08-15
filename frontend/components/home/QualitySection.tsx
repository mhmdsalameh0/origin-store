import { BadgeCheck, ClipboardCheck, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { SectionReveal } from "./SectionReveal";

const qualityItems = [
  {
    icon: FlaskConical,
    title: "High Purity Standards",
    copy: "Independent Testing for Every Batch",
    strip: "bg-[#e3ffd8]",
    iconBg: "bg-[#d9f8d5]",
    iconColor: "text-[#5fab5a]"
  },
  {
    icon: Truck,
    title: "Protected Delivery",
    copy: "Protection with Every Order",
    strip: "bg-[#ccecff]",
    iconBg: "bg-[#cdeaff]",
    iconColor: "text-[#267fbe]"
  },
  {
    icon: ClipboardCheck,
    title: "Batch-Specific Certificate of Analysis",
    copy: "This section is represented by a laboratory test tube icon",
    strip: "bg-[#fffba8]",
    iconBg: "bg-[#fff6a9]",
    iconColor: "text-[#b27a13]"
  }
];

export function QualitySection() {
  return (
    <SectionReveal className="relative z-10 mt-0 bg-white text-origin-ink" reveal={false}>
      <div className="grid gap-0 [column-gap:0] md:grid-cols-[50%_50%]">
        <div className="relative min-h-[330px] overflow-hidden md:min-h-[420px]">
          <Image
            src="/images/quality-tb500-22.png"
            alt="Origin TB-500 peptide vial"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative px-5 py-8 md:px-9 md:py-8 lg:px-10">
          <h2 className="text-[28px] font-extrabold leading-tight text-black md:text-[31px]">Our Commitment to Quality</h2>
          <p className="mt-4 max-w-[650px] text-[16px] leading-8 text-[#666]">
            Quality you can rely on, supported by rigorous testing and carefully reviewed to meet our established purity standards.
          </p>
        <div className="relative z-20 mt-8 grid gap-[15px] md:-ml-[64px]">
          {qualityItems.map((item) => (
            <article className="relative flex min-h-[70px] items-center gap-[18px] bg-white py-[14px] pl-[104px] pr-6 shadow-[0_6px_18px_rgba(0,0,0,.09)] transition hover:-translate-y-1 md:min-h-[72px] lg:min-h-[72px]" key={item.title}>
              <div className={`absolute bottom-0 left-0 top-0 w-[15px] ${item.strip}`} />
              <div className={`absolute left-[35px] top-1/2 grid size-[46px] -translate-y-1/2 place-items-center rounded-full ${item.iconBg} ${item.iconColor}`}>
                <item.icon size={23} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-[16px] font-extrabold leading-tight text-black">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-5 text-[#1c2a3b]">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </SectionReveal>
  );
}
