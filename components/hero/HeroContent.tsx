"use client";

import Link from "next/link";
import { createRef, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { heroProfile } from "@/data/heroProfile";
import { HeroTechBeams } from "./HeroTechBeams";
import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { FlipWords } from "@/components/ui/FlipWords";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export function HeroContent() {
  const {
    name,
    portraitSrc,
    role,
    roleSecondary,
    flipWords,
    available,
    resumeUrl,
    hireUrl,
    expertise,
  } = heroProfile;

  const beamContainerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useMemo(
    () => expertise.map(() => createRef<HTMLDivElement>()),
    [expertise],
  );

  return (
    <div className="hero-content relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div ref={beamContainerRef} className="relative">
            <div className="relative z-10 space-y-6">
              <HeroTechBeams
                centerRef={profileRef}
                portraitSrc={portraitSrc}
                portraitAlt={name}
                theme="dark"
              />

              <div className="flex flex-col items-center justify-center space-y-5">
                {available && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto w-fit rounded-full bg-[#6060603D] px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-[#9AFD0D]" />
                    Available for work
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex max-w-2xl flex-wrap items-center justify-center gap-3"
                >
                  {expertise.map((item, i) => (
                    <div
                      key={item.label}
                      ref={badgeRefs[i]}
                      className="inline-flex items-center gap-2 rounded-full border border-[#9AFD0D]/40 bg-[#9AFD0D]/5 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-colors hover:border-[#9AFD0D]/70 hover:bg-[#9AFD0D]/10"
                    >
                      <item.Icon className="text-[#9AFD0D]" />
                      {item.label}
                    </div>
                  ))}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                >
                  Hi, I&apos;m {name}.
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl"
                >
                  I build{" "}
                  <FlipWords
                    duration={3000}
                    words={flipWords}
                    className="rounded-xl bg-gradient-to-r from-[#9AFD0D] to-[#7dd10a] px-4 py-2 text-[#111111] shadow-lg"
                  />{" "}
                  <span className="block text-white sm:inline">websites</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-lg font-semibold text-white sm:text-xl"
                >
                  {role}{" "}
                  <span className="text-[#9AFD0D]">&amp;</span> {roleSecondary}
                </motion.p>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-0">
              {badgeRefs.map((ref, i) => (
                <AnimatedBeam
                  key={i}
                  containerRef={beamContainerRef}
                  fromRef={profileRef}
                  toRef={ref}
                  duration={3.5}
                  delay={i * 0.3}
                  pathWidth={2.5}
                  pathOpacity={0.2}
                  pathColor="#9AFD0D"
                  gradientStartColor="#9AFD0D"
                  gradientStopColor="#67E8F9"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-3">
        <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Resume
            </span>
          </ShimmerButton>
        </Link>
        <Link href={hireUrl}>
          <InteractiveHoverButton className="border-white/20 bg-[#6060603D] text-white backdrop-blur-sm">
            Hire Me
          </InteractiveHoverButton>
        </Link>
      </div>
    </div>
  );
}
