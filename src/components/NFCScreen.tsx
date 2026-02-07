import { motion } from "framer-motion";
import { useEffect } from "react";

const EXIT_DURATION = 0.55;

interface NFCScreenProps {
  isNFCSupported: boolean;
  onStartScan: () => Promise<void>;
  onSimulateTap: () => void;
  isExiting?: boolean;
  onExitComplete?: () => void;
}

const NFCScreen = ({
  isNFCSupported,
  onStartScan,
  onSimulateTap,
  isExiting = false,
  onExitComplete,
}: NFCScreenProps) => {
  useEffect(() => {
    if (isNFCSupported) {
      onStartScan();
    }
  }, [isNFCSupported, onStartScan]);

  useEffect(() => {
    if (isExiting && onExitComplete) {
      const t = setTimeout(onExitComplete, EXIT_DURATION * 1000 + 50);
      return () => clearTimeout(t);
    }
  }, [isExiting, onExitComplete]);

  const handleTap = () => {
    if (isNFCSupported) {
      // NFC scan is already running, the user physically taps
    } else {
      onSimulateTap();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-app px-4 sm:px-6 md:px-8 safe-area-insets"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* NFC graphic — scales into center, then product appears */}
      <motion.div
        className="relative mb-10 flex items-center justify-center cursor-pointer sm:mb-16"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label="Tap to connect badge"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{
          scale: isExiting ? 0 : 1,
          opacity: isExiting ? 0 : 1,
        }}
        transition={
          isExiting
            ? { duration: EXIT_DURATION, ease: "easeIn" }
            : { type: "spring", stiffness: 280, damping: 26 }
        }
        whileTap={isExiting ? undefined : { scale: 0.96 }}
      >
        {/* Outer ring — staggered entrance */}
        <motion.div
          className="absolute h-40 w-40 rounded-full border border-foreground/5 animate-pulse-ring sm:h-48 sm:w-48"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute h-32 w-32 rounded-full border border-foreground/10 animate-pulse-ring-delay sm:h-36 sm:w-36"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
        />
        <motion.div
          className="absolute h-20 w-20 rounded-full border-2 border-foreground/20 sm:h-24 sm:w-24"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
        />
        <motion.div
          className="absolute h-20 w-20 rounded-full border-2 border-foreground/20 pointer-events-none sm:h-24 sm:w-24"
          initial={{ opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Center — glass style + spring tap */}
        <motion.div
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full glass border border-border/50 shadow-lg sm:h-20 sm:w-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.3 }}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.02 }}
        >
          <svg
            className="h-7 w-7 text-foreground sm:h-8 sm:w-8"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            {/* NFC-style signal waves */}
            <motion.path
              d="M6 18C6 18 6 6 12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.path
              d="M8 18C8 18 8 9 12 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.path
              d="M18 6C18 6 18 18 12 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.path
              d="M16 6C16 6 16 15 12 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Text — staggered with graphic */}
      <motion.div
        className="text-center max-w-xs px-2 sm:px-0"
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -14 : 0,
        }}
        transition={{
          duration: isExiting ? EXIT_DURATION * 0.75 : 0.55,
          delay: isExiting ? 0 : 0.35,
          ease: "easeOut",
        }}
      >
        <h2 className="mb-2 text-lg font-light tracking-tight text-foreground sm:text-xl">
          Tap your badge
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
          {isNFCSupported
            ? "Hold your phone near the badge"
            : "Tap the icon above to connect"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NFCScreen;
