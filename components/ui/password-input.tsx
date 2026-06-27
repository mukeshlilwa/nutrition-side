"use client";

import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          className={cn(
            "flex h-11 w-full rounded-full border border-ghost-white-300 bg-ghost-white-50 py-2 pl-4 pr-11 text-[14px] text-oxford-blue-500 transition-colors placeholder:text-oxford-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-green-500/30 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-oxford-blue-300 transition-colors hover:text-oxford-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden />
          ) : (
            <Eye className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
