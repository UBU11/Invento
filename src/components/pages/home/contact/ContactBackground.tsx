"use client";

import { useEffect, useState } from "react";

interface ContactBackgroundProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  showElements: boolean;
  bgRef: React.RefObject<HTMLDivElement | null>;
  logoRef: React.RefObject<HTMLImageElement | null>;
  bottomImageRef: React.RefObject<HTMLImageElement | null>;
}

export default function ContactBackground({ sectionRef, showElements, bgRef, logoRef, bottomImageRef }: ContactBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    setIsMobile(window.innerWidth < 1024);

    // Handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Logo */}
      <img
        ref={logoRef}
        src="/contact/LOGO.webp"
        alt="Invento Logo"
        style={{
          position: "absolute",
          top: "80px",
          right: isMobile ? "-200px" : "40px",
          zIndex: 10,
          pointerEvents: "none",
          width: "auto",
          height: "auto",
          maxWidth: isMobile ? "400px" : "550px",
          padding: "20px",
          visibility: showElements ? "visible" : "hidden",
        }}
      />

      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "url('/contact/contact-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "30% center" : "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Bottom Image - Mobile */}
      {isMobile && (
        <img
          ref={bottomImageRef}
          src="/contact/sam.webp"
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            pointerEvents: "none",
            width: "100%",
            height: "auto",
          }}
        />
      )}

      {/* Bottom Image - Desktop */}
      {!isMobile && (
        <img
          ref={bottomImageRef}
          src="/contact/sam-wide.webp"
          alt=""
          style={{
            position: "absolute",
            bottom: -100,
            left: 0,
            right: 0,
            zIndex: 5,
            pointerEvents: "none",
            width: "100%",
            height: "auto",
            maxHeight: "clamp(800px, 50vh, 600px)",
          }}
        />
      )}
    </>
  );
}

