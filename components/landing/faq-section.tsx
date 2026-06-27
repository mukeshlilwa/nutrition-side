"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LandingSection, LandingSectionHeader } from "./landing-section";

const faqs = [
  {
    question: "Who is The Nutrition Side designed for?",
    answer:
      "The platform is built for registered dietitians, clinical nutritionists, and nutrition professionals who need evidence-based assessment tools, meal planning workflows, and client management in one place.",
  },
  {
    question: "Are the calculator equations clinically validated?",
    answer:
      "Yes. Our Master Calculator uses established equations including Mifflin-St Jeor, Harris-Benedict, Schofield, Hamwi IBW, Holliday-Segar, and DGA-aligned macro targets. Results are intended to support — not replace — professional clinical judgment.",
  },
  {
    question: "Can I export assessment reports for clients?",
    answer:
      "Absolutely. Generate professional PDF reports and JSON exports from the nutrition assessment, ready for clinical notes, care plans, or client handouts.",
  },
  {
    question: "Is my client data secure?",
    answer:
      "We take privacy seriously. Your account and client data are protected with industry-standard security practices. You maintain control over what you store and share within your practice.",
  },
  {
    question: "Do I need an account to use the calculator?",
    answer:
      "Yes. The clinical calculator requires a free account so your assessments can be saved securely and exported when you need them. Public pages like Home and About remain open to everyone.",
  },
  {
    question: "How do I get started?",
    answer:
      "Create a free account, explore the calculator with a sample patient profile, and contact us if you'd like a walkthrough for your clinic or team. We're happy to help you onboard.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-report bg-ghost-white-50",
        isOpen && "border-un-blue-200",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left text-[15px] font-semibold text-oxford-blue-500 sm:px-5"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-un-blue-500 transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="border-t border-report-divider px-4 pb-4 pt-3 sm:px-5">
          <p className="text-body-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  function handleToggle(index: number) {
    setOpenIndex((current) => (current === index ? -1 : index));
  }

  return (
    <LandingSection tone="plain" id="faq" className="py-10 sm:py-12 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:items-start">
        <LandingSectionHeader
          eyebrow="Common Questions"
          title={
            <>
              Frequently Asked{" "}
              <span className="text-accent-gradient">Questions</span>
            </>
          }
          description="Quick answers about the platform, clinical tools, and getting started. Can't find what you need? Reach out — we're here to help."
          className="mb-0 lg:sticky lg:top-28"
        />

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
