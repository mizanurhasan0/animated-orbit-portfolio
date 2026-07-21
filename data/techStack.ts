import { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiPostman,
  SiNpm,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiCplusplus,
  SiPostgresql,
  SiMongodb,
  SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbTopologyStar3, TbHierarchy3, TbDatabaseCog } from "react-icons/tb";

export type TechItem = {
  name: string;
  description: string;
  Icon: IconType;
  color?: string;
};

export const ACCENT = "#9AFD0D";

export const innerRing: TechItem[] = [
  {
    name: "HTML5",
    description: "Semantic markup language for structuring web pages and content.",
    Icon: SiHtml5,
    color: "#E34F26",
  },
  {
    name: "CSS",
    description: "Stylesheet language for layout, typography, and responsive design.",
    Icon: SiCss,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    description: "Dynamic language powering interactivity and logic in the browser.",
    Icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript for safer, scalable codebases.",
    Icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "React",
    description: "Component-based UI library for building interactive interfaces.",
    Icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    description: "React framework for production apps with SSR, routing, and optimized builds.",
    Icon: SiNextdotjs,
  },
  {
    name: "Redux",
    description: "Predictable state container for managing complex application data.",
    Icon: SiRedux,
    color: "#764ABC",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid, consistent UI development.",
    Icon: SiTailwindcss,
    color: "#38BDF8",
  },
  {
    name: "Figma",
    description: "Collaborative design tool for UI mockups, prototypes, and handoff.",
    Icon: SiFigma,
    color: "#F24E1E",
  },
  {
    name: "GitHub",
    description: "Platform for version control, code review, and team collaboration.",
    Icon: SiGithub,
  },
  {
    name: "Postman",
    description: "API client for testing, documenting, and debugging HTTP endpoints.",
    Icon: SiPostman,
    color: "#FF6C37",
  },
  {
    name: "npm",
    description: "Package manager for installing and sharing JavaScript dependencies.",
    Icon: SiNpm,
    color: "#CB3837",
  },
];

export const outerRing: TechItem[] = [
  {
    name: "Node.js",
    description: "JavaScript runtime for building scalable server-side applications.",
    Icon: SiNodedotjs,
    color: "#5FA04E",
  },
  {
    name: "Express.js",
    description: "Minimal Node.js web framework for REST APIs and backend services.",
    Icon: SiExpress,
  },
  {
    name: "Nest.js",
    description: "Progressive Node.js framework with TypeScript and modular architecture.",
    Icon: SiNestjs,
    color: "#E0234E",
  },
  {
    name: "Python",
    description: "Versatile language for scripting, automation, and backend development.",
    Icon: SiPython,
    color: "#3776AB",
  },
  {
    name: "C++",
    description: "High-performance language for systems programming and compute-heavy tasks.",
    Icon: SiCplusplus,
    color: "#00599C",
  },
  {
    name: "PostgreSQL",
    description: "Relational database with strong consistency, SQL, and advanced querying.",
    Icon: SiPostgresql,
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    description: "Document database for flexible, JSON-like data storage at scale.",
    Icon: SiMongodb,
    color: "#47A248",
  },
  {
    name: "Docker",
    description: "Container platform for packaging and deploying apps consistently.",
    Icon: SiDocker,
    color: "#2496ED",
  },
  {
    name: "AWS",
    description: "Cloud platform for hosting, storage, compute, and managed services.",
    Icon: FaAws,
    color: "#FF9900",
  },
  {
    name: "System Design",
    description: "Planning scalable architectures that handle growth and reliability.",
    Icon: TbTopologyStar3,
    color: ACCENT,
  },
  {
    name: "Architecture Design",
    description: "Structuring software into maintainable layers, modules, and patterns.",
    Icon: TbHierarchy3,
    color: ACCENT,
  },
  {
    name: "Database Design",
    description: "Modeling schemas, indexes, and relationships for efficient data access.",
    Icon: TbDatabaseCog,
    color: ACCENT,
  },
];
