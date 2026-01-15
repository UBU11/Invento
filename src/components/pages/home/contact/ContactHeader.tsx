import { akira } from "@/src/lib/fonts";

export default function ContactHeader() {
  return (
    <h1
      className={akira.className}
      style={{
        position: "absolute",
        width: "770px",
        height: "101px",
        left: "192px",
        top: "130px",
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: "75px",
        lineHeight: "90px",
        color: "#FFFFFF",
        zIndex: 20,
        margin: 0,
      }}
    >
      CONTACT US
    </h1>
  );
}

