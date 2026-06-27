"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { authModalBackground, authModalHeightClass, authModalLayout } from "@/components/auth/auth-modal-config";
import { dismissAuthModal } from "@/lib/auth/navigation";
import { cn } from "@/lib/utils";

type AuthModalProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function AuthModal({
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
}: AuthModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    dismissAuthModal(router);
  }, [router]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeModal]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-oxford-blue-500/50 backdrop-blur-[3px]"
        onClick={closeModal}
      />

      <div
        className={cn(
          "border-clinical shadow-logo relative z-10 flex max-h-[92dvh] w-full max-w-[min(100%,420px)] flex-col overflow-hidden rounded-2xl border md:max-w-[920px] md:flex-row",
          authModalHeightClass,
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute inset-0">
          <Image
            src={authModalBackground.src}
            alt={authModalBackground.alt}
            fill
            quality={75}
            className="object-cover object-left"
            sizes="(max-width: 768px) 440px, 920px"
          />
        </div>

        <div className="relative h-36 shrink-0 md:hidden" aria-hidden />

        <div
          className={cn("relative hidden shrink-0 md:block", authModalLayout.leftWidth)}
          aria-hidden
        />

        <div
          className={cn(
            "relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto bg-ghost-white-50/96 px-5 py-8 backdrop-blur-[1px] sm:px-6 md:ml-auto md:bg-transparent md:backdrop-blur-none md:px-6 md:py-10",
            authModalLayout.formZoneWidth,
          )}
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close dialog"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-report bg-ghost-white-50/90 text-oxford-blue-500 transition-colors hover:border-un-blue-200 hover:text-logo-green-600 md:bg-ghost-white-50/80"
          >
            <X className="h-4 w-4" />
          </button>

          <div
            className={cn(
              "flex w-full flex-col items-center text-center",
              authModalLayout.formContentMaxWidth,
            )}
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-logo-green-700">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-[20px] font-bold leading-tight tracking-tight text-oxford-blue-500 sm:text-[22px]">
                {title}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-oxford-blue-500/85">
                {description}
              </p>
            </div>

            <div className="mt-6 w-full text-left">{children}</div>

            {footer && (
              <div className="mt-6 w-full border-t border-oxford-blue-500/10 pt-5 text-[13px] text-oxford-blue-500">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
