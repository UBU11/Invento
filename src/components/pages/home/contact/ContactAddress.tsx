import { akira } from "@/src/lib/fonts";

export default function ContactAddress() {
  return (
    <p
      className={akira.className}
      style={{
        position: "absolute",
        width: "598px",
        height: "140px",
        top: "30px",
        right: "0",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: "20px",
        lineHeight: "30px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
        padding: "20px",
      }}
    >
      Government Engineering College Sreekrishnapuram, Palakkad, Kerala - 678633
    </p>
  );
}

