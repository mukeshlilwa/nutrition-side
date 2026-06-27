import Link from "next/link";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "btn-brand btn-brand-primary font-semibold",
  secondary: "btn-brand btn-brand-secondary font-semibold",
  outline: "btn-brand btn-brand-outline font-semibold",
  ghost: "btn-brand btn-brand-ghost font-medium hover:text-oxford-blue-500",
  link: "text-logo-green-500 underline-offset-4 hover:text-un-blue-600 hover:underline",
} as const;

const sizes = {
  default: "h-10 px-5 py-2",
  sm: "h-9 px-4 text-sm",
  lg: "h-11 px-8 text-[14px]",
  icon: "h-10 w-10",
} as const;

const baseStyles =
  "relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-green-500/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
};

export function buttonClassName(
  variant: keyof typeof variants = "default",
  size: keyof typeof sizes = "default",
  className?: string,
) {
  return cn(baseStyles, variants[variant], sizes[size], className);
}

function ButtonContent({ children }: { children: ReactNode }) {
  return <span className="relative z-[1]">{children}</span>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", href, children, ...props }, ref) => {
    const classes = buttonClassName(variant, size, className);

    if (href) {
      return (
        <Link href={href} className={classes} {...(props as object)}>
          <ButtonContent>{children}</ButtonContent>
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        <ButtonContent>{children}</ButtonContent>
      </button>
    );
  },
);

Button.displayName = "Button";
