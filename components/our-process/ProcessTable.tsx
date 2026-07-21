"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProcessItem } from "@/data/process";

gsap.registerPlugin(ScrollTrigger);

const STROKE_START = "#FFFFFF22";
const STROKE_MID = "#9AFD0D";
const STROKE_END = "#67E8F9";

type ProcessTableProps = {
  items: ProcessItem[];
};

export function ProcessTable({ items }: ProcessTableProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      let disposed = false;
      const triggers: ScrollTrigger[] = [];
      const tweens: gsap.core.Tween[] = [];

      const setup = () => {
        if (disposed) return;

        const rows = Array.from(
          list.querySelectorAll<HTMLElement>(".process-mobile-row"),
        );

        rows.forEach((row) => {
          const strokeText =
            row.querySelector<SVGTextElement>(".stroke-number");
          if (!strokeText) return;

          const length = Math.max(
            strokeText.getComputedTextLength() * 3.2,
            280,
          );

          gsap.set(strokeText, {
            strokeDasharray: length,
            strokeDashoffset: length,
            stroke: STROKE_START,
            fill: "transparent",
          });

          const tween = gsap.to(strokeText, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "center 45%",
              scrub: 0.6,
              onUpdate: (self) => {
                const p = self.progress;
                const color =
                  p < 0.55
                    ? gsap.utils.interpolate(STROKE_START, STROKE_MID, p / 0.55)
                    : gsap.utils.interpolate(
                      STROKE_MID,
                      STROKE_END,
                      (p - 0.55) / 0.45,
                    );

                gsap.set(strokeText, {
                  stroke: color,
                  fill:
                    p > 0.7
                      ? gsap.utils.interpolate(
                        "rgba(255,255,255,0)",
                        "rgba(154,253,13,0.08)",
                        (p - 0.7) / 0.3,
                      )
                      : "transparent",
                });
              },
            },
          });

          tweens.push(tween);
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        });

        ScrollTrigger.refresh();
      };

      const fontsReady =
        typeof document !== "undefined" && document.fonts?.ready
          ? document.fonts.ready
          : Promise.resolve();

      fontsReady.then(() => {
        requestAnimationFrame(setup);
      });

      return () => {
        disposed = true;
        tweens.forEach((t) => t.kill());
        triggers.forEach((t) => t.kill());
      };
    });

    return () => {
      mm.revert();
    };
  }, [items.length]);

  return (
    <div className="mt-10 px-4 md:hidden">
      <ul ref={listRef} className="border-t border-white/15">
        {items.map((item, index) => {
          const label = String(index + 1);

          return (
            <li
              key={item.title}
              className="process-mobile-row border-b border-white/10 py-6"
            >
              <div className="relative min-h-22 pr-1">
                <svg
                  aria-hidden
                  viewBox="0 0 200 110"
                  className="pointer-events-none absolute -top-2 right-0 h-27.5 w-50 select-none"
                >
                  <text
                    className="stroke-number"
                    x="198"
                    y="92"
                    textAnchor="end"
                    fontSize="96"
                    fontWeight="700"
                    fontFamily="var(--font-manrope), ui-sans-serif, system-ui, sans-serif"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                  >
                    {label}
                  </text>
                </svg>

                <div className="relative z-10 pt-1">
                  <h3 className="max-w-[85%] text-[18px] leading-snug font-semibold text-white">
                    {item.title}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {item.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-2.5 text-[14px] leading-snug text-[#B5B5B5]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9AFD0D]" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
