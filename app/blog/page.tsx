import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <Container className="py-12 sm:py-20">
      <h1 className="text-[clamp(1.75rem,5vw,2.25rem)] font-bold tracking-tight text-oxford-blue-500">
        Blog
      </h1>
      <p className="text-body mt-4 max-w-2xl text-[15px] sm:text-lg">
        Coming Soon...
      </p>
    </Container>
  );
}
