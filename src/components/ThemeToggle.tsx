import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      className="fixed z-40 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full glass border border-border/50 p-2.5 text-muted-foreground shadow-sm [top:max(1rem,env(safe-area-inset-top))] [right:max(1rem,env(safe-area-inset-right))] sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0 sm:p-0"
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
