import Image from "next/image";
import { founder } from "@/config/founder";
import { siteConfig } from "@/config/site";
import {
  LandingCard,
  LandingSection,
} from "@/components/landing/landing-section";

export function FounderSection() {
  return (
    <LandingSection
      tone="soft"
      className="hero-fullscreen !py-0 !pt-36 !pb-12 sm:!pt-40 sm:!pb-16 lg:!pt-44 lg:!pb-20"
    >
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
          <LandingCard className="overflow-hidden p-0">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={founder.image}
                alt={`${founder.name}, founder of ${siteConfig.name}`}
                fill
                priority
                quality={75}
                sizes="(max-width: 768px) 320px, 50vw"
                className="object-cover object-[50%_22%]"
              />
            </div>
            <div className="border-t border-report-divider px-5 py-4 sm:px-6">
              <p className="text-[15px] font-bold text-oxford-blue-500">{founder.name}</p>
              <p className="mt-1 text-[13px] text-oxford-blue-300">{founder.credentials}</p>
              <p className="mt-0.5 text-[13px] text-oxford-blue-300">{founder.role}</p>
              <p className="text-caption mt-2">{founder.location}</p>
            </div>
          </LandingCard>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-eyebrow">Our Story</p>
            <h2 className="mt-2 text-[clamp(1.625rem,2.5vw,2rem)] font-bold tracking-tight text-oxford-blue-500">
              Built by a Dietitian,{" "}
              <span className="text-accent-gradient">For Dietitians</span>
            </h2>
            <p className="text-body mt-3 text-[15px] leading-relaxed">
              {founder.name} founded {siteConfig.name} to give clinical nutrition
              professionals the digital tools they deserve.
            </p>
          </div>

          <div className="space-y-2">
            {founder.intro[0] && (
              <p className="text-body text-[15px] leading-relaxed sm:text-base">
                {founder.intro[0]}
              </p>
            )}

            <h3 className="text-[15px] font-bold text-oxford-blue-500 sm:text-base">
              {founder.mission}
            </h3>

            {founder.intro.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-body text-[15px] leading-relaxed sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-5 pt-2">
            <div>
              <h3 className="text-[15px] font-bold text-oxford-blue-500 sm:text-base">
                {founder.changing.title}
              </h3>
              <p className="text-body mt-2 text-[15px] leading-relaxed sm:text-base">
                {founder.changing.body}
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-oxford-blue-500 sm:text-base">
                {founder.vision.title}
              </h3>
              <p className="text-body mt-2 text-[15px] leading-relaxed sm:text-base">
                {founder.vision.body}
              </p>
            </div>
          </div>

          <p className="border-l-4 border-logo-green-500 pl-4 text-[15px] font-semibold leading-relaxed text-oxford-blue-500 sm:text-base">
            {founder.closing}
          </p>
        </div>
      </div>
    </LandingSection>
  );
}
