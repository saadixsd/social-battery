import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ColorSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ColorSlider = ({ value, onChange }: ColorSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getValueFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      return Math.round(percent);
    },
    [value]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onChange(getValueFromEvent(e.clientX));
    },
    [onChange, getValueFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      onChange(getValueFromEvent(e.clientX));
    },
    [isDragging, onChange, getValueFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Snap to nearest zone on release
  useEffect(() => {
    if (!isDragging) {
      // Optional: could snap to 0, 50, 100 — but smooth feels better
    }
  }, [isDragging]);

  return (
    <div className="w-full px-2">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-14 cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label="Social battery color"
        tabIndex={0}
      >
        {/* Gradient bar */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 rounded-full overflow-hidden">
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, hsl(142, 76%, 45%), hsl(45, 93%, 58%), hsl(0, 72%, 55%))",
            }}
          />
        </div>

        {/* Zone indicators — subtle dots */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex w-full justify-between px-0.5 pointer-events-none">
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
        </div>

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 touch-none"
          style={{ left: `${value}%` }}
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div
            className="h-7 w-7 rounded-full border-2 border-background shadow-lg"
            style={{
              backgroundColor: getThumbColor(value),
              boxShadow: `0 0 16px ${getThumbGlow(value)}, 0 2px 8px rgba(0,0,0,0.2)`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

function getThumbColor(value: number): string {
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

function getThumbGlow(value: number): string {
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

export default ColorSlider;
