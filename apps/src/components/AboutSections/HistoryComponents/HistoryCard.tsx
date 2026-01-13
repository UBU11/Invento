"use client";
import Image from "next/image";

export default function HistoryCard({ imageSrc, year, className }: { imageSrc: string; year?: string; className?: string }) {
  return (
    <div
      className={`relative w-[13vw] h-[40vh] shrink-0 z-10 bg-[#171717] rounded-[1.5rem] p-1.5 flex flex-col justify-between ${className || ""}`.trim()}
    >
      {/* Top Left Symbol */}
      <div className="absolute top-3 left-3 flex flex-col items-center gap-1 z-20">
         <span className="text-white/40 font-serif text-sm leading-none">J</span>
         <div className="h-px w-3 bg-white/20"/>
         <span className="text-white/40 text-[0.6rem] leading-none">▼</span>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden bg-gray-800">
        <Image
          src={imageSrc}
          alt={`History ${year || "moment"}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 30vw, 15vw"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30" />
      </div>

       {/* Bottom Right Symbol */}
       <div className="absolute bottom-3 right-3 flex flex-col items-center gap-1 z-20">
         <span className="text-white/40 text-[0.6rem] leading-none">▲</span>
         <div className="h-px w-3 bg-white/20"/>
         <span className="text-white/40 font-serif text-sm leading-none">J</span>
      </div>
    </div>
  );
}
