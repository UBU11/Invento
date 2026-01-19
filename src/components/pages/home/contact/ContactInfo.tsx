import { akira } from "@/src/lib/fonts";

export default function ContactInfo() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <>
      {/* Email */}
      <p
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "160px" : "320px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
        }}
      >
        inventogec@gmail.com
      </p>
      
      {/* Phone Number */}
      <p
        className={akira.className}
        style={{
          position: "absolute",
          width: isMobile ? "90%" : "593px",
          height: "auto",
          left: isMobile ? "30px" : "198px",
          top: isMobile ? "190px" : "370px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: isMobile ? "14px" : "24px",
          lineHeight: "20px",
          color: "#FFFFFF",
          zIndex: 20,
          margin: 0,
        }}
      >
        1234567890
      </p>
    </>
  );
}

