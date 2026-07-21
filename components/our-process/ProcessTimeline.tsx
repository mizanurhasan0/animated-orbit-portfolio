"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type { ProcessItem } from "@/data/process";
import { getPathConfig } from "./path-configs";
import { DeliverablesBubbles } from "./DeliverablesBubbles";
import { StrokeNumber } from "./StrokeNumber";
import { setupStrokeNumbers } from "./strokeNumberAnimation";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const IMAGE = {
  hidden: { opacity: 0, scale: 0.84, visibility: "hidden" as const },
  visible: { opacity: 0.4, scale: 1, visibility: "visible" as const },
  initial: { opacity: 0, scale: 0.8 },
};

function hideImage(el: Element | null, index: number) {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.to(el, {
    opacity: IMAGE.hidden.opacity,
    scale: IMAGE.hidden.scale,
    rotation: index % 2 === 0 ? 8 : -8,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(el, { visibility: IMAGE.hidden.visibility });
    },
  });
}

function showImage(el: Element | null, index: number) {
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.set(el, {
    opacity: IMAGE.initial.opacity,
    scale: IMAGE.initial.scale,
    rotation: index % 2 === 0 ? 12 : -13,
    transformOrigin: "center center",
    visibility: IMAGE.visible.visibility,
  });
  gsap.to(el, {
    opacity: IMAGE.visible.opacity,
    scale: IMAGE.visible.scale,
    duration: 0.4,
    ease: "power2.out",
  });
}

function hideDeliverables(el: Element | null) {
  if (!el) return;
  const items = el.querySelectorAll(".deliverable-list-item");
  const label = el.querySelector(".deliverable-label");
  gsap.killTweensOf([el, ...items, label].filter(Boolean));

  gsap.to(el, {
    autoAlpha: 0,
    y: 10,
    duration: 0.28,
    ease: "power2.in",
  });

  gsap.to([label, ...items], {
    autoAlpha: 0,
    y: 4,
    duration: 0.2,
    ease: "power2.in",
    stagger: 0.03,
  });
}

function showDeliverables(el: Element | null) {
  if (!el) return;
  const items = el.querySelectorAll(".deliverable-list-item");
  const label = el.querySelector(".deliverable-label");
  const side = el.getAttribute("data-bubble-side");
  const fromX = side === "right" ? 10 : -10;

  gsap.killTweensOf([el, ...items, label].filter(Boolean));

  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" },
  );

  if (label) {
    gsap.fromTo(
      label,
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out", delay: 0.12 },
    );
  }

  gsap.fromTo(
    items,
    { autoAlpha: 0, x: fromX, y: 4 },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: 0.34,
      stagger: 0.07,
      ease: "power2.out",
      delay: 0.18,
    },
  );
}

function toggleArrow(el: Element | null, show: boolean) {
  if (!el) return;
  gsap.to(el, {
    autoAlpha: +!!show,
    scale: show ? 1.2 : 1,
    duration: 0.4,
  });
}

function stepFromProgress(progress: number, count: number) {
  for (let i = 0; i < count; i++) {
    const start = i / count;
    const end = (i + 1) / count;
    if (progress >= start && progress < end) return i;
  }
  return -1;
}

function scrollEnd(lastItem: HTMLElement | undefined, viewportHeight: number) {
  if (!lastItem) return "bottom 0%";
  const distance = lastItem.offsetTop + lastItem.offsetHeight;
  const padding = Math.max(0.3 * viewportHeight, 350);
  return `+=${distance + padding}`;
}

function getDeliverablePositionClass(index: number) {
  const isOddStep = index % 2 === 0;

  if (isOddStep) {
    return "md:right-[calc(100%+8px)] md:left-auto md:top-0 md:bottom-auto lg:right-[calc(100%+16px)]";
  }

  return "md:left-[calc(100%+8px)] md:right-auto md:top-0 md:bottom-auto lg:left-[calc(100%+16px)]";
}

type ProcessTimelineProps = {
  items: ProcessItem[];
};

