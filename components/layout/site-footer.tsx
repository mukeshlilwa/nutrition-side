"use client";

import Image from "next/image";
import Link from "next/link";
import { ProtectedLink } from "@/components/auth/protected-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { footerLinks, siteConfig, socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

const linkClass =
  "text-[13px] text-oxford-blue-400 transition-colors hover:text-logo-green-600";

const socialIcons: Record<
  (typeof socialLinks)[number]["label"],
  React.ComponentType<{ className?: string }>
> = {
  Instagram: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM5 20V9h3v11H5Zm5.5 0V13.2c0-1.1.2-2.2 1.6-2.2 1.4 0 1.4 1.3 1.4 2.3V20h3v-6.8c0-3.3-1.8-3.8-2.8-3.8-1.3 0-1.9.7-2.2 1.4V9h-3v11h3Z" />
    </svg>
  ),
};

function FooterLink({
  href,
  label,
  protected: isProtected,
}: {
  href: string;
  label: string;
  protected?: boolean;
}) {
  if (isProtected) {
    return (
      <ProtectedLink href={href} className={linkClass}>
        {label}
      </ProtectedLink>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-report-divider bg-ghost-white-50">
      <Container size="wide" className="py-8 lg:py-9">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo/TNC_logo.svg"
                alt={`${siteConfig.name} logo`}
                width={40}
                height={38}
                className="h-8 w-auto"
              />
              <span className="text-[15px] font-bold text-oxford-blue-500">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-body mt-2 max-w-sm text-[13px] leading-snug">
              {siteConfig.description}
            </p>
            <Button href="/contact" size="sm" className="mt-4 rounded-full px-4">
              Get in Touch
            </Button>
          </div>

          <div>
            <p className="text-eyebrow">Platform</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <FooterLink
                    href={link.href}
                    label={link.label}
                    protected={"protected" in link && link.protected}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow">Company</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-eyebrow">Follow Us</p>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] text-oxford-blue-400 transition-colors hover:text-logo-gray-600"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-report-divider">
        <Container
          size="wide"
          className="flex flex-col items-center justify-between gap-2 py-3.5 sm:flex-row"
        >
          <p className="text-[12px] leading-normal text-oxford-blue-700">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          {/* <p className={cn("text-caption", "text-oxford-blue-300")}>{siteConfig.tagline}</p> */}
        </Container>
      </div>
    </footer>
  );
}
