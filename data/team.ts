export type SequenceMember = {
  id: string;
  type: "sequence";
  sourceId: "niamul";
  name: string;
  role: string;
  ext: "jpg";
  frameCount: number;
  loopCount: number;
};

export type StaticMember = {
  id: string;
  type: "static";
  name: string;
  role: string;
  imageSrc: string;
};

export type TeamMember = SequenceMember | StaticMember;

export const teamSection = {
  badge: "Team",
  title: "The People Behind the Work",
  description:
    "Scroll — each team member enters from the left while their portrait animates frame by frame.",
  members: [
    {
      id: "niamul-1",
      type: "sequence",
      sourceId: "niamul",
      name: "Niamul",
      role: "Creative Lead",
      ext: "jpg",
      frameCount: 120,
      loopCount: 2,
    },
    {
      id: "portrait-1",
      type: "static",
      name: "Mizanur Hasan Khan",
      role: "Frontend Developer",
      imageSrc: "/team/portrait.png",
    },
  ] satisfies TeamMember[],
};

export function getTeamFramePath(
  member: Pick<SequenceMember, "sourceId" | "ext">,
  frame: number,
) {
  const index = String(frame).padStart(3, "0");
  return `/team/${member.sourceId}/ezgif-frame-${index}.${member.ext}`;
}

export function isSequenceMember(member: TeamMember): member is SequenceMember {
  return member.type === "sequence";
}

export function isStaticMember(member: TeamMember): member is StaticMember {
  return member.type === "static";
}
