"use client";

import { useEffect, useState } from "react";

export function usePreload(assets: string[]) {
  const [progress, setProgress] = useState(1); // Start from 1
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let progressInterval: NodeJS.Timeout;
    let imagesLoaded = false;

    // Reset state
    setProgress(1); // Start from 1
    setDone(false);

    // Start animation after a brief moment to ensure state is reset
    const startTimeout = setTimeout(() => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (!imagesLoaded && prev < 90) {
            return Math.min(prev + 1.5, 90); // Faster: 1.5 instead of 0.6
          }

          if (imagesLoaded && prev < 100) {
            return Math.min(prev + 2.5, 100); // Faster: 2.5 instead of 1.2
          }

          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              if (!cancelled) setDone(true);
            }, 600);
          }

          return prev;
        });
      }, 80); // Faster interval: 80ms instead of 100ms
    }, 50); // Faster start: 50ms instead of 100ms

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