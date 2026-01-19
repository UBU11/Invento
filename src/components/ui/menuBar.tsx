import Image from "next/image";

export default function MenuBar() {
  return (
    <div className="flex w-fit gap-2 bg-(--invento-gray) p-1.5 rounded-xl items-center">
      {/* Invento Logo Button */}
      <button className="relative h-12 w-12 bg-white rounded-md flex items-center justify-center hover:opacity-80 transition">
        <Image
          fill
          alt="Red Invento Logo"
          src="/invento-red-logo.svg"
          className="p-2"
        />
      </button>

      {/* Menu Button */}
      <button className="flex items-center flex-1 gap-2 border p-3 border-(--invento-light-gray) rounded-md hover:bg-white/10 transition">
        <p className="text-white font-urbanist">Menu</p>
        <div className="flex relative h-5 w-5 items-center">
          <Image
            fill
            alt="Hamburger Menu"
            src="/icons/hamburger-menu.svg"
            className="p-0.5"
          />
        </div>
      </button>

      {/* Register Button */}
      <button className="flex items-center h-12 p-6 rounded-md bg-white hover:bg-gray-200 transition">
        <p className="text-black font-urbanist">Register</p>
      </button>
    </div>
  );
}
