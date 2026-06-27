"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LandingCard,
  LandingSection,
  LandingSectionHeader,
} from "./landing-section";

const testimonials = [
  {
    quote:
      "Wasn't sure at first. I still spot check a few numbers. Mifflin and the fluid calc line up with my manual work though. Saves maybe half an hour on new intakes.",
    name: "Sarah M.",
    role: "RD, private practice, Denver",
    rating: 5,
    posted: "3 weeks ago",
    size: "md" as const,
  },
  {
    quote:
      "We dropped spreadsheets in January. The PDF looks clean enough that I send it straight to referring docs without reformatting. My admin team is relieved.",
    name: "James Okonkwo",
    role: "CDN, sports nutrition, Atlanta",
    rating: 5,
    posted: "1 month ago",
    size: "lg" as const,
  },
  {
    quote: "Use it every day for diabetes and CKD. IBW and adjusted energy on one screen. Wish I'd switched sooner.",
    name: "Emily Chen, MSc RD",
    role: "Clinical dietitian, community hospital",
    rating: 5,
    posted: "2 months ago",
    size: "sm" as const,
  },
  {
    quote:
      "Clients actually read the reports. That almost never happens. The protein g/kg line makes follow ups easier to explain.",
    name: "Maria Lopez",
    role: "RD, outpatient clinic, Houston",
    rating: 5,
    posted: "5 weeks ago",
    size: "md" as const,
  },
  {
    quote: "Helpful for interns. They see which equation is which. Less preceptor time on wards.",
    name: "Dr. Priya Nair",
    role: "Clinical nutrition lead, teaching hospital",
    rating: 5,
    posted: "6 weeks ago",
    size: "sm" as const,
  },
  {
    quote:
      "Not every niche case but it handles most of my general assessments. Quick login, simple layout. That's enough for me.",
    name: "Tom Harrison",
    role: "RD, telehealth",
    rating: 4,
    posted: "2 weeks ago",
    size: "md" as const,
  },
  {
    quote:
      "Small group practice here, three dietitians. Calculator outputs match across the team now so we fix fewer chart errors at the end of the week.",
    name: "Rachel Kim, RD LDN",
    role: "Group practice, Chicago",
    rating: 5,
    posted: "3 months ago",
    size: "lg" as const,
  },
  {
    quote: "Busy weekend coverage. Three peds admits. Fluid section was fast and the numbers held up.",
    name: "Anna Bergström",
    role: "Pediatric RD, remote US clients",
    rating: 5,
    posted: "1 month ago",
    size: "sm" as const,
  },
  {
    quote:
      "Been doing this 12 years. Most nutrition apps feel built for consumers. This one actually accounts for conditions and IBW methods.",
    name: "Michael Torres",
    role: "RD, long term care consulting",
    rating: 5,
    posted: "4 months ago",
    size: "md" as const,
  },
  {
    quote: "Coworker recommended it. Took one afternoon to get comfortable. Monday intakes go through it now.",
    name: "Jessica W.",
    role: "Registered dietitian, Melbourne FL",
    rating: 5,
    posted: "7 weeks ago",
    size: "sm" as const,
  },
];

const quoteSizes = {
  sm: "text-[13px] leading-[1.55]",
  md: "text-[14px] leading-[1.6]",
  lg: "text-[15px] leading-[1.65]",
} as const;

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GoogleStarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars on Google`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              "h-3.5 w-3.5",
              index < rating
                ? "fill-[#FBBC04] text-[#FBBC04]"
                : "fill-ghost-white-300 text-ghost-white-300",
            )}
            aria-hidden
          />
        ))}
      </div>
      <span className="text-[12px] font-medium text-oxford-blue-400">{rating}.0</span>
    </div>
  );
}

const navButtonClass = "carousel-nav-btn";

function getVisibleCount(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <LandingCard className="flex min-h-[280px] w-full min-w-0 flex-col p-6 sm:min-h-[300px] lg:min-h-[320px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GoogleIcon className="h-5 w-5 shrink-0" />
          <span className="text-[12px] font-semibold text-oxford-blue-500">Google</span>
        </div>
        <span className="text-[11px] text-oxford-blue-300">{item.posted}</span>
      </div>

      <GoogleStarRating rating={item.rating} />

      <blockquote
        className={cn(
          "mt-4 flex-1 text-oxford-blue-500",
          quoteSizes[item.size],
        )}
      >
        {item.quote}
      </blockquote>

      <div className="mt-auto border-t border-report-divider pt-4">
        <p className="text-[14px] font-semibold text-oxford-blue-500">{item.name}</p>
        <p className="text-body-sm mt-0.5">{item.role}</p>
      </div>
    </LandingCard>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(getVisibleCount(window.innerWidth));
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => Math.min(maxIndex, current + 1));
  }, [maxIndex]);

  const visible = testimonials.slice(index, index + visibleCount);

  return (
    <LandingSection tone="white" id="testimonials">
      <LandingSectionHeader
        eyebrow="Trusted by Dietitians"
        title={
          <>
            What Professionals Say About{" "}
            <span className="text-accent-gradient">The Nutrition Side</span>
          </>
        }
        align="center"
      />

      <div className="w-full" aria-live="polite">
        <div
          className={cn(
            "grid w-full items-stretch gap-5",
            visibleCount === 3 && "lg:grid-cols-3",
            visibleCount === 2 && "sm:grid-cols-2",
            visibleCount === 1 && "grid-cols-1",
          )}
        >
          {visible.map((item) => (
            <TestimonialCard key={item.name + item.posted} item={item} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous reviews"
              className={navButtonClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={index >= maxIndex}
              aria-label="Next reviews"
              className={navButtonClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }, (_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Go to review set ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  dotIndex === index
                    ? "w-6 bg-logo-green-500"
                    : "w-1.5 bg-ghost-white-300 hover:bg-un-blue-300",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
