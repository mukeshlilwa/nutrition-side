import Image from "next/image";
import { Button, Container, Input, Label, Textarea } from "@/components/ui";

export function ContactSection() {
  return (
    <section className="bg-gradient-section-soft py-14 lg:py-20">
      <Container size="wide">
        <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative min-h-[280px] md:min-h-0 md:h-full">
            <div className="absolute -left-4 top-6 h-40 w-40 rounded-full bg-logo-green-200/40" />
            <div className="absolute -right-2 bottom-8 z-10 h-24 w-24 rounded-full bg-un-blue-100/70" />
            <div className="shadow-clinical absolute inset-0 overflow-hidden rounded-2xl border border-clinical">
              <Image
                src="/images/contact.jpg"
                alt="Nutritionist consulting with a client"
                fill
                quality={95}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue-500/50 via-oxford-blue-500/10 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-eyebrow">Contact Us</p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-oxford-blue-500 sm:text-[36px] lg:text-[40px]">
              Get in <span className="text-accent-gradient">Touch</span>
            </h1>
            <p className="text-body mt-4 max-w-lg">
              Have a question about our platform, need support, or ready to
              transform your practice? Send us a message and our team will get
              back to you within one business day.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
