import Image from "next/image";
import { CheckCircle2, ClipboardList, UserCheck, Users } from "lucide-react";
import { GetStartedButton } from "@/components/auth/get-started-button";
import { ProtectedLink } from "@/components/auth/protected-link";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const stats = [
  { icon: Users, value: "10K+", label: "Happy Clients" },
  { icon: UserCheck, value: "500+", label: "Verified Dietitians" },
  { icon: ClipboardList, value: "50K+", label: "Meal Plans Created" },
];

export function HeroSection() {
  return (
    <section className="hero-fullscreen relative flex min-h-[88dvh] items-center overflow-hidden lg:min-h-[100dvh]">
      <Image
        src="/images/hero-nutrition.png"
        alt="Clinical dietitian reviewing a personalized meal plan with a client"
        fill
        priority
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-oxford-blue-500/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,27,46,0.78)_0%,rgba(0,27,46,0.5)_45%,rgba(0,27,46,0.25)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-oxford-blue-900/55 via-transparent to-oxford-blue-900/60"
        aria-hidden
      />

      <Container
        size="wide"
        className="relative flex w-full justify-center py-10 sm:py-14 lg:py-16"
      >
        <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-white/35 px-3.5 py-1.5 text-[12px] font-semibold text-white/95 [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-logo-green-300" />
            <span className="min-w-0">Trusted by 500+ Clinical Dietitians</span>
          </div>

          <h1 className="mt-4 text-[clamp(1.75rem,7vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.55)] sm:mt-6">
            Personalized Nutrition,{" "}
            <span className="text-logo-green-200">Stronger Lives</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[540px] text-[15px] leading-relaxed text-white/92 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:mt-5 sm:text-[16px]">
            The all-in-one platform for dietitians to manage clients, create
            meal plans, and deliver evidence-based nutrition care at scale.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 min-[480px]:flex-row min-[480px]:flex-wrap">
            <GetStartedButton size="lg" className="w-full min-[480px]:w-auto shadow-logo" />
            <ProtectedLink
              href="/calculator"
              className={buttonClassName(
                "secondary",
                "lg",
                "w-full min-[480px]:w-auto justify-center",
              )}
            >
              <span className="relative z-[1]">TNS Calculator</span>
            </ProtectedLink>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 text-center">
                <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 sm:mb-2 sm:h-9 sm:w-9">
                  <stat.icon className="h-3.5 w-3.5 text-logo-green-200 sm:h-4 sm:w-4" />
                </div>
                <p className="text-[15px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] sm:text-[17px]">
                  {stat.value}
                </p>
                <p className="text-[10px] leading-tight text-white/80 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] sm:text-[12px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
