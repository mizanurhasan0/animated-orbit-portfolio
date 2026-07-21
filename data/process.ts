export type ProcessItem = {
  title: string;
  description: string;
  deliverables: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const processSection = {
  badge: "Our Process",
  title: "Our Process Is the Most Convenient for Our Partners!",
  description:
    "We streamline UI/UX design and web development with a structured, hassle-free approach. From research to launch, we ensure a smooth journey and high-quality digital products for our clients.",
  items: [
    {
      title: "Kickoff Call & Project Discovery",
      description:
        "We start by understanding your business, goals, and audience. This helps us plan the entire project with clear objectives and measurable results.",
      deliverables: [
        "Project brief & goals",
        "Stakeholder map",
        "Success metrics",
      ],
      image: {
        src: "/process/1.webp",
        alt: "Kick off Call & Project Discovery",
        width: 480,
        height: 480,
      },
    },
    {
      title: "Research and UX Strategy",
      description:
        "We analyze user behavior, competitors, and industry trends. This allows us to define an effective structure and feature set for your website.",
      deliverables: [
        "User personas",
        "Competitor audit",
        "UX strategy doc",
      ],
      image: {
        src: "/process/2.webp",
        alt: "Research & UX Strategy",
        width: 480,
        height: 480,
      },
    },
    {
      title: "Wireframing & Prototyping",
      description:
        "Our team creates wireframes and interactive prototypes to ensure a seamless user experience (UX).",
      deliverables: [
        "Low-fi wireframes",
        "Clickable prototype",
        "Flow diagrams",
      ],
      image: {
        src: "/process/3.webp",
        alt: "Wire framing & Proto typing",
        width: 480,
        height: 480,
      },
    },
    {
      title: "UI Design and Visual Identity",
      description:
        "We create polished user interfaces that reflect your brand identity. Our designs follow UX best practices for usability and engagement.",
      deliverables: [
        "UI design system",
        "High-fi screens",
        "Brand tokens",
      ],
      image: {
        src: "/process/4.webp",
        alt: "UI Design & Visual Identity",
        width: 480,
        height: 480,
      },
    },
    {
      title: "Website Development",
      description:
        "Our developers build your website using clean, optimized code. We ensure it works perfectly across devices and delivers fast load times.",
      deliverables: [
        "Responsive build",
        "CMS integration",
        "Performance pass",
      ],
      image: {
        src: "/process/5.webp",
        alt: "Website Development",
        width: 480,
        height: 480,
      },
    },
    {
      title: "Testing and Quality Assurance",
      description:
        "We conduct thorough testing across browsers and devices. Our team checks for bugs, performance issues, and ensures top-quality user experience.",
      deliverables: [
        "QA checklist",
        "Bug report log",
        "Accessibility review",
      ],
      image: {
        src: "/process/6.webp",
        alt: "Testing and Quality Assurance",
        width: 480,
        height: 480,
      },
    },
    {
      title: "Launch, Optimization, and Support",
      description:
        "We launch your website, monitor performance, and provide ongoing support. This ensures your site stays fast, secure, and fully optimized.",
      deliverables: [
        "Launch plan",
        "Analytics setup",
        "30-day support",
      ],
      image: {
        src: "/process/7.webp",
        alt: "Launch Optimization and Support",
        width: 480,
        height: 480,
      },
    },
  ] satisfies ProcessItem[],
};
