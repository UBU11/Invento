import { akira } from "@/src/lib/fonts";

export default function ContactAddress() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <p
      className={akira.className}
      style={{
        position: "absolute",
        width: isMobile ? "200px" : "598px",
        height: "auto",
        top: isMobile ? "300px" : "30px",
        right: isMobile ? "20px" : "0",
        left: isMobile ? "auto" : "auto",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: isMobile ? "12px" : "20px",
        lineHeight: isMobile ? "20px" : "30px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
        padding: isMobile ? "10px" : "20px",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        textAlign: isMobile ? "left" : "left",
      }}
    >
      Government Engineering College Sreekrishnapuram, Palakkad, Kerala - 678633
    </p>
  );
}

