import { akira } from "@/src/lib/fonts";

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
  return (
    <>
      {/* Title */}
      <p
        className={akira.className}
        style={{
          position: "absolute",
          width: "172px",
          height: "40px",
          right: titleRight,
          top: titleTop,
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "20px",
          lineHeight: "40px",
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
            right: linksRight,
            top: `${parseInt(linksTop) + index * 40}px`,
            fontFamily: "'Urbanist', sans-serif",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "24px",
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

