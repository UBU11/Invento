"use client";

import { useEffect, useState } from "react";
import FAQTable from "@/src/components/pages/faq/FAQTable";
import { akira } from "@/src/lib/fonts";

const faqItems = [
  {
    id: 1,
    question: "What is Invento?",
    answer:
      "Invento is a comprehensive inventory management solution designed to help businesses streamline their operations and improve efficiency.",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer:
      "Getting started is simple. Sign up for an account, and you'll have access to our dashboard and tools within minutes.",
  },
  {
    id: 3,
    question: "What features does Invento offer?",
    answer:
      "Invento offers real-time inventory tracking, automated alerts, analytics, reporting, and integration with popular e-commerce platforms.",
  },
  {
    id: 4,
    question: "Is there customer support?",
    answer:
      "Yes, we offer 24/7 customer support via email, chat, and phone to ensure your success with our platform.",
  },
  {
    id: 5,
    question: "Can I integrate with other tools?",
    answer:
      "Absolutely. Invento integrates seamlessly with popular tools and platforms used in inventory management.",
  },
  {
    id: 6,
    question: "What is the pricing?",
    answer:
      "Our pricing is flexible and scalable based on your business needs. Contact our sales team for a custom quote.",
  },
];

export default function FAQSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile =
    mounted && typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "url('/faq/bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Top Left Decoration */}
        <img
          src="/faq/top-left.webp"
          alt=""
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 5,
            pointerEvents: "none",
            width: "100%",
            maxWidth: isMobile ? "250px" : "426px",
            height: "auto",
            aspectRatio: "426/343"
          }}
        />

        {/* Bottom Right Decoration */}
        <img
          src="/faq/bottom-right.webp"
          alt=""
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: 5,
            pointerEvents: "none",
            width: "100%",
            maxWidth: isMobile ? "250px" : "426px",
            height: "auto",
            aspectRatio: "426/343"
          }}
        />

        <h1
          className={akira.className}
          style={{
            position: "absolute",
            width: "291px",
            height: "160px",
            left: isMobile ? "20px" : "250px",
            top: isMobile ? "100px" : "120px",
            fontStyle: "normal",
            fontWeight: "800",
            fontSize: isMobile ? "50px" : "87.94px",
            lineHeight: "160px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "2px",
            color: "#FF0000",
            margin: "0",
            zIndex: 10,
          }}
        >
          FAQ<span style={{ fontSize: "0.6em" }}>s</span>
        </h1>

        <div className="relative z-10 px-4 h-full pt-8 md:pt-64 pb-32">
          <FAQTable items={faqItems} />
        </div>

        {/* Mobile Contact Button */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "32px",
              zIndex: 50,
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "14px",
                marginBottom: "12px",
                fontFamily: "Inter",
                width: "128px",
              }}
            >
              Still have any doubts?
            </p>
            <button
              style={{
                width: "128px",
                backgroundColor: "#FF0000",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "8px 12px",
                border: "1px solid #FF0000",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Contact us
            </button>
          </div>
        )}
      </section>
    </>
  );
}

