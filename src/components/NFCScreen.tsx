import { motion } from "framer-motion";
import { useEffect } from "react";

interface NFCScreenProps {
  isNFCSupported: boolean;
  onStartScan: () => Promise<void>;
  onSimulateTap: () => void;
}

const NFCScreen = ({
  isNFCSupported,
  onStartScan,
  onSimulateTap,
}: NFCScreenProps) => {
  useEffect(() => {
    // Auto-start NFC scan if supported
    if (isNFCSupported) {
      onStartScan();
    }
  }, [isNFCSupported, onStartScan]);

  const handleTap = () => {
    if (isNFCSupported) {
      // NFC scan is already running, the user physically taps
      // The reading event in the hook will handle it
    } else {
      onSimulateTap();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pulsing rings */}
      <div
        className="relative mb-16 flex items-center justify-center"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label="Tap to connect badge"
      >
        {/* Outer ring */}
        <div className="absolute h-48 w-48 rounded-full border border-foreground/5 animate-pulse-ring" />

        {/* Middle ring */}
        <div className="absolute h-36 w-36 rounded-full border border-foreground/10 animate-pulse-ring-delay" />

        {/* Inner ring */}
        <motion.div
          className="absolute h-24 w-24 rounded-full border-2 border-foreground/15"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center NFC icon */}
        <motion.div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-secondary"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-foreground"
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
      </div>

      {/* Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="mb-2 text-xl font-light tracking-wide text-foreground">
          Tap your Parallax badge
        </h2>
        <p className="text-sm text-muted-foreground">
          {isNFCSupported
            ? "Hold your phone near the badge"
            : "Tap the icon above to connect"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default NFCScreen;
