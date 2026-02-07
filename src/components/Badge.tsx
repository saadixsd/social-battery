import { motion } from "framer-motion";

type BadgeColor = "green" | "yellow" | "red";

interface BadgeProps {
  color: BadgeColor;
  /** 0-100 slider value for smooth interpolation */
  sliderValue: number;
}

/** Returns the interpolated HSL color based on slider position */
function getInterpolatedColor(value: number): string {
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
    return `hsla(${h}, ${s}%, ${l}%, 0.5)`;
  } else {
    const t = (value - 50) / 50;
    const h = 45 + (0 - 45) * t;
    const s = 93 + (72 - 93) * t;
    const l = 58 + (55 - 58) * t;
    return `hsla(${h}, ${s}%, ${l}%, 0.5)`;
  }
}

const SEGMENTS: { color: BadgeColor; bg: string; bgDim: string }[] = [
  { color: "red", bg: "hsl(0, 72%, 55%)", bgDim: "hsl(0, 40%, 22%)" },
  { color: "yellow", bg: "hsl(45, 93%, 58%)", bgDim: "hsl(45, 50%, 25%)" },
  { color: "green", bg: "hsl(142, 76%, 45%)", bgDim: "hsl(142, 40%, 22%)" },
];

const GLOW_BY_COLOR = {
  red: getGlowColor(100),
  yellow: getGlowColor(50),
  green: getGlowColor(0),
};

const Badge = ({ color: selectedColor, sliderValue }: BadgeProps) => {
  const glowColor = getGlowColor(sliderValue);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow behind the lit segment */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 100,
          background: `radial-gradient(ellipse 60% 80%, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hardware casing — dark grey, rounded, with clip */}
      <motion.div
        className="relative z-10 flex overflow-visible rounded-[1rem] border-2 border-[#2a2d32] bg-[#3a3d42] sm:rounded-[1.25rem]"
        style={{
          width: "min(200px, 48vw)",
          height: "min(72px, 18vw)",
          boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.35), 0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        {/* Three segments: red (left), yellow (middle), green (right) */}
        <div className="flex flex-1 gap-[2px] p-[5px] sm:gap-[3px] sm:p-[6px] overflow-hidden rounded-[0.7rem] sm:rounded-[0.9rem]">
          {SEGMENTS.map(({ color, bg, bgDim }) => {
            const isLit = color === selectedColor;
            const segmentGlow = GLOW_BY_COLOR[color];
            return (
              <motion.div
                key={color}
                className="relative flex-1 rounded-[6px] sm:rounded-[8px] overflow-hidden"
                style={{
                  background: isLit ? bg : bgDim,
                  boxShadow: isLit
                    ? `inset 0 0 20px rgba(255,255,255,0.15), 0 0 24px ${segmentGlow}`
                    : "inset 0 2px 6px rgba(0,0,0,0.4)",
                  transform: "skewX(-8deg)",
                }}
                animate={{
                  filter: isLit ? "brightness(1.2)" : "brightness(0.55)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
              >
                {/* Inner highlight when lit */}
                {isLit && (
                  <motion.div
                    className="absolute inset-0 rounded-[6px] sm:rounded-[8px]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Clip / protrusion on the right — lighter grey */}
        <div
          className="absolute -right-1 top-1/2 h-[55%] w-2.5 -translate-y-1/2 rounded-l bg-[#4a4d52] shadow-[2px_0_6px_rgba(0,0,0,0.35)] sm:w-3 sm:-right-1.5"
          aria-hidden
        />
      </motion.div>
    </div>
  );
};

export default Badge;
export { getInterpolatedColor };
