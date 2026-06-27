import {
  BookOpen,
  Calculator,
  FileDown,
  MessageCircle,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Calculator,
    title: "Advanced Calculator",
    description: "Precise macro & micronutrient analysis",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Organize clients & track progress",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Planner",
    description: "Build personalized meal plans",
  },
  {
    icon: FileDown,
    title: "PDF Export",
    description: "Professional reports & handouts",
  },
  {
    icon: BookOpen,
    title: "Resources & Blog",
    description: "Evidence-based nutrition content",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description: "Connect with fellow dietitians",
  },
] as const;

type Feature = (typeof features)[number];

function FeatureItem({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div className="flex w-[10.5rem] shrink-0 flex-col items-center px-3 text-center sm:w-[11.5rem] md:w-[12.5rem]">
      <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-report bg-gradient-icon sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon className="h-5 w-5 text-logo-green-600" strokeWidth={1.5} />
      </div>
      <p className="text-[13px] font-semibold leading-snug text-oxford-blue-500">
        {feature.title}
      </p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-oxford-blue-300">
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesIconBar() {
  const marqueeItems = [...features, ...features];

  return (
    <section
      className="border-y border-report-divider bg-gradient-section-clinical py-12 lg:py-14"
      aria-label="Platform features"
    >
      <div
        className={cn(
          "features-marquee relative overflow-hidden",
          "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        )}
      >
        <div className="features-marquee-track flex w-max items-start gap-10 md:gap-12">
          {marqueeItems.map((feature, index) => (
            <FeatureItem key={`${feature.title}-${index}`} feature={feature} />
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {features.map((feature) => (
          <li key={feature.title}>
            {feature.title}: {feature.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
