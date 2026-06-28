"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LandingCard,
  LandingSection,
  LandingSectionHeader,
} from "./landing-section";

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=480&q=70&auto=format&fit=crop",
    tag: "Nutrition Basics",
    title: "Understanding Macronutrients for Better Health",
    excerpt:
      "Learn how proteins, carbs, and fats work together to fuel your body and support your goals.",
    date: "May 15, 2024",
    readTime: "5 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=480&q=70&auto=format&fit=crop",
    tag: "Meal Planning",
    title: "5 Meal Prep Strategies for Busy Professionals",
    excerpt:
      "Simple techniques to plan and prepare nutritious meals even with a packed schedule.",
    date: "May 10, 2024",
    readTime: "4 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=480&q=70&auto=format&fit=crop",
    tag: "Wellness",
    title: "The Science Behind Gut Health and Nutrition",
    excerpt:
      "Discover how your microbiome influences digestion, immunity, and overall wellbeing.",
    date: "May 5, 2024",
    readTime: "6 min read",
  },
];

const viewAllLinkClass =
  "inline-flex items-center gap-1 text-[13px] font-semibold text-logo-green-600 transition-colors hover:text-un-blue-600";

const navButtonClass = "carousel-nav-btn";

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <LandingCard className="h-full overflow-hidden">
      <div className="relative h-52 w-full sm:h-56">
        <Image
          src={article.image}
          alt={article.title}
          fill
          loading="lazy"
          quality={75}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue-500/25 to-transparent" />
      </div>
      <div className="p-5">
        <span className="inline-block rounded-full border border-report bg-gradient-icon px-2.5 py-0.5 text-[11px] font-medium text-logo-green-700">
          {article.tag}
        </span>
        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-oxford-blue-500">
          {article.title}
        </h3>
        <p className="text-body-sm mt-2 leading-relaxed">{article.excerpt}</p>
        <p className="text-caption mt-4">
          {article.date} &bull; {article.readTime}
        </p>
      </div>
    </LandingCard>
  );
}

export function ArticlesSection() {
  const [index, setIndex] = useState(0);
  const maxIndex = articles.length - 1;

  const goPrev = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => Math.min(maxIndex, current + 1));
  }, [maxIndex]);

  return (
    <LandingSection tone="soft" id="articles" className="py-14 sm:py-20 lg:py-24">
      <LandingSectionHeader
        eyebrow="Evidence-Based Insights"
        title="Latest Articles & Resources"
        description="Practical guidance and clinical nutrition insights to support your practice and your clients."
        action={
          <Link href="/blog" className={`${viewAllLinkClass} shrink-0`}>
            View all articles
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="md:hidden" aria-live="polite">
        <ArticleCard article={articles[index]!} />

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="Previous article"
              className={navButtonClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={index >= maxIndex}
              aria-label="Next article"
              className={navButtonClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {articles.map((article, dotIndex) => (
              <button
                key={article.title}
                type="button"
                aria-label={`Go to article ${dotIndex + 1}`}
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

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>

      <Link href="/blog" className={`${viewAllLinkClass} mt-8 md:hidden`}>
        View all articles
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </LandingSection>
  );
}
