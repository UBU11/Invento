import Image from "next/image";

export default function FAQBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/faq/bg.webp"
        alt=""
        fill
        priority
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
