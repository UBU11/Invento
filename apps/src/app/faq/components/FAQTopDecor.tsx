'use client';

import { useEffect, useState } from 'react';
import styles from './FAQTopDecor.module.css';

export default function FAQTopDecor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && typeof window !== 'undefined' && window.innerWidth < 1024;
  
  return (
    <img
      src="/faq/top-left.webp"
      alt=""
      className={styles.topDecor}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
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
