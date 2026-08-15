import { FAQSection } from "./FAQSection";
import { Hero } from "./Hero";
import { MissionSection } from "./MissionSection";
import { PriorityAccess } from "./PriorityAccess";
import { ProductBenefits } from "./ProductBenefits";
import { ProductShowcase } from "./ProductShowcase";
import { QualitySection } from "./QualitySection";

export function HomePage() {
  return (
    <main>
      <Hero />
      <QualitySection />
      <ProductShowcase />
      <PriorityAccess />
      <ProductBenefits variant="dark" />
      <MissionSection />
      <ProductBenefits variant="light" />
      <FAQSection />
    </main>
  );
}
