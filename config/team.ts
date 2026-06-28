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
  imageScale?: number;
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
    id: "product-lead",
    name: "Prof. Dr. Ali Raza",
    role: "Riphah International University",
    tier: "guides",
    image: "/team/WhatsApp Image 2026-06-29 at 1.48.21 AM.jpeg",
    imagePosition: "object-[45%_25%]",
  },
  {
    id: "community-lead",
    name: "Dn. Mariam Iftikhar",
    role: "HOD Nutrition Department Islamia University Bahawalpur",
    tier: "guides",
    image: "/team/WhatsApp Image 2026-06-29 at 1.50.57 AM.jpeg",
    imagePosition: "object-[50%_40%]",
  },
  {
    id: "clinical-advisor",
    name: "Engr. Haseeb Ahmed",
    role: "Developer",
    tier: "devs",
    image: "/team/155911.jpg",
    imagePosition: "object-[56%_22%]",
  },
  {
    id: "operations",
    name: "Engr. Muhammad Bilal Hussain",
    role: "NOC Officer Qatar",
    tier: "management",
    image: "/team/154613.jpg",
    imagePosition: "object-top",
  },
  {
    id: "clinical-nutritionist",
    name: "Engr. Mukesh Kumar Lilwa",
    role: "Developer",
    tier: "devs",
    image: "/team/155898.png",
    imagePosition: "object-top",
  },
  {
    id: "registered-dietitian",
    name: "Dn. Benish Naz",
    role: "Clinical Dietitian",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.27.02 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "nutrition-specialist",
    name: "Dn. Noor ul Eza",
    role: "Co-founder",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.40.31 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "research-content",
    name: "Dn. Saad Rafique",
    role: "CEO Holistic Nutrition",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 12.58.05 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "nutrition-educator",
    name: "Dn. Michal Mukhtyar",
    role: "Clinical Dietitian",
    tier: "clinical",
    image: "/team/WhatsApp Image 2026-06-29 at 1.56.46 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "platform-engineer",
    name: "Dn. Muqaddas Abbasi",
    role: "Clinical Dietitian",
    tier: "support",
    image: "/team/WhatsApp Image 2026-06-29 at 1.22.56 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "client-success",
    name: "Dn. Syeda Farheen Zahra",
    role: "Clinical Dietitian (USA)",
    tier: "support",
    image: "/team/WhatsApp Image 2026-06-29 at 1.24.39 AM.jpeg",
    imagePosition: "object-top",
  },
  {
    id: "master-trainer-pfa",
    name: "Dn. Muneeba Ghaffar",
    role: "Master trainer PFA",
    tier: "support",
    image: "/team/154614.jpg",
    imagePosition: "object-[50%_28%]",
    imageScale: 1.35,
  },
  {
    id: "clinical-support",
    name: "Engr. Usman Sial",
    role: "Developer (Korea)",
    tier: "devs",
    image: "/team/WhatsApp Image 2026-06-29 at 1.32.41 AM.jpeg",
    imagePosition: "object-[50%_22%]",
    imageScale: 1.4,
  },
];

const mainGridOrder: Record<string, number> = {
  "nutrition-specialist": 1,
  "registered-dietitian": 2,
  "nutrition-educator": 3,
  "platform-engineer": 4,
  "research-content": 5,
  "master-trainer-pfa": 6,
  "client-success": 7,
  operations: 8,
};

function isDeveloper(member: TeamMember) {
  return /developer/i.test(member.role);
}

export function getTeamByTier(tier: TeamTier) {
  return teamMembers.filter((member) => member.tier === tier);
}

export function getDevelopers() {
  return teamMembers.filter(isDeveloper);
}

export function getTeamMembersExcludingGuides() {
  return teamMembers
    .filter((member) => member.tier !== "guides" && !isDeveloper(member))
    .sort((a, b) => (mainGridOrder[a.id] ?? 99) - (mainGridOrder[b.id] ?? 99));
}
