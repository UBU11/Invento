import Image from "next/image";
import FejoCard from "./FejoCard";

const Fejo: React.FC = () => (
  <>
    <div className="-mt-6 lg:-mt-30 relative -z-10 w-full">
      <Image
        src={"/home/preview/fejo.webp"}
        width={1200}
        height={600}
        alt="fejo 1"
        className="w-full h-auto object-cover"
      />
    </div>
    <FejoCard />
  </>
);

export default Fejo;
