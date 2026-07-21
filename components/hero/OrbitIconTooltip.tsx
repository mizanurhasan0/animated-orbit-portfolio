"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type OrbitIconTooltipProps = {
  name: string;
  description: string;
  visible: boolean;
  placement?: "above" | "below";
  theme?: "light" | "dark";
};

export function OrbitIconTooltip({
  name,
  description,
  visible,
  placement = "above",
  theme = "dark",
}: OrbitIconTooltipProps) {
  const isLight = theme === "light";
  const isAbove = placement === "above";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: isAbove ? 8 : -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isAbove ? 8 : -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 w-max max-w-[200px] -translate-x-1/2 rounded-lg border px-3 py-2 text-center shadow-lg backdrop-blur-sm",
            isAbove ? "bottom-full mb-2" : "top-full mt-2",
            isLight
              ? "border-green-500/40 bg-white/95 text-neutral-900"
              : "border-[#a3e635]/40 bg-[#1a1a1a]/95 text-white",
          )}
        >
          <p className="text-xs font-semibold leading-tight">{name}</p>
          <p
            className={cn(
              "mt-1 text-[10px] leading-snug",
              isLight ? "text-neutral-600" : "text-white/60",
            )}
          >
            {description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
