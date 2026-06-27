import {
  ArticlesSection,
  BottomCtaSection,
  FaqSection,
  FeatureCardsSection,
  FeaturesIconBar,
  HeroSection,
  TestimonialsSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="landing-page bg-ghost-white-100">
      <HeroSection />
      <FeaturesIconBar />
      <FeatureCardsSection />
      <ArticlesSection />
      <TestimonialsSection />
      <FaqSection />
      <BottomCtaSection />
    </div>
  );
}
