import Image from "next/image";
import Link from "next/link";
import KoiVideoLayer from "./fishVideoBg";

type MenuBarItemProps = {
  index: number;
  displayName: string;
  endpoint: string;
  onClick: () => void;
};

const MenuBarItem = ({
  index,
  displayName,
  endpoint,
  onClick,
}: MenuBarItemProps) => {
  return (
    <Link
      scroll={false}
      className="flex group w-full items-center gap-4 justify-between border-b lg:border-b-0 lg:border-t border-white pb-4 lg:pb-0 lg:pt-4"
      onClick={onClick}
      href={endpoint}
    >
      <div className="flex gap-2">
        <p className="font-urbanist text-white group-hover:text-[#ff0000] opacity-60 text-[9px]">
          {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="font-urbanist flex-1 text-white group-hover:text-[#ff0000] text-3xl font-medium">
          {displayName}
        </h3>
      </div>
      <div className="flex relative h-5 w-5 group-hover:text-[#ff0000] text-white">
        <Image
          fill
          alt="Top right arrow"
          src="/ui/icons/arrow-right.svg"
          className="object-contain group-hover:rotate-45 transition-transform"
        />
      </div>
    </Link>
  );
};

type MenuBarDialogProps = {
  onClose: () => void;
};

export default function MenuBarDialog({ onClose }: MenuBarDialogProps) {
  const menuLinks = [
    {
      displayName: "Home",
      endpoint: "/",
    },
    {
      displayName: "About",
      endpoint: "/about",
    },
    {
      displayName: "Events",
      endpoint: "/events",
    },
    {
      displayName: "Gallery",
      endpoint: "/gallery",
    },
    {
      displayName: "Contact",
      endpoint: "/#contact",
    },
    {
      displayName: "FAQs",
      endpoint: "/#faq",
    },
  ];

  return (
    <div className="fixed inset-0 flex w-full h-full z-25 items-center overflow-y-hidden bg-black">
      <KoiVideoLayer />

      <div className="flex flex-col h-fit w-full relative z-15 items-center p-4 lg:px-12 lg:py-8 gap-12 lg:gap-6">
        {/* Top Bar */}
        <div className="flex w-full justify-between">
          <div className="h-10 w-8 relative">
            <Image fill alt="Invento Logo" src="/logo.png" />
          </div>
          <button className="h-10 w-10 relative" onClick={onClose}>
            <Image fill alt="X Button" src="/ui/icons/x.svg" className="p-2" />
          </button>
        </div>

        <div className="flex flex-col w-full gap-6">
          {menuLinks.map((link, index) => (
            <MenuBarItem
              onClick={onClose}
              key={link.displayName}
              index={index}
              displayName={link.displayName}
              endpoint={link.endpoint}
            />
          ))}
        </div>

        <Link
  href="/events"
  scroll={false}
  onClick={onClose}
  className="p-4 bg-[#A41F22] text-white hover:text-[#A41F22] hover:bg-white transition-colors inline-block"
>
  REGISTER
</Link>


        <h1 className="text-4xl xl:text-8xl text-transparent bg-clip-text bg-linear-to-b from-[#FFFFFF] to-[#3E3E3EB1]">
          INVENTO&apos; 26
        </h1>
      </div>
    </div>
  );
}
