import { akira } from "@/src/lib/fonts";

export default function ContactHeader() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <h1
      className={akira.className}
      style={{
        position: "absolute",
        width: isMobile ? "90%" : "770px",
        height: "auto",
        left: isMobile ? "10px" : "192px",
        top: isMobile ? "50px" : "130px",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: isMobile ? "40px" : "75px",
        lineHeight: isMobile ? "50px" : "90px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
      }}
    >
      CONTACT US
    </h1>
  );
}

