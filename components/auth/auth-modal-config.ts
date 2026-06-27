export const authModalBackground = {
  src: "/logo/BGloginpage.png",
  alt: "The Nutrition Side branding",
} as const;

/** Left branding area vs right form zone — tuned to BGloginpage.png layout */
export const authModalLayout = {
  leftWidth: "md:w-[56%]",
  formZoneWidth: "md:w-[44%]",
  formContentMaxWidth: "max-w-[300px]",
} as const;

export const authModalHeightClass = "md:min-h-[620px]";
