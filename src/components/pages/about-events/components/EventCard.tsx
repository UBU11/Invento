import Image from "next/image";

interface EventCardProps {
  imageSrc: string;
  title: string;
  date: string;
  className?: string; // Added className prop for manual adjustments
}

const EventCard = ({ imageSrc, title, date, className = "" }: EventCardProps) => {
  return (
    <div className={`flex flex-col w-full group ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full border border-gray-800 rounded-lg overflow-hidden mb-4">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start px-2">
        {/* Title */}
        <h3 className="font-akira text-base md:text-5xl text-white leading-tight uppercase mb-2">
          {title}
        </h3>

        {/* Date */}
        <p className="font-urbanist text-gray-400 text-xs md:text-4xl mb-4">
          {date}
        </p>

        {/* Divider Line */}
        <div className="w-[70%] h-[2px] md:h-[6px] bg-white/30 group-hover:w-full group-hover:bg-[#A41F22] transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default EventCard;
