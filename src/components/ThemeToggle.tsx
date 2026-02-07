import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      className="fixed top-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 backdrop-blur-md border border-border/50 text-muted-foreground"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </motion.button>
  );
};

export default ThemeToggle;
