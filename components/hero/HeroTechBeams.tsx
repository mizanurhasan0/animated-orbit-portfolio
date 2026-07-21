"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { innerRing, outerRing, type TechItem } from "@/data/techStack";
import { OrbitIconTooltip } from "@/components/hero/OrbitIconTooltip";

const ACCENT_RGB = "154,253,13";

const IDLE_SPEED = 0.1;
const HOVER_SPEED_FACTOR = 0.25;
const FRICTION = 0.95;
const INNER_FACTOR = -1.35;
const MAX_VELOCITY = 30;

type OrbitRing = "inner" | "outer";

function OrbitIcon({
  tech,
  angleDeg,
  radiusPct,
  spinVar,
  ring,
  onRingHover,
  theme = "dark",
}: {
  tech: TechItem;
  angleDeg: number;
  radiusPct: number;
  spinVar: string;
  ring: OrbitRing;
  onRingHover?: (ring: OrbitRing | null) => void;
  theme?: "light" | "dark";
}) {
  const [hovered, setHovered] = useState(false);
  const a = (angleDeg * Math.PI) / 180;
  const left = (50 + radiusPct * Math.cos(a)).toFixed(4);
  const top = (50 + radiusPct * Math.sin(a)).toFixed(4);
  const Icon = tech.Icon;
  const isLight = theme === "light";
  // Inner-ring icons near the top send tooltips toward the portrait — flip below instead.
  const tooltipPlacement =
    ring === "inner" && parseFloat(top) < 50 ? "below" : "above";

  return (
    <div
      className={cn("pointer-events-auto absolute", hovered && "z-50")}
      style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ transform: `rotate(calc(-1 * var(${spinVar}, 0deg)))` }}
        onMouseEnter={() => {
          setHovered(true);
          onRingHover?.(ring);
        }}
        onMouseLeave={() => {
          setHovered(false);
          onRingHover?.(null);
        }}
      >
        <OrbitIconTooltip
          name={tech.name}
          description={tech.description}
          visible={hovered}
          placement={tooltipPlacement}
          theme={theme}
        />
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full border transition-transform duration-200 sm:size-10 md:size-12",
            hovered && "scale-110",
          )}
          style={{
            borderColor: isLight ? "rgba(34,197,94,0.35)" : `rgba(${ACCENT_RGB},0.3)`,
            backgroundColor: isLight ? "#ffffff" : "#1a1a1a",
            boxShadow: isLight
              ? "0 0 20px -8px rgba(34,197,94,0.35)"
              : `0 0 20px -8px rgba(${ACCENT_RGB},0.55)`,
          }}
        >
          <Icon
            className={cn("size-4 md:size-5", !tech.color && (isLight ? "text-neutral-900" : "text-white"))}
            style={tech.color ? { color: tech.color } : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export function HeroTechBeams({
  centerRef,
  portraitSrc = "/team/portrait.png",
  portraitAlt = "Profile portrait",
  theme = "dark",
}: {
  centerRef?: React.RefObject<HTMLDivElement | null>;
  portraitSrc?: string;
  portraitAlt?: string;
  theme?: "light" | "dark";
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const velocity = useRef(IDLE_SPEED);
  const dragging = useRef(false);
  const hoveredRef = useRef(false);
  const lastAngle = useRef(0);
  const [hoveredRing, setHoveredRing] = useState<OrbitRing | null>(null);

  const apply = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty("--ring-rot", `${rotation.current}deg`);
    el.style.setProperty("--ring-rot-inner", `${rotation.current * INNER_FACTOR}deg`);
  };

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (!dragging.current) {
        rotation.current += velocity.current;
        velocity.current *= FRICTION;
        const idleTarget = hoveredRef.current
          ? IDLE_SPEED * HOVER_SPEED_FACTOR
          : IDLE_SPEED;
        const sign = velocity.current < 0 ? -1 : 1;
        if (Math.abs(velocity.current) < idleTarget) velocity.current = idleTarget * sign;
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    apply();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const angleAt = (clientX: number, clientY: number) => {
    const r = wrapperRef.current!.getBoundingClientRect();
    return (
      (Math.atan2(clientY - (r.top + r.height / 2), clientX - (r.left + r.width / 2)) *
        180) /
      Math.PI
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    velocity.current = 0;
    lastAngle.current = angleAt(e.clientX, e.clientY);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const a = angleAt(e.clientX, e.clientY);
    let delta = a - lastAngle.current;
    if (delta > 180) delta -= 360;
    else if (delta < -180) delta += 360;
    rotation.current += delta;
    velocity.current = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, velocity.current * 0.6 + delta * 0.4),
    );
    lastAngle.current = a;
    apply();
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const isLight = theme === "light";
  const ringColor = isLight ? "rgba(34,197,94,0.2)" : `rgba(${ACCENT_RGB},0.15)`;

  return (
    <div className="hero-orbit mx-auto flex w-full flex-col items-center">
      <div
        className="relative aspect-square w-full max-w-[520px] overflow-visible select-none"
        onMouseEnter={() => {
          hoveredRef.current = true;
          velocity.current *= HOVER_SPEED_FACTOR;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed [height:86%] [width:86%]"
            style={{ borderColor: ringColor }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed [height:54%] [width:54%]"
            style={{ borderColor: ringColor }}
          />
        </div>

        <div
          ref={centerRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-square w-1/3 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 bg-white shadow-[0_0_60px_-8px_rgba(34,197,94,0.55)]"
          style={{
            borderColor: isLight ? "rgba(34,197,94,0.6)" : `rgba(${ACCENT_RGB},0.6)`,
            backgroundColor: isLight ? "#ffffff" : "#1a1a1a",
            boxShadow: isLight
              ? "0 0 60px -8px rgba(34,197,94,0.55)"
              : `0 0 60px -8px rgba(${ACCENT_RGB},0.8)`,
          }}
        >
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            fill
            draggable={false}
            sizes="(max-width: 768px) 130px, 180px"
            className="object-cover object-center"
            priority
          />
        </div>

        <div
          ref={wrapperRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: "none" }}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[15]",
              hoveredRing === "outer" && "z-[35]",
            )}
            style={{ transform: "rotate(var(--ring-rot, 0deg))" }}
          >
            {outerRing.map((t, i) => (
              <OrbitIcon
                key={t.name}
                tech={t}
                angleDeg={(360 / outerRing.length) * i - 90}
                radiusPct={43}
                spinVar="--ring-rot"
                ring="outer"
                onRingHover={setHoveredRing}
                theme={theme}
              />
            ))}
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[25]",
              hoveredRing === "inner" && "z-[35]",
              hoveredRing === "outer" && "z-[15]",
            )}
            style={{ transform: "rotate(var(--ring-rot-inner, 0deg))" }}
          >
            {innerRing.map((t, i) => (
              <OrbitIcon
                key={t.name}
                tech={t}
                angleDeg={(360 / innerRing.length) * i - 90}
                radiusPct={27}
                spinVar="--ring-rot-inner"
                ring="inner"
                onRingHover={setHoveredRing}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>

      <p className={cn("mt-1 text-xs", isLight ? "text-neutral-500" : "text-white/40")}>
        ↻ Drag the ring to spin — fling it to keep it going
      </p>
    </div>
  );
}
