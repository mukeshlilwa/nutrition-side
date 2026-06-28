export type TeamTier =
  | "guides"
  | "leadership"
  | "management"
  | "clinical"
  | "support"
  | "devs";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  image: string;
  imagePosition?: string;
  description?: string;
};

export const teamTierMeta: Record<
  TeamTier,
  { label: string; description: string; order: number }
> = {
  guides: {
    label: "Teachers",
    description: "",
    order: 0,
  },
  leadership: {
    label: "Leadership",
    description: "Setting vision and clinical direction for the platform.",
    order: 1,
  },
  management: {
    label: "Management",
    description: "Driving product, operations, and community growth.",
    order: 2,
  },
  clinical: {
    label: "Clinical Team",
    description: "Evidence-based nutrition expertise behind every tool.",
    order: 3,
  },
  support: {
    label: "Operations & Support",
    description: "Building, supporting, and scaling the experience.",
    order: 4,
  },
  devs: {
    label: "Developers",
    description: "Building the platform behind the scenes.",
    order: 5,
  },
};

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Dn. Rizwan Maqbool",
    role: "Founder, TNS – The Nutrition Side",
    tier: "leadership",
    image: "/team/WhatsApp Image 2026-06-29 at 1.51.36 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "product-lead",
    name: "Team Member",
    role: "",
    tier: "guides",
    image: "/team/WhatsApp Image 2026-06-29 at 1.48.21 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "community-lead",
    name: "Team Member",
    role: "",
    tier: "guides",
    image: "/team/WhatsApp Image 2026-06-29 at 1.50.57 AM.jpeg",
    imagePosition: "object-[50%_40%]",
  },
  {
    id: "clinical-advisor",
    name: "Team Member",
    role: "Developer",
    tier: "devs",
    image: "/team/155911.jpg",
    imagePosition: "object-top",
  },
  {
    id: "operations",
    name: "Team Member",
    role: "Head of Operations",
    tier: "management",
    image: "/team/WhatsApp Image 2026-06-29 at 1.36.34 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "clinical-nutritionist",
    name: "Team Member",
    role: "Developer",
    tier: "devs",
    image: "/team/155898.png",
    imagePosition: "object-top",
  },
  {
    id: "registered-dietitian",
    name: "Team Member",
    role: "Registered Dietitian",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.27.02 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "nutrition-specialist",
    name: "Team Member",
    role: "Nutrition Specialist",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.40.31 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "research-content",
    name: "Team Member",
    role: "Research & Content",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 12.58.05 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "nutrition-educator",
    name: "Team Member",
    role: "Nutrition Educator",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.56.46 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "platform-engineer",
    name: "Team Member",
    role: "Platform Engineer",
    tier: "support",
    image: "/team/WhatsApp Image 2026-06-29 at 1.22.56 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "client-success",
    name: "Team Member",
    role: "Client Success",
    tier: "support",
    image: "/team/WhatsApp Image 2026-06-29 at 1.24.39 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "clinical-support",
    name: "Team Member",
    role: "Clinical Support",
    tier: "support",
    image: "/team/WhatsApp Image 2026-06-29 at 1.32.41 AM.jpeg",
    imagePosition: "object-top",
  },
];

export function getTeamByTier(tier: TeamTier) {
  return teamMembers.filter((member) => member.tier === tier);
}

export function getTeamMembersExcludingGuides() {
  return teamMembers
    .filter((member) => member.tier !== "guides" && member.tier !== "devs")
    .sort((a, b) => teamTierMeta[a.tier].order - teamTierMeta[b.tier].order);
}
