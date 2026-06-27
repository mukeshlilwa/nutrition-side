import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-20">
      <h1 className="text-[clamp(1.75rem,5vw,2.25rem)] font-bold tracking-tight text-oxford-blue-500">
        About
      </h1>
      <p className="text-body mt-4 max-w-2xl text-[15px] sm:text-lg">
        Learn about our mission to make evidence-based nutrition accessible to
        everyone. This page is a placeholder — content coming soon.
      </p>
    </Container>
  );
}
