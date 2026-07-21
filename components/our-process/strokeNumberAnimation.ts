import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const STROKE_START = "#FFFFFF22";
export const STROKE_MID = "#9AFD0D";
export const STROKE_END = "#67E8F9";

type SetupStrokeNumbersOptions = {
  rowSelector: string;
  numberSelector?: string;
  start?: string;
  end?: string;
  scrub?: number;
};

export function setupStrokeNumbers(
  root: HTMLElement,
  {
    rowSelector,
    numberSelector = ".stroke-number",
    start = "top 85%",
    end = "center 45%",
    scrub = 0.6,
  }: SetupStrokeNumbersOptions,
) {
  const triggers: ScrollTrigger[] = [];
  const tweens: gsap.core.Tween[] = [];
  let disposed = false;

  const setup = () => {
    if (disposed) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>(rowSelector));

    rows.forEach((row) => {
      const strokeText = row.querySelector<SVGTextElement>(numberSelector);
      if (!strokeText) return;

      const length = Math.max(strokeText.getComputedTextLength() * 3.2, 280);

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
          start,
          end,
          scrub,
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
}