export function ProcessTimeline({ items }: ProcessTimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const activeIndexRef = useRef<number | null>(null);
  const activeImageRef = useRef<Element | null>(null);
  const activeDeliverablesRef = useRef<Element | null>(null);
  const matchMediaRef = useRef<gsap.MatchMedia | null>(null);

  const pathConfig = getPathConfig(items.length);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    const arrow = arrowRef.current;
    if (!wrapper || !path || !arrow) return;

    const allDeliverables = wrapper.querySelectorAll(".process-deliverables");
    gsap.set(allDeliverables, { autoAlpha: 0, y: 12 });

    const hideAllDeliverables = (except?: Element | null) => {
      allDeliverables.forEach((el) => {
        if (except && el === except) return;
        hideDeliverables(el);
      });
    };

    matchMediaRef.current = gsap.matchMedia();

    matchMediaRef.current.add("(min-width: 769px)", () => {
      const containers = Array.from(
        wrapper.querySelectorAll<HTMLElement>(".process-item-container"),
      );
      const count = containers.length;
      if (!count) return;

      gsap.set(arrow, {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 1.2,
        willChange: "transform",
      });
      gsap.set(allDeliverables, { autoAlpha: 0, y: 12 });

      const cleanupStrokeNumbers = setupStrokeNumbers(wrapper, {
        rowSelector: ".process-item-container",
        numberSelector: ".stroke-number-desktop",
        start: "top 80%",
        end: "center 40%",
      });

      const clearActiveStep = () => {
        if (activeImageRef.current && activeIndexRef.current !== null) {
          hideImage(activeImageRef.current, activeIndexRef.current);
        }
        hideAllDeliverables();
        activeIndexRef.current = null;
        activeImageRef.current = null;
        activeDeliverablesRef.current = null;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 60%",
          end: scrollEnd(containers[count - 1], window.innerHeight),
          scrub: 0.8,
          onEnter: () => toggleArrow(arrow, true),
          onLeave: () => {
            toggleArrow(arrow, false);
            clearActiveStep();
          },
          onEnterBack: () => toggleArrow(arrow, true),
          onLeaveBack: () => {
            toggleArrow(arrow, false);
            clearActiveStep();
          },
          onUpdate: (self) => {
            const step = stepFromProgress(self.progress, count);

            if (step >= 0) {
              const container = containers[step];
              const image = container?.querySelector(".process-image");
              const deliverables = container?.querySelector(
                ".process-deliverables",
              );

              if (activeIndexRef.current !== step) {
                if (activeImageRef.current) {
                  hideImage(activeImageRef.current, activeIndexRef.current ?? 0);
                }

                hideAllDeliverables(deliverables);
                if (image) showImage(image, step);
                if (deliverables) showDeliverables(deliverables);

                activeIndexRef.current = step;
                activeImageRef.current = image ?? null;
                activeDeliverablesRef.current = deliverables ?? null;
              }
            } else {
              clearActiveStep();
            }

            containers.forEach((container, index) => {
              if (index === step) {
                container.classList.add("active-process");
                gsap.to(container, {
                  scale: 1.02,
                  duration: 0.4,
                  ease: "power2.out",
                  overwrite: true,
                });
              } else {
                container.classList.remove("active-process");
                gsap.to(container, {
                  scale: 1,
                  duration: 0.4,
                  ease: "power2.out",
                  overwrite: true,
                });
              }
            });
          },
        },
      });

      timeline.to(arrow, {
        motionPath: {
          path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 1,
          end: -0.2,
        },
        ease: "none",
        duration: 1,
        force3D: true,
      });

      const pulse = gsap.to(arrow, {
        scale: 1.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);

      return () => {
        window.clearTimeout(refreshTimer);
        pulse.kill();
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.killTweensOf(arrow);
        gsap.set(arrow, { willChange: "auto" });
        gsap.set(allDeliverables, { autoAlpha: 0, y: 12 });
        cleanupStrokeNumbers();
      };
    });

    return () => {
      matchMediaRef.current?.revert();
    };
  }, [items.length]);

  return (
    <div ref={wrapperRef} className="process-wrappers relative px-4 lg:px-0">
      <div
        className="bg-shape absolute top-[200px] right-0 left-0 mx-auto hidden h-full w-[70%] px-4 lg:block lg:w-[701px] lg:px-0"
        style={{ zIndex: 5 }}
      >
        <svg
          width={pathConfig.width}
          height={pathConfig.height}
          viewBox={pathConfig.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          aria-hidden
        >
          <path
            ref={pathRef}
            d={pathConfig.path}
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <g ref={arrowRef} className="arrow-element">
            <g clipPath={`url(#${pathConfig.clipPathId})`}>
              <path d={pathConfig.arrowPath} fill="#9AFD0D" />
            </g>
          </g>
          <defs>
            <clipPath id={pathConfig.clipPathId}>
              <rect
                width="24"
                height={pathConfig.clipHeight}
                fill="white"
                transform={pathConfig.clipTransform}
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative grid gap-10 pt-10 md:grid-cols-2 lg:gap-6">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const topOffset = index === 0 ? "lg:mt-[140px]" : "lg:mt-[180px]";

          return (
            <div
              key={item.title}
              className={`process-item-container ${isEven ? "lg:-mt-[92px]" : ""}`}
              style={{ position: "relative", overflow: "visible", zIndex: 6 }}
            >
              <div className={`process-items relative ${topOffset}`}>
                <div className="relative pl-[52px] md:pl-20 lg:pl-[110px]">
                  <StrokeNumber
                    value={index + 1}
                    textAnchor="start"
                    x="4"
                    y="100"
                    fontSize={110}
                    strokeWidth={2.25}
                    viewBox="0 0 160 120"
                    numberClassName="stroke-number-desktop"
                    className="absolute top-0 left-0 h-[70px] w-[90px] md:h-[110px] md:w-[140px] lg:h-[156px] lg:w-[200px]"
                  />

                  <div className="relative pb-0">
                    <div className="relative" style={{ zIndex: 20 }}>
                      <h3 className="mb-3 text-2xl leading-[1.2] font-semibold md:leading-[1.13] lg:text-[36px] lg:leading-[44px]">
                        {item.title}
                      </h3>
                      <p className="description text-base leading-6 text-[#D9DDE1]">
                        {item.description}
                      </p>
                    </div>

                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width || 284}
                      height={item.image.height || 384}
                      className="process-image pointer-events-none absolute h-[200px] w-[200px] rounded-2xl opacity-0"
                      sizes="(max-width: 768px) 100vw, 1280px"
                      style={{
                        willChange: "transform, opacity",
                        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))",
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        top: 0,
                        right: isEven ? 20 : 0,
                        left: "auto",
                        transform: `rotate(${isEven ? 12 : -13}deg)`,
                        visibility: "hidden",
                        zIndex: -1,
                      }}
                    />
                  </div>
                </div>

                <DeliverablesBubbles
                  deliverables={item.deliverables}
                  stepIndex={index}
                  className={`z-20 mt-5 w-full md:pointer-events-none md:absolute md:mt-0 md:w-max md:max-w-[320px] lg:max-w-[340px] ${getDeliverablePositionClass(index)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
