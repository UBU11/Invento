"use client";
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

// Define the 7 slots (positions)
const SLOTS = [
  { left: "0%",   width: "12vw", height: "35vh", zIndex: 10,  scale: 1 }, // Slot 0
  { left: "14%",  width: "12vw", height: "35vh", zIndex: 10,  scale: 1 }, // Slot 1
  { left: "28%",  width: "12vw", height: "35vh", zIndex: 10,  scale: 1 }, // Slot 2
  { left: "42%",  width: "22vw", height: "64vh", zIndex: 50,  scale: 1.1 }, // Slot 3 (Highlight) - Centered visually around 50%
  // Adjusting Highlight center: 42% left + 11vw (half width) approx center.
  // Normal cards: 14% gap. 
  // Let's refine positions for perfect centering of Highlight.
  // Total width: 100%. 
  // Center is 50%. Highlight Width 22vw. 
  // Highlight Left = 50% - 11vw. (Approx 39%).
  // Let's stick to user's previous flex-like expectation but absolute.
  // Previous: Justify between. 7 items.
  // Let's use simplified even distribution for now, optimized for the highlight.
  // Slot 3 is Highlight.
  { left: "40%",  width: "22vw", height: "64vh", zIndex: 50, opacity: 1 }, // Slot 3 Center
  // Oops, let's use the explicit loop logic:
  
  // Slot 0
  { left: "0%",    width: "12vw", height: "35vh", zIndex: 10 },
  // Slot 1
  { left: "14.5%", width: "12vw", height: "35vh", zIndex: 10 },
  // Slot 2
  { left: "29%",   width: "12vw", height: "35vh", zIndex: 10 },
  // Slot 3 (Highlight) - Center
  { left: "43.5%", width: "22vw", height: "64vh", zIndex: 50 },
  // Slot 4
  { left: "63%",   width: "12vw", height: "35vh", zIndex: 10 }, // Pushed by highlight width
  // Slot 5
  { left: "77.5%", width: "12vw", height: "35vh", zIndex: 10 },
  // Slot 6
  { left: "92%",   width: "12vw", height: "35vh", zIndex: 10 }, // Can overflow slightly or fit
];

// Refined SLOTS to fit 100% width relative container
const POSITIONS = [
  { left: "0%",   width: "12vw", height: "35vh", zIndex: 10 }, // 0
  { left: "13%",  width: "12vw", height: "35vh", zIndex: 10 }, // 1
  { left: "26%",  width: "22vw", height: "64vh", zIndex: 50 }, // 2 (Highlight)
  { left: "49%",  width: "12vw", height: "35vh", zIndex: 10 }, // 3
  { left: "62%",  width: "12vw", height: "35vh", zIndex: 10 }, // 4 
  { left: "75%",  width: "12vw", height: "35vh", zIndex: 10 }, // 5
  { left: "88%",  width: "12vw", height: "35vh", zIndex: 10 }, // 6
];

export default function HistoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // State to track which image is in which logical slot
  // logicalSlots[i] = physical image index currently at Slot i
  // Wait, easier: positions[imageIndex] = currentSlotIndex
  // Initial: Image 0 is at Slot 0, Image 1 at Slot 1...
  const [slotIndices, setSlotIndices] = useState([0, 1, 2, 3, 4, 5, 6]);

  useGSAP(() => {
    const interval = setInterval(() => {
      setSlotIndices((prev) => {
        const next = [...prev];
        // We want images to move RIGHT.
        // Image at Slot 0 -> Slot 1
        // Image at Slot 1 -> Slot 2
        // ...
        // Image at Slot 6 -> Slot 0 (Wrap)
        
        return next.map((currentSlot) => (currentSlot + 1) % 7);
      });
    }, 2000); // 2s total cycle (1s move + 1s pause)

    return () => clearInterval(interval);
  }, { scope: containerRef });

  // Effect to perform the actual animation when state changes
  useGSAP(() => {
    slotIndices.forEach((slotIndex, imageIndex) => {
      const card = cardsRef.current[imageIndex];
      if (!card) return;

      const targetPos = POSITIONS[slotIndex];
      
      // Wrapping Logic: 
      // If we just moved to Slot 0 (meaning we came from Slot 6), 
      // we need to "teleport" or animate specially.
      // Actually, if we just simply animate Left/Width/Height, it will slide form Right to Left across the screen.
      // User wants it to move "Behind".
      
      // Check if this specific transition is the Wrap (6 -> 0)
      // The state update made it 0. Previous was 6.
      // We can detect this if we track "previous" or just check logic.
      // But GSAP is declarative here.
      
      // Hack: If target is Slot 0, set zIndex to 0 immediately so it slides behind?
      // Or better: manual timeline for the wrap.
      
      // Let's rely on the state transition. 
      // If slotIndex is 0, it means it's the one wrapping to start.
      // We want it to slide from Left: 88% to Left: 0%.
      // If we just animate `left`, it slides backwards. 
      // User said: "move through behide every cards".
      // So z-index should be low.
      
      const isWrapping = slotIndex === 0;
      
      gsap.to(card, {
        left: targetPos.left,
        width: targetPos.width,
        height: targetPos.height,
        zIndex: isWrapping ? 0 : targetPos.zIndex, // Drop z-index if wrapping
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
