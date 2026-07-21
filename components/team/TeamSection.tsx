"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamSection } from "@/data/team";
import {
  drawMemberFrame,
  drawStaticPortrait,
  preloadFrames,
  preloadImage,
  setupCanvas,
} from "@/lib/team/canvas";
import {
  getActiveMemberState,
  getContentTiming,
  getFrameProgress,
  getScrollDistance,
  HEADER_EXIT_DURATION,
} from "@/lib/team/scrollMath";
import {
  getTeamFramePath,
  isSequenceMember,
  isStaticMember,
  type TeamMember,
} from "@/data/team";
import { TeamMemberCard } from "./TeamMemberCard";

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sequenceImagesRef = useRef<Record<string, HTMLImageElement[] | null>>({});
  const staticImagesRef = useRef<Record<string, HTMLImageElement | null>>({});

  useEffect(() => {
    const header = headerRef.current;
    const pin = pinRef.current;
    if (!header || !pin) return;

    let mounted = true;
    const members = teamSection.members;
    const resizers: (() => void)[] = [];

    members.forEach((member) => {
      const canvas = canvasRefs.current[member.id];
      if (canvas) {
        const resize = setupCanvas(canvas);
        if (resize) resizers.push(resize);
      }
    });

    const onResize = () => {
      resizers.forEach((fn) => fn());
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const preloadPromises = members.map(async (member) => {
      if (isSequenceMember(member)) {
        sequenceImagesRef.current[member.id] = await preloadFrames(
          (frame) => getTeamFramePath(member, frame),
          member.frameCount,
        );
      } else if (isStaticMember(member)) {
        staticImagesRef.current[member.id] = await preloadImage(member.imageSrc);
      }
    });

    Promise.all(preloadPromises).then(() => {
      if (!mounted) return;
      ScrollTrigger.refresh();
    });

    gsap.set(
      members.map((m) => cardRefs.current[m.id]).filter(Boolean),
      { x: () => -window.innerWidth * 0.55, opacity: 0 },
    );

    const scrollDistance = getScrollDistance(members.length);
    const { contentStart, contentDuration, segment, enterDuration, exitDuration } =
      getContentTiming(members.length);

    const drawActiveMember = (member: TeamMember, frameProgress: number) => {
      const canvas = canvasRefs.current[member.id];
      if (!canvas) return;

      if (isSequenceMember(member)) {
        drawMemberFrame(
          canvas,
          member.frameCount,
          member.loopCount,
          sequenceImagesRef.current[member.id],
          frameProgress,
        );
      } else if (isStaticMember(member)) {
        drawStaticPortrait(
          canvas,
          staticImagesRef.current[member.id],
          frameProgress,
        );
      }
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: pin,
        scrub: 0.85,
        anticipatePin: 1,
        onUpdate: (self) => {
          const animProgress =
            self.progress <= contentStart
              ? 0
              : (self.progress - contentStart) / contentDuration;
          const { index, local } = getActiveMemberState(
            animProgress,
            members.length,
          );
          const active = members[index];
          const frameProgress = getFrameProgress(local);
          drawActiveMember(active, frameProgress);
        },
      },
    });

    timeline.to(
      header,
      {
        y: () => -(header.offsetHeight * 0.65),
        opacity: 0,
        duration: HEADER_EXIT_DURATION,
        ease: "power2.inOut",
      },
      0,
    );

    members.forEach((member, index) => {
      const card = cardRefs.current[member.id];
      if (!card) return;

      const tStart = contentStart + index * segment;

      timeline.fromTo(
        card,
        { x: () => -window.innerWidth * 0.55, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: enterDuration,
          ease: "power3.out",
        },
        tStart,
      );

      if (index < members.length - 1) {
        timeline.to(
          card,
          {
            x: () => window.innerWidth * 0.55,
            opacity: 0,
            duration: exitDuration,
            ease: "power3.in",
          },
          tStart + segment - exitDuration,
        );
      }
    });

    return () => {
      mounted = false;
      timeline.scrollTrigger?.kill();
      timeline.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { badge, title, description, members } = teamSection;

  return (
    <section ref={sectionRef} className="relative bg-[#111111] text-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen flex-col overflow-hidden px-4"
      >
        <div
          ref={headerRef}
          className="mx-auto w-full max-w-[1020px] shrink-0 pt-16 pb-4 text-center lg:px-0 lg:pt-24 lg:pb-6"
        >
          <span className="inline-block rounded-[40px] bg-[#6060603D] px-4 py-2 text-base leading-6 font-medium text-white">
            <span className="mr-3 inline-flex h-3 w-3 rounded-full bg-[#9AFD0D]" />
            {badge}
          </span>
          <h2 className="mt-3 text-[32px] leading-[1.13] font-semibold md:text-5xl md:tracking-tight lg:text-[72px] lg:leading-[82px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-[1.4] text-[#B5B5B5] lg:text-xl lg:leading-8">
            {description}
          </p>
        </div>

        <div className="flex flex-1 items-start justify-center pb-16 md:pb-20">
          <div className="relative aspect-[3/4] w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]">
            {members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                cardRef={(el) => {
                  cardRefs.current[member.id] = el;
                }}
                canvasRef={(el) => {
                  canvasRefs.current[member.id] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
