import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full resize-y rounded-lg border border-ghost-white-300 bg-ghost-white-50 px-3 py-2.5 text-[14px] text-oxford-blue-500 transition-colors placeholder:text-oxford-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-green-500/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
