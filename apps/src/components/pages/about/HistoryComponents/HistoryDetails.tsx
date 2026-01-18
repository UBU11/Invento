import Image from "next/image";

export default function HistoryDetails() {
  return (
    <div className="relative w-full h-full">
      {/* Images - Positioned Right */}
      <div id="history-pagoda" className="hidden md:block absolute top-[-15vh] right-[2vw] w-[65vw] h-[115vh] pointer-events-none opacity-90 z-0">
           <Image 
              src="/about/history/pagoda.png" 
              alt="Pagoda" 
              fill 
              className="object-contain object-top-right"
           />
      </div>
      <div id="history-pattern" className="hidden md:block absolute bottom-0 right-0 w-[35vw] h-[55vh] pointer-events-none opacity-80 z-0">
           <Image 
              src="/about/history/pattern.png" 
              alt="Pattern" 
              fill 
              className="object-contain object-bottom-right"
           />
      </div>

      {/* Content Container - Aligned Left */}
      <div id="history-content-wrapper" className="relative z-10 flex flex-col gap-16 md:gap-32 w-full mx-0 items-start pt-[35vh] md:pt-[30vh] pb-10 md:pb-20 pl-4 md:pl-[3vw] pr-[5vw]">
        
        {/* Page 1 Content */}
        <div id="history-page-1" className="w-full md:w-[55%] flex flex-col gap-6 text-black mr-auto bg-white/50 backdrop-blur-sm md:bg-transparent rounded-lg p-4 md:p-0">
          <p className="text-sm md:text-lg font-medium leading-relaxed md:w-[85%]">
            <span className="font-extrabold">INVENTO</span> began with a spark—students who believed learning didn’t have to stop at classroom walls. What started as a small technical gathering soon revealed a bigger possibility: a space where curiosity could turn into creation.
          </p>
          <p className="text-sm md:text-lg font-medium leading-relaxed w-full">
            As that idea grew, it took its first form as GHATECH—a multi-day technical exhibition that brought together students from multiple institutions. The involvement of nationally recognized organizations such as DRDO, along with early industry collaborators, marked a turning point. This was no longer just a campus initiative; it was gaining momentum beyond it.
          </p>
        </div>

        {/* Page 2 Content */}
        <div id="history-page-2" className="w-full md:w-[55%] flex flex-col gap-6 text-black mr-auto bg-white/50 backdrop-blur-sm md:bg-transparent rounded-lg p-4 md:p-0">
            <p className="text-sm md:text-lg font-medium leading-relaxed md:w-[90%]">
              Then came the transformation. Technology met creativity. Innovation shared the stage with art, performance, and culture. The festival evolved into Invento—a platform where ideas, expression, and identity could coexist. A space that proved students didn’t have to choose between logic and imagination—they could lead with both.
            </p>
            <p className="text-sm md:text-lg font-medium leading-relaxed md:w-full">
              With every edition, Invento grew bolder. Collaborations with institutions such as ISRO and professional bodies like the IEEE, along with participation from colleges across the country, shaped Invento into a national-level techno-cultural festival.
            </p>
            <p className="text-sm md:text-lg font-medium leading-relaxed w-full">
              Today, Invento stands as an open platform—shaped by students, strengthened by collaboration, and driven by ideas that continue to redefine what’s possible. A journey still unfolding, with every edition adding a new chapter.
            </p>
        </div>

      </div>
    </div>
  );
}
