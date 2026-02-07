import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import NFCScreen from "../components/NFCScreen";
import BadgeControl from "../components/BadgeControl";
import ThemeToggle from "../components/ThemeToggle";
import { useNFC } from "../hooks/useNFC";
import { useTheme } from "../hooks/useTheme";

type AppScreen = "splash" | "nfc" | "control";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const { status, isSupported, startScan, simulateTap, writeColor } = useNFC();
  const { theme, toggleTheme } = useTheme();

  // Transition from splash → nfc
  const handleSplashComplete = useCallback(() => {
    setScreen("nfc");
  }, []);

  // Transition from nfc → control when NFC connects
  const handleSimulateTap = useCallback(() => {
    simulateTap();
  }, [simulateTap]);

  // Watch NFC status for connected
  if (status === "connected" && screen === "nfc") {
    // Use setTimeout to avoid state update during render
    setTimeout(() => setScreen("control"), 0);
  }

  // Sync badge color via NFC write
  const handleSyncBadge = useCallback(
    async (color: string) => {
      await writeColor(color);
    },
    [writeColor]
  );

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-background overflow-hidden">
      {/* Theme toggle — always visible except on splash */}
      {screen !== "splash" && (
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      )}

      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {screen === "nfc" && (
          <NFCScreen
            key="nfc"
            isNFCSupported={isSupported}
            onStartScan={startScan}
            onSimulateTap={handleSimulateTap}
          />
        )}

        {screen === "control" && (
          <BadgeControl key="control" onSyncBadge={handleSyncBadge} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
