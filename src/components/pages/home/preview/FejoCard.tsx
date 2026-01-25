import Image from "next/image";
import Link from "next/link";

const FejoCard: React.FC = () => (
  <div className="relative -mt-24 w-full scale-105 origin-center">
    <Image
      src={"/home/preview/fejo-card.png"}
      alt="Proshow bg"
      width={1500}
      height={300}
      className="w-full h-auto"
    />

    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
      <div className="absolute lg:top-40 top-10 bg-white text-black font-bold lg:text-2xl text-[10px] uppercase lg:px-5 px-3 py-1">
        JAN 30
      </div>
      <h2 className="text-xl lg:text-7xl mt-10 lg:mt-8">FEJO X ADJ</h2>
      <h4 className="text-[7px] lg:text-xl font-medium -mt-4 lg:mt-4">
        The Blueprint of Malayali Hip-Hop.
        <br />
        Experience the raw, unfiltered energy that redefined a genre.
      </h4>
      <Link
        scroll={false}
        href={"/events"}
        className="absolute bottom-3 md:bottom-12 bg-white text-black text-[5px] lg:text-xl font-bold uppercase px-1 py-1 lg:px-8 lg:py-3"
      >
        REGISTER
      </Link>
    </div>
  </div>
);

export default FejoCard;