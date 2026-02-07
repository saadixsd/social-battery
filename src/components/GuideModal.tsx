import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleDot, Nfc } from "lucide-react";

const GUIDE_STORAGE_KEY = "social-battery-guide-seen";

export function getGuideSeen(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(GUIDE_STORAGE_KEY) === "true";
}

export function setGuideSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(GUIDE_STORAGE_KEY, "true");
}

interface GuideModalProps {
  open: boolean;
  onContinue: () => void;
}

const steps = [
  {
    icon: CircleDot,
    title: "Pick a color",
    text: "Tap green (Open), yellow (Selective), or red (Do Not Disturb) to set your status.",
  },
  {
    icon: Nfc,
    title: "Tap your badge",
    text: "When you see “Tap badge to update”, hold your phone to the badge to sync the new color.",
  },
];

const GuideModal = ({ open, onContinue }: GuideModalProps) => {
  const handleContinue = () => {
    setGuideSeen();
    onContinue();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleContinue()}>
      <DialogContent
        className="z-[100] w-[calc(100vw-2rem)] max-w-md gap-0 overflow-hidden border border-border/50 p-0 shadow-xl rounded-2xl sm:rounded-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 pt-6 pb-5 sm:px-6 sm:pt-8 sm:pb-6">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-center"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Quick start
            </p>
            <h2 className="mt-2 text-xl font-light tracking-tight text-foreground sm:text-2xl">
              How to use
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Two steps to set your social battery
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="space-y-1 px-4 py-3 sm:px-6 sm:py-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -10, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + i * 0.08,
                ease: "easeOut",
              }}
              className="flex gap-3 rounded-xl border border-border/30 bg-muted/30 p-3 shadow-sm sm:gap-4 sm:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                <step.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground sm:text-base">{step.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border/30 bg-muted/20 px-4 py-4 sm:justify-center sm:px-6 sm:py-5">
          <Button
            onClick={handleContinue}
            size="lg"
            className="touch-target min-h-[48px] w-full rounded-xl py-4 text-base font-medium shadow-sm sm:max-w-[200px] sm:py-6"
          >
            Continue
          </Button>
        </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;
