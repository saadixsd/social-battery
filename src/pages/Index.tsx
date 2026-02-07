import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import NFCScreen from "../components/NFCScreen";
import BadgeControl from "../components/BadgeControl";
import ThemeToggle from "../components/ThemeToggle";
import GuideModal from "../components/GuideModal";
import { useNFC } from "../hooks/useNFC";
import { useTheme } from "../hooks/useTheme";

type AppScreen = "splash" | "nfc" | "control";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [showGuide, setShowGuide] = useState(false);
  const [nfcExiting, setNfcExiting] = useState(false);
  const { status, isSupported, startScan, simulateTap, writeColor, resetConnection } = useNFC();
  const { theme, toggleTheme } = useTheme();

  // Transition from splash → nfc
  const handleSplashComplete = useCallback(() => {
    setScreen("nfc");
  }, []);

  // Show guide when user lands on NFC screen (shows again on every refresh)
  useEffect(() => {
    if (screen === "nfc") {
      const t = setTimeout(() => setShowGuide(true), 200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // Transition from nfc → control when NFC connects
  const handleSimulateTap = useCallback(() => {
    simulateTap();
  }, [simulateTap]);

  // When NFC connects: play "sprinkles into dust" then go to control
  useEffect(() => {
    if (status === "connected" && screen === "nfc" && !nfcExiting) {
      setNfcExiting(true);
    }
  }, [status, screen, nfcExiting]);

  const handleNfcExitComplete = useCallback(() => {
    setNfcExiting(false);
    setScreen("control");
  }, []);

  // Exit from control screen → back to NFC (re-pair)
  const handleExitToNfc = useCallback(() => {
    resetConnection(); // so we don’t immediately bounce back to control
    setScreen("nfc");
  }, [resetConnection]);

  // Sync badge color via NFC write
  const handleSyncBadge = useCallback(
    async (color: string) => {
      await writeColor(color);
    },
    [writeColor]
  );

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full max-w-[100vw] bg-app overflow-x-hidden overflow-y-auto transition-colors duration-500">
      {/* Theme toggle — always visible except on splash */}
      {screen !== "splash" && (
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      )}

      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {screen === "nfc" && (
          <>
            <NFCScreen
              key="nfc"
              isNFCSupported={isSupported}
              onStartScan={startScan}
              onSimulateTap={handleSimulateTap}
              isExiting={nfcExiting}
              onExitComplete={handleNfcExitComplete}
            />
            <GuideModal open={showGuide} onContinue={() => setShowGuide(false)} />
          </>
        )}

        {screen === "control" && (
          <BadgeControl
            key="control"
            onSyncBadge={handleSyncBadge}
            onExit={handleExitToNfc}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
