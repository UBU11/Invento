"use client";
import { useState } from "react";
import MenuBar from "./menuBar";
import MenuBarDialog from "./menubarDialog";

export default function MenuPortal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex relative w-full justify-center z-100">
      <div className="fixed bottom-8">
        <MenuBar onOpen={() => setIsMenuOpen(true)} />
      </div>
      {isMenuOpen && <MenuBarDialog onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}
