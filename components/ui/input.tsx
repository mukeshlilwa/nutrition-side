import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border border-ghost-white-300 bg-ghost-white-50 px-4 py-2 text-[14px] text-oxford-blue-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-oxford-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-green-500/30 disabled:cursor-not-allowed disabled:opacity-100",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
