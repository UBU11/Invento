import Image from "next/image";
import Link from "next/link";

const HaricharanCard: React.FC = () => (
  <div className="relative -mt-9 lg:-mt-25 w-full scale-105 origin-center">
    <Image
      src={"/home/preview/haricharan-card.webp"}
      alt="Haricharan Proshow bg"
      width={1500}
      height={300}
      className="w-full h-auto"
    />

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <div className="bg-[#A41F22] text-white font-bold text-[7px] lg:text-2xl uppercase px-3 lg:px-6 py-1 mt-5 lg:mt-0 mb-2 lg:mb-4 mt-0 lg:mt-12">
        JAN 31
      </div>

      <h2 className="text-xl lg:text-7xl lg:text-8xl text-[#A41F22] uppercase font-akira drop-shadow-sm">
        HARICHARAN
      </h2>

      <p className="text-[#A41F22] mb-7 text-[6px] lg:text-lg font-medium lg:mt-4 max-w-[340px] lg:max-w-3xl px-4 leading-relaxed">
        The Sound of Legends. Witness the vocal powerhouse behind{" "}
        <br className="hidden md:block" />
        South India’s biggest cinematic hits.
      </p>
      <Link
        scroll={false}
        href={"https://app.makemypass.com/event/after-hours"}
        className="absolute bottom-4 md:bottom-15 bg-[#A41F22] text-white text-[5px] lg:text-xl font-bold uppercase px-1 py-1 lg:px-8 lg:py-3"
      >
        REGISTER
      </Link>

      {/*<div className="absolute bottom-[7%] left-3 lg:left-[4%] text-[#A41F22] font-akira text-[3px] lg:text-[10px] uppercase ">
        HARICHARAN
      </div>
      <div className="absolute bottom-[7%] right-4 lg:right-[4%]  text-[#A41F22] font-akira text-[3px] lg:text-[10px]  uppercase text-right ">
        DRUMS <br /> KUMARAN
      </div>*/}
    </div>
  </div>
);

export default HaricharanCard;
