import Link from "next/link";
import EventCard from "../components/EventCard";
import { groupEvents, soloEvents } from "./general-data";

type EventItem = {
    image: string;
    title: string;
    date: string;
};

interface EventSectionProps {
    title: string;
    events: EventItem[];
    imageFolder: string;
}

const EventSection = ({ title, events, imageFolder }: EventSectionProps) => {
    return (
        <section className="w-full max-w-7xl px-2 md:px-4 flex flex-col items-start mt-0 md:mt-20">
            <h1 className="font-akira text-2xl md:text-6xl text-white mb-10 md:mb-40 mt-0 md:mt-15 text-left">
                {title}
            </h1>
            
            {/* MOBILE LAYOUT (Masonry - 2 Columns) */}
            <div className="flex flex-row w-full max-w-6xl md:hidden gap-2 px-2 items-start">
                {/* Left Column (Even Indices) */}
                <div className="flex flex-col w-1/2 gap-20">
                    {events.filter((_, i) => i % 2 === 0).map((event, i) => (
                        <EventCard 
                            key={`mob-left-${i}`} 
                            imageSrc={`${imageFolder}/${event.image}`} 
                            title={event.title} 
                            date={event.date} 
                            className="w-full" 
                        />
                    ))}
                </div>
                {/* Right Column (Odd Indices) - Staggered */}
                <div className="flex flex-col w-1/2 gap-20 mt-45">
                    {events.filter((_, i) => i % 2 !== 0).map((event, i) => (
                        <EventCard 
                            key={`mob-right-${i}`} 
                            imageSrc={`${imageFolder}/${event.image}`} 
                            title={event.title} 
                            date={event.date} 
                            className="w-full" 
                        />
                    ))}
                </div>
            </div>

            {/* DESKTOP LAYOUT (Grid - ZigZag) */}
            <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-1 w-full max-w-6xl">
                {events.map((event, index) => {
                    const isShiftedRow = Math.floor(index / 2) % 2 !== 0; 
                    return (
                        <EventCard 
                            key={index}
                            imageSrc={`${imageFolder}/${event.image}`}
                            title={event.title}
                            date={event.date}
                            className={`md:scale-50 md:-my-65 -translate-x-1 ${isShiftedRow ? "md:translate-x-44" : "md:-translate-x-32"}`} 
                        />
                    );
                })}
            </div>
        </section>
    );
};

const GeneralEventDetails = () => {
    return (
      <div className="w-full bg-black text-white flex flex-col items-center justify-start pt-0 md:pt-20 pb-32 md:pb-60 relative">
        <EventSection 
            title="GROUP EVENTS" 
            events={groupEvents} 
            imageFolder="/about-events/general/group events" 
        />
        
        <EventSection 
            title="SOLO EVENTS" 
            events={soloEvents} 
            imageFolder="/about-events/general/solo events" 
        />

        {/* Register Button */}
        <div className="w-full flex justify-center mt-40 z-50 relative">
            <Link href="/coming-soon">
                <button className="bg-[#A41F22] text-white font-akira text-sm md:text-3xl px-8 py-3 md:px-20 md:py-6 hover:bg-white hover:text-black transition-colors duration-300">
                    REGISTER HERE
                </button>
            </Link>
        </div>
      </div>
    );
};
  
export default GeneralEventDetails;

