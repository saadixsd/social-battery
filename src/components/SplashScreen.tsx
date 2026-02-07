import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={() => {
        // Auto-advance after the logo animation
        setTimeout(onComplete, 1800);
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo mark — two overlapping parallelograms */}
        <motion.div
          className="relative h-16 w-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl bg-foreground/10"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-1 rounded-xl bg-foreground"
            style={{ transform: "skewX(-12deg)" }}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          className="text-2xl font-light tracking-[0.3em] uppercase text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          Parallax
        </motion.h1>

        {/* Subtle tagline */}
        <motion.p
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Signal your energy
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
