import Image from "next/image";
import Link from "next/link";
import { HeaderAuth } from "@/components/layout/header-auth";
import { HeaderNav } from "@/components/layout/header-nav";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full px-4 pt-4 sm:px-6 sm:pt-5",
        className,
      )}
    >
      <Container size="wide">
        <div className="header-glass relative flex min-h-[58px] items-center gap-2 rounded-full px-3 py-2 sm:min-h-[62px] sm:gap-3 sm:px-5 sm:py-2.5">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5 lg:gap-3">
            <Image
              src="/logo/TNC_logo.svg"
              alt={`${siteConfig.name} logo`}
              width={52}
              height={49}
              priority
              className="h-9 w-auto shrink-0 sm:h-10"
            />
            <span className="hidden min-w-0 truncate text-[14px] font-bold leading-tight text-oxford-blue-500 min-[480px]:inline sm:max-w-[140px] md:max-w-none md:text-[15px]">
              {siteConfig.name}
            </span>
          </Link>

          <div
            className="hidden h-7 w-px shrink-0 bg-gradient-to-b from-logo-green-200 via-un-blue-200 to-logo-green-200 lg:block"
            aria-hidden
          />

          <HeaderNav />

          <HeaderAuth />
        </div>
      </Container>
    </header>
  );
}
