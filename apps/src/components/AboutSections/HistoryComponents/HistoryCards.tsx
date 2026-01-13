"use client";
import HistoryCard from "./HistoryCard";

const historyImages = [
  "/about/history/cards/img1.png",
  "/about/history/cards/img2.png",
  "/about/history/cards/img3.png",
  "/about/history/cards/img4.png",
  "/about/history/cards/img5.png",
  "/about/history/cards/img6.png",
  "/about/history/cards/img7.png",
];

export default function HistoryCards() {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      {historyImages.map((src, index) => (
        <HistoryCard
          key={index}
          imageSrc={src}
          year={`201${index + 2}`}
          className="w-[5vw] h-[14vh]" // Smallest size so far
        />
      ))}
    </div>
  );
}
