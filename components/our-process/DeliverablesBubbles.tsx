const FRAME_THEMES = [
  { accent: "#9AFD0D", text: "#F4F4F4", grid: "rgba(154, 253, 13, 0.09)" },
  { accent: "#FF9F1C", text: "#F4F4F4", grid: "rgba(255, 159, 28, 0.09)" },
  { accent: "#48CAE4", text: "#F4F4F4", grid: "rgba(72, 202, 228, 0.09)" },
  { accent: "#FFD60A", text: "#F4F4F4", grid: "rgba(255, 214, 10, 0.09)" },
  { accent: "#C77DFF", text: "#F4F4F4", grid: "rgba(199, 125, 255, 0.09)" },
  { accent: "#52B788", text: "#F4F4F4", grid: "rgba(82, 183, 136, 0.09)" },
  { accent: "#FF6B6B", text: "#F4F4F4", grid: "rgba(255, 107, 107, 0.09)" },
] as const;

export type FrameSide = "left" | "right";

export function getBubbleSide(stepIndex: number): FrameSide {
  return stepIndex % 2 === 0 ? "left" : "right";
}

type DeliverablesFrameProps = {
  deliverables: string[];
  stepIndex: number;
  className?: string;
};

export function DeliverablesBubbles({
  deliverables,
  stepIndex,
  className = "",
}: DeliverablesFrameProps) {
  const side = getBubbleSide(stepIndex);
  const theme = FRAME_THEMES[stepIndex % FRAME_THEMES.length];

  return (
    <div
      data-bubble-side={side}
      className={`process-deliverables relative ${className}`}
      style={{ color: theme.text }}
      aria-hidden
    >
      <div className="relative min-w-[220px] max-w-[300px] px-2 py-2 md:px-1 md:py-1">
        <FadedGrid gridColor={theme.grid} />

        <div className="relative z-10 px-3 py-3 md:px-4 md:py-4">
          <span
            className="deliverable-label mb-3 block text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{ color: theme.accent }}
          >
            Deliverables
          </span>
          <ul className="space-y-2.5">
            {deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="deliverable-list-item flex items-start gap-2.5 text-[15px] leading-snug font-medium"
              >
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FadedGrid({ gridColor }: { gridColor: string }) {
  const fadeMask =
    "radial-gradient(ellipse 78% 72% at 50% 50%, #000 18%, transparent 100%)";

  return (
    <div
      className="pointer-events-none absolute -inset-6 md:-inset-10 lg:-inset-12"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          WebkitMaskImage: fadeMask,
          maskImage: fadeMask,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, #111111 100%)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}
