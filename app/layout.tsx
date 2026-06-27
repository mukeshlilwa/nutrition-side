import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthSlot } from "@/components/auth/auth-slot";
import { Header, SiteFooter } from "@/components/layout";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-ghost-white-100 text-oxford-blue-500"
        suppressHydrationWarning
      >
        <Header />
        <main className="main-content flex-1">{children}</main>
        <SiteFooter />
        <AuthSlot>{auth}</AuthSlot>
      </body>
    </html>
  );
}
