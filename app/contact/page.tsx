import type { Metadata } from "next";
import { ContactSection } from "@/components/contact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. We're here to help with questions, support, and getting started.`,
};

export default function ContactPage() {
  return <ContactSection />;
}
