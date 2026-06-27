"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { ProtectedLink } from "@/components/auth/protected-link";
import { isProtectedPath } from "@/config/routes";
import { LandingSection } from "./landing-section";

const categories = [
  {
    label: "MEAL PLANNER",
    href: "/contact",
    alt: "Weekly meal plan with prepared healthy portions in containers",
    image: "/images/services/meal-planner.jpg",
  },
  {
    label: "CLINICAL TOOLS",
    href: "/calculator",
    alt: "Digital nutrition calculator with macro charts and clinical analysis on tablet and laptop",
    image: "/images/services/clinical-tools-digital.jpg",
  },
  {
    label: "RECIPES",
    href: "/contact",
    alt: "Fresh healthy recipe with colorful whole-food ingredients",
    image: "/images/services/recipes.png",
  },
  {
    label: "RESOURCES",
    href: "/blog",
    alt: "Medical binder, nutrition charts, laptop dashboard, and stethoscope on a clinical desk",
    image: "/images/services/resources-desk.jpg",
  },
  {
    label: "BLOG",
    href: "/blog",
    alt: "Latest nutrition articles and evidence-based blog posts",
    image: "/images/services/blog.png",
  },
] as const;

type Category = (typeof categories)[number];

const CategoryCard = memo(function CategoryCard({ category }: { category: Category }) {
  const card = (
    <div className="group relative overflow-hidden rounded-2xl shadow-clinical transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-square w-full">
        <Image
          src={category.image}
          alt={category.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-logo-green-500 px-3.5 py-3 sm:px-4">
        <span className="text-[10px] font-bold tracking-[0.14em] text-white sm:text-[11px]">
          {category.label}
        </span>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-white/90 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </div>
  );

  if (isProtectedPath(category.href)) {
    return <ProtectedLink href={category.href}>{card}</ProtectedLink>;
  }

  return <Link href={category.href}>{card}</Link>;
});

export function FeaturesIconBar() {
  return (
    <LandingSection tone="white" bordered>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.label} category={category} />
        ))}
      </div>
    </LandingSection>
  );
}
