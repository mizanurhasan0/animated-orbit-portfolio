type StrokeNumberProps = {
  value: number | string;
  className?: string;
  numberClassName?: string;
  viewBox?: string;
  fontSize?: number;
  strokeWidth?: number;
  textAnchor?: "start" | "middle" | "end";
  x?: string | number;
  y?: string | number;
};

export function StrokeNumber({
  value,
  className = "",
  numberClassName = "stroke-number",
  viewBox = "0 0 200 110",
  fontSize = 96,
  strokeWidth = 2.5,
  textAnchor = "end",
  x = "198",
  y = "92",
}: StrokeNumberProps) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      className={`pointer-events-none select-none ${className}`}
    >
      <text
        className={numberClassName}
        x={x}
        y={y}
        textAnchor={textAnchor}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="var(--font-manrope), ui-sans-serif, system-ui, sans-serif"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        paintOrder="stroke fill"
      >
        {value}
      </text>
    </svg>
  );
}
