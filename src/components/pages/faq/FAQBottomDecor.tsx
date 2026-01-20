'use client';

import { useEffect, useState } from 'react';
import styles from './FAQBottomDecor.module.css';

export default function FAQBottomDecor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && typeof window !== 'undefined' && window.innerWidth < 1024;
  
  return (
    <img
      src="/faq/bottom-right.webp"
      alt=""
      className={styles.bottomDecor}
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
