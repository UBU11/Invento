import HistoryCards from "./HistoryCards";
import HistoryCircularLogo from "./HistoryCircularLogo";

export default function HistoryStaticContent() {
  return (
    <>
      {/* Top: Static Track (Cards) */}
      <div className="relative w-full h-[55%] flex items-start pt-6 px-[2vw]">
        <div className="history-track w-full flex flex-row justify-between">
          <HistoryCards />
        </div>
      </div>

      {/* Bottom: Static Elements */}
      <div className="relative w-full h-[45%] flex flex-col items-center md:block">
        
        {/* Logo */}
        <div className="history-logo relative md:absolute md:left-[5vw] md:-top-40 md:origin-left scale-[0.6] z-20">
          <HistoryCircularLogo />
        </div>

        {/* Paragraphs */}
        <div className="history-top-text absolute right-[5vw] top-0 max-w-md text-right hidden md:block">
          <p className="text-sm md:text-base font-medium font-poppins text-black leading-relaxed">
            Today, INVENTO stands as a symbol of creativity, innovation, and technical excellence, reflecting the spirit of GEC Palakkad.
          </p>
        </div>

        <div className="history-bottom-text absolute left-[2vw] top-12 max-w-sm hidden md:block">
          <p className="text-xs md:text-sm font-medium font-poppins text-black leading-relaxed text-left">
            INVENTO has consistently served as a space for learning, experimentation, and collaboration, encouraging students to explore emerging technologies beyond classrooms and textbooks.
          </p>
        </div>

        {/* Main Title */}
        <div className="history-title relative md:absolute bottom-auto md:bottom-4 left-auto md:left-[3vw] mt-4 md:mt-0 text-center md:text-left z-40 transform-gpu origin-center md:origin-left">
          <h1 className="text-[11vw] md:text-[9vw] font-bold font-akira leading-none tracking-tighter opacity-100 whitespace-nowrap">
            OUR HISTORY
          </h1>
        </div>
      </div>
    </>
  );
}