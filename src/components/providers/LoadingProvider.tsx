"use client";

import { ReactNode, useState, useEffect } from "react";
import { LoadingScreen } from "../loading/LoadingScreen";

interface LoadingProviderProps {
  children: ReactNode;
  loadingDelay?: number;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  loadingDelay = 2000,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Minimum loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  // Wait for all images to load
  useEffect(() => {
    const checkImages = () => {
      const images = document.querySelectorAll("img");
      let loadedCount = 0;
      let totalImages = images.length;

      if (totalImages === 0) {
        // No images found, check again after a delay in case content is still loading
        setTimeout(checkImages, 500);
        return;
      }

      const imagePromises = Array.from(images).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }
          }),
      );

      Promise.all(imagePromises).then(() => {
        setImagesLoaded(true);
      });
    };

    // Wait a bit for DOM to be ready and content to render
    const timeoutId = setTimeout(checkImages, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Hide loading screen when both conditions are met
  useEffect(() => {
    if (imagesLoaded && minTimeElapsed) {
      setIsLoading(false);
    }
  }, [imagesLoaded, minTimeElapsed]);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          loadingDelay={loadingDelay}
          onComplete={() => setIsLoading(false)}
        />
      )}
      {!isLoading && children}
    </>
  );
};
