import Image from "next/image";
import {
  getDevelopers,
  getTeamByTier,
  getTeamMembersExcludingGuides,
  type TeamMember,
} from "@/config/team";
import { cn } from "@/lib/utils";
import { LandingSection } from "@/components/landing/landing-section";

const avatarRing =
  "rounded-full ring-[3px] ring-logo-green-500 shadow-[0_6px_18px_color-mix(in_srgb,var(--logo-green-500)_18%,transparent)]";

function MemberAvatar({
  member,
  size,
  className,
}: {
  member: TeamMember;
  size: "lg" | "md";
  className?: string;
}) {
  const sizes = {
    lg: "h-[104px] w-[104px] sm:h-[120px] sm:w-[120px] lg:h-[136px] lg:w-[136px]",
    md: "h-[76px] w-[76px] sm:h-[92px] sm:w-[92px]",
  } as const;

  const imageSizes = {
    lg: "(max-width: 640px) 104px, 136px",
    md: "(max-width: 640px) 76px, 92px",
  } as const;

  return (
    <div className={cn("relative shrink-0 overflow-hidden", avatarRing, sizes[size], className)}>
      <Image
        src={member.image}
        alt={member.name}
        fill
        loading="lazy"
        sizes={imageSizes[size]}
        className={cn("object-cover", member.imagePosition ?? "object-center")}
        style={member.imageScale ? { transform: `scale(${member.imageScale})` } : undefined}
        quality={75}
      />
    </div>
  );
}

function MemberInfo({ member, size }: { member: TeamMember; size: "lg" | "md" }) {
  return (
    <div
      className={cn(
        "mt-2 text-center",
        size === "lg" ? "max-w-[200px] sm:max-w-[240px]" : "max-w-[140px] sm:max-w-[160px]",
      )}
    >
      <p className="text-[12px] font-semibold text-oxford-blue-500 sm:text-[13px]">
        {member.name}
      </p>
      {member.role ? (
        <p className="mt-0.5 text-[11px] leading-snug text-oxford-blue-300 sm:text-[12px]">
          {member.role}
        </p>
      ) : null}
    </div>
  );
}

function MemberProfile({
  member,
  size,
}: {
  member: TeamMember;
  size: "lg" | "md";
}) {
  return (
    <div className="flex flex-col items-center">
      <MemberAvatar member={member} size={size} />
      <MemberInfo member={member} size={size} />
    </div>
  );
}

const fourColGridClassName =
  "mx-auto grid max-w-5xl grid-cols-2 justify-items-center gap-x-7 gap-y-8 sm:grid-cols-4 sm:gap-x-9";

function CenteredTeamGrid({
  members,
  size,
  secondRowStartIndex,
}: {
  members: TeamMember[];
  size: "lg" | "md";
  secondRowStartIndex?: number;
}) {
  return (
    <div className={fourColGridClassName}>
      {members.map((member, index) => (
        <div
          key={member.id}
          className={cn(
            index === 0 && members.length === 2 && "sm:col-start-2",
            index === 0 && members.length === 3 && "sm:col-start-2",
            secondRowStartIndex !== undefined &&
              index === secondRowStartIndex &&
              "sm:col-start-2",
          )}
        >
          <MemberProfile member={member} size={size} />
        </div>
      ))}
    </div>
  );
}

function TeachersRow() {
  return <CenteredTeamGrid members={getTeamByTier("guides")} size="lg" />;
}

function TeamGrid() {
  const members = getTeamMembersExcludingGuides();

  return <CenteredTeamGrid members={members} size="md" />;
}

function DevsRow() {
  const devs = getDevelopers();

  if (devs.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-8 sm:mt-10 sm:gap-x-9">
      {devs.map((member) => (
        <MemberProfile key={member.id} member={member} size="md" />
      ))}
    </div>
  );
}

export function TeamSection() {
  return (
    <LandingSection
      tone="white"
      id="team"
      className="lg:!py-14 md:!pb-10 sm:!pb-12 lg:!pb-14 overflow-hidden"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(1.625rem,3.5vw,2.25rem)] font-bold tracking-tight text-oxford-blue-500">
          Meet The Brains
        </h2>
        <p className="text-body mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed sm:text-[15px]">
          We craft evidence-based nutrition tools that amplify clinical expertise,
          achieving a harmonious balance of science, function, and patient-centered care.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10">
        <TeachersRow />
        <TeamGrid />
        <DevsRow />
      </div>
    </LandingSection>
  );
}
