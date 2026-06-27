import dynamic from "next/dynamic";
import {
  BottomCtaSection,
  FeaturesIconBar,
  HeroSection,
} from "@/components/landing";

const ArticlesSection = dynamic(() =>
  import("@/components/landing/articles-section").then((m) => ({
    default: m.ArticlesSection,
  })),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/landing/testimonials-section").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const FaqSection = dynamic(() =>
  import("@/components/landing/faq-section").then((m) => ({
    default: m.FaqSection,
  })),
);

export default function Home() {
  return (
    <div className="landing-page bg-ghost-white-100">
      <HeroSection />
      <FeaturesIconBar />
      <ArticlesSection />
      <TestimonialsSection />
      <FaqSection />
      <BottomCtaSection />
    </div>
  );
}
