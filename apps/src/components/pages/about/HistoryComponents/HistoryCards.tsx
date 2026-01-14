"use client";

import { useRef, useState } from "react";
import HistoryCard from "./HistoryCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const historyImages = [
  "/about/history/cards/img1.png",
  "/about/history/cards/img2.png",
  "/about/history/cards/img3.png",
  "/about/history/cards/img4.png",
  "/about/history/cards/img5.png",
  "/about/history/cards/img6.png",
  "/about/history/cards/img7.png",
];



// Refined SLOTS to fit 100% width relative container
const POSITIONS = [
  { left: "0%",   width: "12vw", height: "35vh", zIndex: 10 }, 
  { left: "13%",  width: "12vw", height: "35vh", zIndex: 10 }, 
  { left: "26%",  width: "22vw", height: "64vh", zIndex: 50 }, // Highlight
  { left: "49%",  width: "12vw", height: "35vh", zIndex: 10 }, 
  { left: "62%",  width: "12vw", height: "35vh", zIndex: 10 }, 
  { left: "75%",  width: "12vw", height: "35vh", zIndex: 10 }, 
  { left: "88%",  width: "12vw", height: "35vh", zIndex: 10 }, 
];

export default function HistoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [slotIndices, setSlotIndices] = useState([0, 1, 2, 3, 4, 5, 6]);

  useGSAP(() => {
    const interval = setInterval(() => {
      setSlotIndices((prev) => {
        const next = [...prev];
        return next.map((currentSlot) => (currentSlot + 1) % 7);
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, { scope: containerRef });

  useGSAP(() => {
    slotIndices.forEach((slotIndex, imageIndex) => {
      const card = cardsRef.current[imageIndex];
      if (!card) return;

      const targetPos = POSITIONS[slotIndex];
      const isWrapping = slotIndex === 0;
      
      gsap.to(card, {
        left: targetPos.left,
        width: targetPos.width,
        height: targetPos.height,
        zIndex: isWrapping ? 0 : targetPos.zIndex, 
        duration: 1,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    });
  }, [slotIndices]); 
  // Dependency on state ensures animation triggers on change.

  return (
    <div ref={containerRef} className="relative w-full h-[64vh]">
      {historyImages.map((src, i) => (
        <div
          key={i}
          ref={(el) => { cardsRef.current[i] = el; }}
          className="absolute top-0 transform-gpu"
          style={{
            // Initial position based on index (SSR safe)
            left: POSITIONS[i].left,
            width: POSITIONS[i].width,
            height: POSITIONS[i].height,
            zIndex: POSITIONS[i].zIndex
          }}
        >
          <HistoryCard
            imageSrc={src}
            year={`201${i + 2}`}
            // Size is handled by parent container now
          />
        </div>
      ))}
    </div>
  );
}
