'use client';

import { useEffect, useState } from 'react';

export default function FAQBottomDecor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && typeof window !== 'undefined' && window.innerWidth < 1024;
  
  return (
    <img
      src="/bottom-right.webp"
      alt=""
      style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        zIndex: 9999,
        pointerEvents: "none",
        width: "100%",
        maxWidth: isMobile ? "250px" : "426px",
        height: "auto",
        aspectRatio: "426/343"
      }}
    />
  );
}
