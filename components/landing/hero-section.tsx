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
    <section className="hero-fullscreen bg-gradient-hero relative flex min-h-0 overflow-hidden lg:min-h-[100dvh] lg:items-center">
      <div className="hero-grid-pattern pointer-events-none absolute inset-0" />

      <Container size="wide" className="relative w-full py-6 sm:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-1 mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:order-2 lg:max-w-none lg:justify-self-end">
            <div className="absolute -right-4 top-4 h-40 w-40 rounded-full bg-logo-green-100/50 blur-2xl sm:-right-6 sm:h-56 sm:w-56" />
            <div className="absolute -left-4 bottom-8 h-24 w-24 rounded-full bg-un-blue-100/60 blur-xl sm:h-32 sm:w-32" />

            <div className="relative">
              <div className="bg-gradient-logo-ring shadow-logo absolute -inset-1 rounded-full" />

              <div className="relative aspect-square overflow-hidden rounded-full border-[4px] border-ghost-white-50 bg-ghost-white-50 sm:border-[5px]">
                <Image
                  src="/images/hero-bowl.jpg"
                  alt="Healthy nutrition bowl with fresh vegetables"
                  fill
                  quality={95}
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 480px"
                />
              </div>

              <div className="border-clinical shadow-logo absolute -bottom-2 left-0 rounded-xl border bg-ghost-white-50/95 px-2.5 py-2 backdrop-blur-sm sm:-bottom-4 sm:-left-6 sm:px-4 sm:py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-logo-green-600 sm:text-[11px]">
                  Client Progress
                </p>
                <p className="mt-0.5 text-[18px] font-bold text-oxford-blue-500 sm:text-[22px]">
                  +24%
                  <span className="text-caption ml-1 font-normal">this month</span>
                </p>
              </div>

              <div className="border-clinical shadow-clinical absolute right-0 top-4 rounded-xl border bg-ghost-white-50/95 px-2.5 py-2 backdrop-blur-sm sm:-right-6 sm:top-8 sm:px-4 sm:py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-un-blue-600 sm:text-[11px]">
                  Meal Plans
                </p>
                <p className="mt-0.5 text-[18px] font-bold text-oxford-blue-500 sm:text-[22px]">
                  156
                  <span className="text-caption ml-1 font-normal">active</span>
                </p>
              </div>

              <div className="absolute -left-8 top-1/2 hidden h-44 w-44 -translate-y-1/2 rounded-full border border-dashed border-logo-green-200 lg:block" />
            </div>
          </div>

          <div className="order-2 min-w-0 max-w-xl lg:order-1">
            <div className="badge-clinical max-w-full text-left">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-logo-green-500" />
              <span className="min-w-0">Trusted by 500+ Clinical Dietitians</span>
            </div>

            <h1 className="mt-4 text-[clamp(1.75rem,7vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-oxford-blue-500 sm:mt-6">
              Personalized Nutrition,{" "}
              <span className="text-accent-gradient">Stronger Lives</span>
            </h1>

            <p className="text-body mt-3 max-w-[500px] text-[15px] sm:mt-5 sm:text-[16px]">
              The all-in-one platform for dietitians to manage clients, create
              meal plans, and deliver evidence-based nutrition care at scale.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
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

            <div className="border-clinical shadow-clinical mt-6 grid grid-cols-3 gap-2 rounded-2xl border bg-ghost-white-50/80 p-3 backdrop-blur-sm sm:mt-10 sm:gap-4 sm:p-5 lg:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0 text-center lg:text-left">
                  <div className="bg-gradient-icon mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-clinical sm:mb-2 sm:h-9 sm:w-9 lg:mx-0">
                    <stat.icon className="h-3.5 w-3.5 text-logo-green-600 sm:h-4 sm:w-4" />
                  </div>
                  <p className="text-[15px] font-bold text-oxford-blue-500 sm:text-[17px]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] leading-tight text-oxford-blue-300 sm:text-[12px] lg:text-caption">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
