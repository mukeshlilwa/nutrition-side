export const siteConfig = {
  name: "The Nutrition Side",
  // tagline: "Nutrition, Personalized",
  description:
    "The all-in-one platform for dietitians to manage clients, create meal plans, and deliver personalized nutrition care.",
  url: "https://thenutritionside.com",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About Us" },
  // { href: "/professionals", label: "For Professionals", hasDropdown: true },
] as const;

export const footerLinks = {
  platform: [
    { href: "/calculator", label: "TNS Calculator", protected: true },
    { href: "/blog", label: "Blog & Resources" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/#faq", label: "FAQ" },
  ],
} as const;

export const socialLinks = [
  {
    href: "https://www.instagram.com/_nutritionside?igsh=cm1tcTZhZnNlYmZn",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/the-nutrition-side/",
    label: "LinkedIn",
  },
] as const;
