import { Dna, FlaskConical, Microscope, ShieldCheck, TestTube2 } from "lucide-react";

const iconMap = {
  vials: TestTube2,
  lab: Microscope,
  quality: ShieldCheck,
  research: Dna,
  testing: FlaskConical
};

type LabImagePlaceholderProps = {
  variant?: keyof typeof iconMap;
  className?: string;
};

export function LabImagePlaceholder({ variant = "lab", className = "" }: LabImagePlaceholderProps) {
  const Icon = iconMap[variant];

  return (
    <div className={`relative overflow-hidden bg-[#eef1f7] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.78),rgba(226,233,241,.2)_42%,rgba(209,218,202,.52))]" />
      <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full bg-origin-green/18" />
      <div className="absolute -bottom-16 left-8 h-48 w-48 rounded-full bg-origin-gold/32" />
      <div className="absolute left-[12%] top-[18%] h-36 w-24 rounded-[18px] border border-white/80 bg-white/58 shadow-xl backdrop-blur-sm" />
      <div className="absolute left-[22%] top-[30%] h-28 w-20 rounded-[16px] border border-white/80 bg-white/70 shadow-xl backdrop-blur-sm" />
      <div className="absolute bottom-[18%] right-[14%] grid size-24 place-items-center rounded-full bg-white/76 text-origin-green shadow-xl">
        <Icon size={42} strokeWidth={1.8} />
      </div>
      <div className="absolute bottom-[16%] left-[14%] h-2 w-48 rounded-full bg-white/70" />
      <div className="absolute bottom-[12%] left-[14%] h-2 w-32 rounded-full bg-white/50" />
    </div>
  );
}
