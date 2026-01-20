"use client";
import Image from "next/image";
import Link from "next/link";

type MenuBarProps = {
  onOpen: () => void;
};

export default function MenuBar({ onOpen }: MenuBarProps) {
  return (
    <div className="flex w-fit gap-2 bg-(--invento-gray) p-1.5 rounded-xl items-center z-200">
      {/* Invento Logo Button */}
      <Link
        href="/"
        className="relative h-12 w-12 bg-white rounded-md flex items-center justify-center hover:opacity-80 transition"
      >
        <Image
          fill
          alt="Red Invento Logo"
          src="/invento-red-logo.svg"
          className="p-2"
        />
      </Link>

      {/* Menu Button */}
      <button
        className="flex items-center flex-1 gap-2 border p-3 border-(--invento-light-gray) rounded-md hover:bg-white/10 transition"
        onClick={onOpen}
      >
        <p className="text-white font-urbanist">Menu</p>
        <div className="flex relative h-5 w-5 items-center">
          <Image
            fill
            alt="Hamburger Menu"
            src="/ui/icons/hamburger-menu.svg"
            className="p-0.5"
          />
        </div>
      </button>

      {/* Register Button */}
      <button className="group flex items-center h-12 p-6 rounded-md hover:bg-[#FF0000]  bg-white transition-colors">
        <p className="text-black group-hover:text-white font-urbanist  transition-colors">
          Register
        </p>
      </button>
    </div>
  );
}
