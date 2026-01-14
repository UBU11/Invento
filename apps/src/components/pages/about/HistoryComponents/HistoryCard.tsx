"use client";
import Image from "next/image";

export default function HistoryCard({
  imageSrc,
  year,
  className,
}: {
  imageSrc: string;
  year?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 z-10 bg-[#171717] flex flex-col justify-between p-[3%] rounded-[5%] ${className || "w-full h-full"}`.trim()}
    >
      {/* Top Left Symbol */}
      <div className="absolute top-[4%] left-[2%] z-20 w-[13%] aspect-square">
        <div className="relative w-full h-full">
          <Image 
            src="/about/card-symbol-v2.png" 
            alt="Card Symbol" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-full rounded-[4%] overflow-hidden bg-[#171717]">
        <Image
          src={imageSrc}
          alt={`History ${year || "moment"}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 30vw, 15vw"
        />
         <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
      </div>

       {/* Bottom Right Symbol */}
       <div className="absolute bottom-[4%] right-[2%] z-20 w-[13%] aspect-square">
        <div className="relative w-full h-full rotate-180">
          <Image 
            src="/about/card-symbol-v2.png" 
            alt="Card Symbol" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>
    </div>
  );
}
