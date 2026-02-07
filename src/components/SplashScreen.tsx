import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const easeOutExpo = [0.16, 1, 0.3, 1];
const springSoft = { type: "spring" as const, stiffness: 260, damping: 28 };

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-app px-4 safe-area-insets"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1600);
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-4 sm:gap-5"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: easeOutExpo }}
      >
        {/* Logo mark — layered entrance + subtle pop */}
        <motion.div
          className="relative h-14 w-14 sm:h-16 sm:w-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl bg-foreground/10 shadow-lg"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
          />
          <motion.div
            className="absolute inset-1 rounded-xl bg-foreground shadow-md"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ x: 12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeOutExpo }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl border border-foreground/5"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 0.4, delay: 0.85, ease: easeOutExpo }}
          />
        </motion.div>

        {/* Wordmark — reveal with slight lift */}
        <motion.h1
          className="text-xl font-light tracking-[0.2em] uppercase text-foreground sm:text-2xl sm:tracking-[0.28em]"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.58, ease: easeOutExpo }}
        >
          Social Battery
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground sm:text-xs sm:tracking-[0.18em]"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.88, ease: easeOutExpo }}
        >
          Set your status
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
