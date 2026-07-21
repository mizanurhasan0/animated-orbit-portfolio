import type { IconType } from "react-icons";
import {
  FaCloud,
  FaDatabase,
  FaFigma,
  FaLaptopCode,
  FaServer,
} from "react-icons/fa";

export type ExpertiseItem = {
  label: string;
  Icon: IconType;
};

export const heroProfile = {
  name: "Mizanur Hasan Khan",
  portraitSrc: "/team/portrait.png",
  role: "Frontend Developer",
  roleSecondary: "Figma Designer",
  flipWords: ["creative", "interactive", "beautiful", "modern"],
  available: true,
  resumeUrl: "#",
  hireUrl: "mailto:hello@example.com",
  expertise: [
    { label: "Frontend", Icon: FaLaptopCode },
    { label: "Backend", Icon: FaServer },
    { label: "Database", Icon: FaDatabase },
    { label: "DevOps", Icon: FaCloud },
    { label: "UI/UX Design", Icon: FaFigma },
  ] satisfies ExpertiseItem[],
};
