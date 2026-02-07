import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";

interface BadgeControlProps {
  onSyncBadge: (color: string) => Promise<void>;
}

type BadgeState = "green" | "yellow" | "red";

const SLIDER_VALUE: Record<BadgeState, number> = {
  green: 0,
  yellow: 50,
  red: 100,
};

function getStateLabel(state: BadgeState): string {
  switch (state) {
    case "green":
      return "Open";
    case "yellow":
      return "Selective";
    case "red":
      return "Do Not Disturb";
  }
}

const BadgeControl = ({ onSyncBadge }: BadgeControlProps) => {
  const [selectedColor, setSelectedColor] = useState<BadgeState>("green");
  const [hasChanged, setHasChanged] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleColorSelect = useCallback((color: BadgeState) => {
    setSelectedColor(color);
    setHasChanged(true);
  }, []);

  const handleSync = useCallback(async () => {
    if (!hasChanged || syncing) return;

    setSyncing(true);
    await onSyncBadge(selectedColor);

    setShowConfirmation(true);
    setSyncing(false);
    setHasChanged(false);
    setTimeout(() => setShowConfirmation(false), 2000);
  }, [hasChanged, syncing, selectedColor, onSyncBadge]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-between bg-background px-8 pb-12 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Badge visualization — centered */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Badge color={selectedColor} sliderValue={SLIDER_VALUE[selectedColor]} />

          {/* State label */}
          <motion.p
            className="text-lg font-light tracking-wide text-foreground"
            key={selectedColor}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getStateLabel(selectedColor)}
          </motion.p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="w-full max-w-sm space-y-6">
        {/* Color buttons */}
        <div className="flex items-center justify-center gap-4">
          {(["green", "yellow", "red"] as const).map((color) => (
            <motion.button
              key={color}
              type="button"
              className="h-12 w-12 rounded-full border-2 border-background shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                backgroundColor: getThumbColor(SLIDER_VALUE[color]),
                boxShadow:
                  selectedColor === color
                    ? `0 0 20px ${getThumbColor(SLIDER_VALUE[color])}, 0 2px 8px rgba(0,0,0,0.2)`
                    : "0 2px 8px rgba(0,0,0,0.2)",
              }}
              onClick={() => handleColorSelect(color)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label={`Set to ${color}`}
              aria-pressed={selectedColor === color}
            />
          ))}
        </div>

        {/* Sync prompt */}
        <AnimatePresence mode="wait">
          {hasChanged && !showConfirmation && (
            <motion.button
              className="mx-auto flex items-center gap-2 rounded-full bg-secondary/60 backdrop-blur-md border border-border/50 px-6 py-3 text-sm text-muted-foreground"
              onClick={handleSync}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="inline-block h-2 w-2 rounded-full animate-glow-pulse"
                style={{ backgroundColor: getThumbColor(SLIDER_VALUE[selectedColor]) }}
              />
              Tap badge to update
            </motion.button>
          )}

          {showConfirmation && (
            <motion.div
              className="mx-auto flex items-center gap-2 text-sm text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Animated checkmark */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <motion.circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.path
                  d="M6 10l3 3 5-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="24"
                  strokeDashoffset="24"
                  className="animate-check-draw"
                  initial={{ strokeDashoffset: 24 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </svg>
              Badge updated
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect on sync */}
      <AnimatePresence>
        {syncing && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-30"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: 100,
                height: 100,
                backgroundColor: getThumbColor(SLIDER_VALUE[selectedColor]),
                opacity: 0.3,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

export default BadgeControl;
