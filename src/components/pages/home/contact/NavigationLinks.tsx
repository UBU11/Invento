import { akira } from "@/src/lib/fonts";
import { useEffect, useState } from "react";

interface NavigationLinksProps {
  title: string;
  titleRight: string;
  titleTop: string;
  links: { text: string; href: string }[];
  linksRight: string;
  linksTop: string;
}

export default function NavigationLinks({
  title,
  titleRight,
  titleTop,
  links,
  linksRight,
  linksTop,
}: NavigationLinksProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // For mobile, increase the top position to move further down
  const titleMobileOffset = title === "Useful links" ? 350 : title === "About us" ? 200 : 0;
  const linksMobileOffset = title === "Useful links" ? 320 : title === "About us" ? 170 : 0;
  const titleRightOffset = title === "Useful links" ? "30px" : title === "About us" ? "30px" : "0px";
  const linksRightOffset = title === "Useful links" ? "75px" : title === "About us" ? "70px" : "0px";
  
  const finalTitleTop = isMobile ? `${parseInt(titleTop) + titleMobileOffset}px` : titleTop;
  const finalLinksTop = isMobile ? parseInt(linksTop) + linksMobileOffset : parseInt(linksTop);
  const finalTitleRight = isMobile ? titleRightOffset : titleRight;
  const finalLinksRight = isMobile ? linksRightOffset : linksRight;

  return (
    <>
      {/* Title */}
      <p
        className={akira.className}
        style={{
          position: "absolute",
          width: "172px",
          height: "40px",
          right: finalTitleRight,
          top: finalTitleTop,
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "20px",
          lineHeight: isMobile ? "20px" : "40px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
          padding: 0,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </p>
      
      {/* Links */}
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          style={{
            position: "absolute",
            width: "131px",
            height: "36px",
            right: finalLinksRight,
            top: `${finalLinksTop + index * (isMobile ? 30 : 40)}px`,
            fontFamily: "'Urbanist', sans-serif",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: isMobile ? "16px" : "24px",
            lineHeight: "0px",
            color: "#9E9E9E",
            zIndex: 20,
            margin: 0,
            padding: 0,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {link.text}
        </a>
      ))}
    </>
  );
}

