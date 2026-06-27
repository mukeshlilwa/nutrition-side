import Image from "next/image";
import { GetStartedButton } from "@/components/auth/get-started-button";
import { LandingSection } from "./landing-section";

export function BottomCtaSection() {
  return (
    <LandingSection tone="white">
      <div className="overflow-hidden rounded-2xl border border-report bg-gradient-cta">
        <div className="relative grid items-center lg:grid-cols-2">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:py-14">
            <p className="text-eyebrow">For Medical Professionals</p>
            <h2 className="mt-2 text-[clamp(1.625rem,2.5vw,2rem)] font-bold leading-tight tracking-tight text-oxford-blue-500">
              Ready to Transform Lives with{" "}
              <span className="text-accent-gradient">Nutrition?</span>
            </h2>
            <p className="text-body mt-4 max-w-md text-[15px] leading-relaxed">
              Join hundreds of dietitians using The Nutrition Side to deliver
              better care, streamline assessments, and grow their practice.
            </p>
            <GetStartedButton
              size="lg"
              className="mt-8 rounded-full px-8"
              loggedOutLabel="Get Started Now"
            />
          </div>

          <div className="relative h-56 lg:h-full lg:min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
              alt="Fresh healthy salad bowl"
              fill
              className="object-cover object-center lg:object-left"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ghost-white-100/95 via-ghost-white-100/30 to-transparent lg:from-ghost-white-100/85" />
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
