"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";

// Hook
export function usePreload(assets: string[]) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let progressInterval: NodeJS.Timeout;
    let imagesLoaded = false;

    // Reset state
    setProgress(0);
    setDone(false);

    // Start animation after a brief moment to ensure state is reset
    const startTimeout = setTimeout(() => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (!imagesLoaded && prev < 90) {
            return Math.min(prev + 0.6, 90);
          }

          if (imagesLoaded && prev < 100) {
            return Math.min(prev + 1.2, 100);
          }

          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              if (!cancelled) setDone(true);
            }, 600);
          }

          return prev;
        });
      }, 100);
    }, 100);

    // Preload assets
    Promise.all(
      assets.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      if (!cancelled) imagesLoaded = true;
    });

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [assets]);

  return {
    progress: Math.round(progress),
    done,
  };
}

// Context (optional, if you need global loading state)
const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

// Provider Component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}