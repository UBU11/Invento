"use client";

import { useEffect, useState } from "react";
import { akira } from "@/src/lib/fonts";

interface ContactInfoProps {
  showElements: boolean;
  emailRef: React.RefObject<HTMLParagraphElement | null>;
  phoneRef: React.RefObject<HTMLParagraphElement | null>;
}

export default function ContactInfo({ showElements, emailRef, phoneRef }: ContactInfoProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Email */}
      <p
        ref={emailRef}
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "160px" : "230px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          visibility: showElements ? "visible" : "hidden",
        }}
      >
        inventogec@gmail.com
      </p>
      
      {/* Phone Number */}
      <p
        ref={phoneRef}
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "190px" : "280px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          visibility: showElements ? "visible" : "hidden",
        }}
      >
        9074636412
      </p>
    </>
  );
}

