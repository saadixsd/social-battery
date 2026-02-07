import { useMemo } from "react";
import { motion } from "framer-motion";

type BadgeColor = "green" | "yellow" | "red";

interface BadgeProps {
  color: BadgeColor;
  /** 0-100 slider value for smooth interpolation */
  sliderValue: number;
}

/** Returns the interpolated HSL color based on slider position */
function getInterpolatedColor(value: number): string {
  // 0 = green (142, 76%, 45%), 50 = yellow (45, 93%, 58%), 100 = red (0, 72%, 55%)
  if (value <= 50) {
    const t = value / 50;
    const h = 142 + (45 - 142) * t;
    const s = 76 + (93 - 76) * t;
    const l = 45 + (58 - 45) * t;
    return `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    const t = (value - 50) / 50;
    const h = 45 + (0 - 45) * t;
    const s = 93 + (72 - 93) * t;
    const l = 58 + (55 - 58) * t;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}

function getGlowColor(value: number): string {
  if (value <= 50) {
    const t = value / 50;
    const h = 142 + (45 - 142) * t;
    const s = 76 + (93 - 76) * t;
    const l = 45 + (58 - 45) * t;
    return `hsla(${h}, ${s}%, ${l}%, 0.4)`;
  } else {
    const t = (value - 50) / 50;
    const h = 45 + (0 - 45) * t;
    const s = 93 + (72 - 93) * t;
    const l = 58 + (55 - 58) * t;
    return `hsla(${h}, ${s}%, ${l}%, 0.4)`;
  }
}

const Badge = ({ sliderValue }: BadgeProps) => {
  const activeColor = useMemo(
    () => getInterpolatedColor(sliderValue),
    [sliderValue]
  );
  const glowColor = useMemo(() => getGlowColor(sliderValue), [sliderValue]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow — large, soft */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
        }}
        animate={{ scale: [1.02, 0.98, 1.02], opacity: [0.8, 1, 0.8] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Badge body */}
      <motion.div
        className="relative z-10 flex items-center justify-center overflow-hidden rounded-[2rem]"
        style={{
          width: 160,
          height: 160,
          background: `linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--secondary)) 100%)`,
          boxShadow: `0 0 60px ${glowColor}, 0 4px 20px rgba(0,0,0,0.15)`,
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner LED indicator */}
        <motion.div
          className="rounded-full"
          style={{
            width: 48,
            height: 48,
            backgroundColor: activeColor,
            boxShadow: `0 0 30px ${activeColor}, 0 0 60px ${glowColor}`,
          }}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Subtle inner border */}
        <div
          className="absolute inset-2 rounded-[1.5rem] border border-foreground/5"
          aria-hidden
        />

        {/* Parallax mark — small skewed rectangle at top */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div
            className="h-1 w-6 rounded-full bg-foreground/10"
            style={{ transform: "skewX(-12deg)" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Badge;
export { getInterpolatedColor };
