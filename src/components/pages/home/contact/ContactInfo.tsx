import { akira } from "@/src/lib/fonts";

export default function ContactInfo() {
  return (
    <>
      {/* Email */}
      <p
        className={akira.className}
        style={{
          position: "absolute",
          width: "593px",
          height: "28px",
          left: "198px",
          top: "320px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "0px",
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
          width: "593px",
          height: "28px",
          left: "198px",
          top: "370px",
          fontStyle: "normal",
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "0px",
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

