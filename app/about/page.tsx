import type { Metadata } from "next";
import { FounderSection, TeamSection } from "@/components/about";
import { founder } from "@/config/founder";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} and founder ${founder.name} — building evidence-based nutrition tools for dietitians worldwide.`,
};

export default function AboutPage() {
  return (
    <div className="landing-page bg-ghost-white-100">
      <FounderSection />
      <TeamSection />
    </div>
  );
}
