import type { TeamMember } from "@/data/team";

type TeamMemberCardProps = {
  member: TeamMember;
  cardRef: (el: HTMLDivElement | null) => void;
  canvasRef: (el: HTMLCanvasElement | null) => void;
};

export function TeamMemberCard({
  member,
  cardRef,
  canvasRef,
}: TeamMemberCardProps) {
  return (
    <div
      ref={cardRef}
      className="team-card absolute inset-0 w-full"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#1a1a1a]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#9AFD0D] uppercase md:text-xs">
            {member.role}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            {member.name}
          </h3>
        </div>
      </div>
    </div>
  );
}
