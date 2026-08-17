import { BadgeCheck, ClipboardCheck, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { SectionReveal } from "./SectionReveal";

const qualityItems = [
  {
    icon: FlaskConical,
    mobileIcon: ShieldCheck,
    mobileTitle: "99% Purity Guaranteed",
    mobileCopy: "Every batch verified",
    title: "High Purity Standards",
    copy: "Independent Testing for Every Batch",
    strip: "bg-[#e3ffd8]",
    iconBg: "bg-[#d9f8d5]",
    iconColor: "text-[#5fab5a]"
  },
  {
    icon: Truck,
    mobileIcon: Truck,
    mobileTitle: "Shipment Protection",
    mobileCopy: "Every order fully covered",
    title: "Protected Delivery",
    copy: "Protection with Every Order",
    strip: "bg-[#ccecff]",
    iconBg: "bg-[#cdeaff]",
    iconColor: "text-[#267fbe]"
  },
  {
    icon: ClipboardCheck,
    mobileIcon: BadgeCheck,
    mobileTitle: "CoA with Every Batch",
    mobileCopy: "Third Party tested in America",
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
        <div className="relative order-1 px-5 py-8 md:order-2 md:px-9 md:py-8 lg:px-10">
          <h2 className="text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-.03em] text-black md:text-[31px] md:tracking-normal">Our Commitment to Quality</h2>
          <p className="mt-4 max-w-[650px] text-[16px] leading-8 text-[#666]">
            Quality you can rely on, supported by rigorous testing and carefully reviewed to meet our established purity standards.
          </p>
          <div className="relative z-20 mt-8 grid gap-[15px] lg:-ml-[64px]">
            {qualityItems.map((item) => (
              <article className="relative flex min-h-[64px] items-center gap-[12px] bg-white py-[10px] pl-[68px] pr-5 shadow-[0_6px_18px_rgba(0,0,0,.09)] transition hover:-translate-y-1 sm:pl-[104px] md:min-h-[78px] md:gap-[18px] md:py-[14px] md:pl-[88px]" key={item.title}>
                <div className={`absolute bottom-0 left-0 top-0 w-[15px] ${item.strip}`} />
                <div className={`absolute left-[25px] top-1/2 grid size-[34px] -translate-y-1/2 place-items-center rounded-full sm:left-[35px] md:left-[28px] md:size-[46px] ${item.iconBg} ${item.iconColor}`}>
                  <item.mobileIcon className="md:hidden" size={18} strokeWidth={2.2} />
                  <item.icon className="hidden md:block" size={23} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-[12px] font-extrabold leading-tight text-black md:text-[16px]">
                    <span className="md:hidden">{item.mobileTitle}</span>
                    <span className="hidden md:inline">{item.title}</span>
                  </h3>
                  <p className="mt-1 text-[10px] leading-4 text-[#1c2a3b] md:text-[13px] md:leading-5">
                    <span className="md:hidden">{item.mobileCopy}</span>
                    <span className="hidden md:inline">{item.copy}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative order-2 mt-10 min-h-[330px] overflow-hidden md:order-1 md:mt-0 md:min-h-[420px]">
          <Image
            src="/images/quality-tb500-22.png"
            alt="Origin TB-500 peptide vial"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </SectionReveal>
  );
}
