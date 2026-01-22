"use client";

import { useEffect, useState } from "react";

interface SocialLink {
  href: string;
  src: string;
  alt: string;
  left: string;
  mobileLeft?: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/invento_gecpalakkad",
    src: "/contact/ig.svg",
    alt: "Instagram",
    left: "192px",
    mobileLeft: "20px",
  },
  {
    href: "https://youtube.com/@inventogecpalakkad2600",
    src: "/contact/yt.svg",
    alt: "YouTube",
    left: "320px",
    mobileLeft: "95px",
  },
  {
    href: "https://www.facebook.com/share/17kUJeAfrY/",
    src: "/contact/fb.svg",
    alt: "Facebook",
    left: "456px",
    mobileLeft: "170px",
  },
  {
    href: "#",
    src: "/contact/in.svg",
    alt: "LinkedIn",
    left: "592px",
    mobileLeft: "245px",
  },
];

interface SocialLinksProps {
  showElements: boolean;
  socialLinksRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
}

export default function SocialLinks({ showElements, socialLinksRefs }: SocialLinksProps) {
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
      {socialLinks.map((link, index) => (
        <a
          key={index}
          ref={(el) => {
            socialLinksRefs.current[index] = el;
          }}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: isMobile ? link.mobileLeft : link.left,
            top: isMobile ? "110px" : "150px",
            zIndex: 20,
            cursor: "pointer",
            textDecoration: "none",
            visibility: showElements ? "visible" : "hidden",
          }}
        >
          <img
            src={link.src}
            alt={link.alt}
            style={{
              width: "auto",
              height: "40px",
              display: "block",
            }}
          />
        </a>
      ))}
    </>
  );
}

