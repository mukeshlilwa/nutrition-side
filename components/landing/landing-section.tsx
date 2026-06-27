import { type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const sectionTones = {
  plain: "bg-ghost-white-100",
  soft: "bg-gradient-section-soft",
  clinical: "bg-gradient-section-clinical",
  white: "bg-ghost-white-50",
} as const;

type LandingSectionProps = {
  children: ReactNode;
  tone?: keyof typeof sectionTones;
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
  id?: string;
};

export function LandingSection({
  children,
  tone = "plain",
  className,
  containerClassName,
  bordered = false,
  id,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        sectionTones[tone],
        bordered && "border-y border-report-divider",
        className,
      )}
    >
      <Container size="wide" className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

type LandingSectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function LandingSectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: LandingSectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && action && "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn(align === "center" && "mx-auto")}>
        <p className="text-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-[clamp(1.625rem,2.5vw,2rem)] font-bold tracking-tight text-oxford-blue-500">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-body mt-3 max-w-2xl text-[15px] leading-relaxed",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function LandingCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-report bg-ghost-white-50 transition-colors hover:border-un-blue-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
