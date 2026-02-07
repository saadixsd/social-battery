import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import Badge from "./Badge";

interface BadgeControlProps {
  onSyncBadge: (color: string) => Promise<void>;
  onExit?: () => void;
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

const BadgeControl = ({ onSyncBadge, onExit }: BadgeControlProps) => {
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

  const springBouncy = { type: "spring" as const, stiffness: 340, damping: 26 };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-between bg-app px-4 pb-8 pt-[max(4rem,calc(1rem+env(safe-area-inset-top)))] sm:px-6 sm:pb-10 sm:pt-24 md:px-8 md:pb-12 md:pt-28 safe-area-insets"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Exit — top-left, above other content */}
      {onExit && (
        <motion.button
          type="button"
          className="absolute z-[50] flex touch-target min-w-0 cursor-pointer items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:bg-card hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-card left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] sm:left-6 sm:top-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          aria-label="Exit to re-pair badge"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onExit();
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <LogOut className="h-4 w-4 pointer-events-none" />
          <span className="pointer-events-none">Exit</span>
        </motion.button>
      )}

      {/* Badge — scales in with spring */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6"
          initial={{ scale: 0.6, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            delay: 0.08,
          }}
        >
          <Badge color={selectedColor} sliderValue={SLIDER_VALUE[selectedColor]} />

          {/* State label — pop on color change */}
          <motion.p
            className="text-base font-light tracking-tight text-foreground sm:text-lg"
            key={selectedColor}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={springBouncy}
          >
            {getStateLabel(selectedColor)}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom controls — slide up + fade */}
      <motion.div
        className="w-full max-w-sm space-y-5 rounded-2xl border border-border/40 bg-card/50 px-4 py-5 shadow-sm backdrop-blur-sm sm:max-w-md sm:space-y-6 sm:px-6 sm:py-6 md:max-w-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          delay: 0.18,
        }}
      >
        {/* Color buttons — staggered with spring */}
        <div className="flex items-center justify-center gap-4 sm:gap-5">
          {(["green", "yellow", "red"] as const).map((color, i) => (
            <motion.button
              key={color}
              type="button"
              className="h-12 w-12 min-w-[48px] rounded-full border-2 border-background shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:w-14"
              style={{
                backgroundColor: getThumbColor(SLIDER_VALUE[color]),
                boxShadow:
                  selectedColor === color
                    ? `0 0 24px ${getThumbColor(SLIDER_VALUE[color])}, 0 4px 12px rgba(0,0,0,0.15)`
                    : "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onClick={() => handleColorSelect(color)}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                delay: 0.12 + i * 0.07,
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label={`Set to ${color}`}
              aria-pressed={selectedColor === color}
            />
          ))}
        </div>

        {/* Sync prompt */}
        <AnimatePresence mode="wait">
          {hasChanged && !showConfirmation && (
            <motion.button
              className="mx-auto flex w-full max-w-[240px] touch-target min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-border/50 bg-secondary/70 py-3.5 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-secondary/90 sm:min-h-0"
              onClick={handleSync}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
            >
              <span
                className="h-2 w-2 rounded-full animate-glow-pulse"
                style={{ backgroundColor: getThumbColor(SLIDER_VALUE[selectedColor]) }}
              />
              Tap badge to update
            </motion.button>
          )}

          {showConfirmation && (
            <motion.div
              className="mx-auto flex items-center gap-2.5 text-sm font-medium text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
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
      </motion.div>

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
                width: 120,
                height: 120,
                backgroundColor: getThumbColor(SLIDER_VALUE[selectedColor]),
                opacity: 0.35,
              }}
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
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
