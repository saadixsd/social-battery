import { useState, useCallback, useRef } from "react";

type NFCStatus = "idle" | "scanning" | "connected" | "error";

interface UseNFCReturn {
  status: NFCStatus;
  isSupported: boolean;
  startScan: () => Promise<void>;
  simulateTap: () => void;
  writeColor: (color: string) => Promise<void>;
}

export function useNFC(): UseNFCReturn {
  const [status, setStatus] = useState<NFCStatus>("idle");
  const readerRef = useRef<any>(null);

  // Check if Web NFC API is available
  const isSupported = typeof window !== "undefined" && "NDEFReader" in window;

  const startScan = useCallback(async () => {
    if (!isSupported) return;

    try {
      setStatus("scanning");
      const NDEFReader = (window as any).NDEFReader;
      const reader = new NDEFReader();
      readerRef.current = reader;

      await reader.scan();

      reader.addEventListener("reading", () => {
        // Vibrate on successful read if supported
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        setStatus("connected");
      });

      reader.addEventListener("readingerror", () => {
        setStatus("error");
      });
    } catch {
      setStatus("error");
    }
  }, [isSupported]);

  const simulateTap = useCallback(() => {
    setStatus("scanning");

    // Vibrate for tactile feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }

    // Simulate a brief scan delay for realism
    setTimeout(() => {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setStatus("connected");
    }, 1200);
  }, []);

  const writeColor = useCallback(
    async (color: string) => {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      if (isSupported && readerRef.current) {
        try {
          const NDEFReader = (window as any).NDEFReader;
          const writer = new NDEFReader();
          await writer.write({
            records: [
              {
                recordType: "text",
                data: color,
              },
            ],
          });
        } catch {
          // Silently fail — the visual confirmation still plays
        }
      }

      // Always resolve — we show the confirmation regardless
      return Promise.resolve();
    },
    [isSupported]
  );

  return {
    status,
    isSupported,
    startScan,
    simulateTap,
    writeColor,
  };
}
