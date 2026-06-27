import {
  ArrowRight,
  BarChart3,
  Calculator,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { ProtectedLink } from "@/components/auth/protected-link";
import { isProtectedPath } from "@/config/routes";
import {
  LandingCard,
  LandingSection,
  LandingSectionHeader,
} from "./landing-section";

const features = [
  {
    icon: Calculator,
    title: "Advanced Nutrition Calculator",
    description:
      "Calculate precise macro and micronutrient needs with evidence-based clinical equations.",
    href: "/calculator",
  },
  {
    icon: UtensilsCrossed,
    title: "Personalized Meal Planner",
    description:
      "Create custom meal plans tailored to each client's goals, preferences, and restrictions.",
    href: "/contact",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor client outcomes with visual dashboards and automated nutrition reports.",
    href: "/calculator",
  },
  {
    icon: MessageCircle,
    title: "Community & Messaging",
    description:
      "Connect with clients and fellow dietitians through integrated messaging and forums.",
    href: "/contact",
  },
];

function FeatureLink({ href, label }: { href: string; label: string }) {
  const className =
    "mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-logo-green-600 transition-colors hover:text-un-blue-600";

  if (isProtectedPath(href)) {
    return (
      <ProtectedLink href={href} className={className}>
        {label}
        <ArrowRight className="h-3.5 w-3.5" />
      </ProtectedLink>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

export function FeatureCardsSection() {
  return (
    <LandingSection tone="plain" id="platform-tools">
      <LandingSectionHeader
        eyebrow="Core Platform Tools"
        title={
          <>
            Built for Clinical{" "}
            <span className="text-accent-gradient">Nutrition Workflows</span>
          </>
        }
        description="Everything you need to assess, plan, and monitor — in one professional workspace designed for dietitians."
        align="center"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <LandingCard key={feature.title} className="flex h-full flex-col p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-report bg-gradient-icon">
              <feature.icon className="h-5 w-5 text-logo-green-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-oxford-blue-500">
              {feature.title}
            </h3>
            <p className="text-body-sm mt-2 flex-1 leading-relaxed">{feature.description}</p>
            <FeatureLink href={feature.href} label="Learn more" />
          </LandingCard>
        ))}
      </div>
    </LandingSection>
  );
}
