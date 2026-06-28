import Image from "next/image";
import {
  getTeamByTier,
  getTeamMembersExcludingGuides,
  type TeamMember,
} from "@/config/team";
import { cn } from "@/lib/utils";
import { LandingSection } from "@/components/landing/landing-section";

const circleRing =
  "shadow-[0_0_0_3px_rgba(255,255,255,0.95),0_6px_18px_rgba(0,27,46,0.08)]";

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
    lg: "h-[96px] w-[96px] sm:h-[112px] sm:w-[112px] lg:h-[124px] lg:w-[124px]",
    md: "h-[84px] w-[84px] sm:h-[96px] sm:w-[96px]",
  } as const;

  const imageSizes = {
    lg: "(max-width: 640px) 96px, 124px",
    md: "(max-width: 640px) 84px, 96px",
  } as const;

  return (
    <div className={cn("relative shrink-0 rounded-full", sizes[size], className)}>
      <div className={cn("absolute inset-0 rounded-full bg-[#3dd6c7]", circleRing)} />
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          loading="lazy"
          sizes={imageSizes[size]}
          className={cn("object-cover", member.imagePosition ?? "object-center")}
          quality={75}
        />
      </div>
    </div>
  );
}

function MemberInfo({ member }: { member: TeamMember }) {
  return (
    <div className="mt-2 max-w-[140px] text-center sm:max-w-[160px]">
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
      <MemberInfo member={member} />
    </div>
  );
}

function TeachersRow() {
  const teachers = getTeamByTier("guides");

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-10">
      {teachers.map((member) => (
        <MemberProfile key={member.id} member={member} size="lg" />
      ))}
    </div>
  );
}

function TeamGrid() {
  const members = getTeamMembersExcludingGuides();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-5 lg:grid-rows-2 lg:gap-x-5">
      {members.map((member) => (
        <MemberProfile key={member.id} member={member} size="md" />
      ))}
    </div>
  );
}

function DevsRow() {
  const devs = getTeamByTier("devs");

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-10">
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
      className="!py-0 !pb-10 overflow-hidden sm:!pb-12 lg:!pb-14"
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
