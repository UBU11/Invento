"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQTable from "@/src/components/pages/faq/FAQTable";
import { akira } from "@/src/lib/fonts";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    id: 1,
    question: "What is Invento and who can participate?",
    answer:
      "Invento is the techfest of GEC Palakkad, featuring technical and non-technical events, workshops, talk sessions, and hackathons. The fest is open to undergraduate and postgraduate students from all colleges, unless specified otherwise for an event.",
  },
  {
    id: 2,
    question: "How do I register for events?",
    answer:
      "Register through the official Invento website by selecting your desired event and completing payment via our secure gateway. Event-specific details are available on each event page."
  },
  {
    id: 3,
    question: "Can I participate in multiple events?",
    answer:
      "Yes! You can register for multiple events as long as schedules don't overlap. Participation may be individual or team-based depending on the event—check each event page for team size details."
  },
  {
    id: 4,
    question: "What are the payment methods and refund policy?",
    answer:
      "We accept UPI, debit cards, and credit cards. Registration fees are non-refundable once payment is completed, except in the case of event cancellation by organizers."
  },
  {
    id: 5,
    question: "Will I receive confirmation after registration?",
    answer:
      "Yes. You'll receive a confirmation message and event details at your registered email address after successful registration."
  },
  {
    id: 6,
    question: "Will participants receive certificates and prizes?",
    answer:
      "All registered participants who attend will receive participation certificates. Winners will be awarded merit certificates and prizes as announced."   
  },
  {
    id: 7,
    question: "Who can I contact for further queries?",
    answer:
    "For event-specific queries, contact the respective event coordinators. For general questions about registration, payment, or the fest, please visit our Contact page."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstSpacerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLImageElement>(null);
  const bottomRightRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const firstSpacer = firstSpacerRef.current;
    const spacer = spacerRef.current;
    const bg = bgRef.current;
    const topLeft = topLeftRef.current;
    const bottomRight = bottomRightRef.current;
    const title = titleRef.current;
    const table = tableRef.current;

    if (!section || !container || !spacer || !bg || !firstSpacer) return;

    const ctx = gsap.context(() => {
      // Initial states with transforms - only set if elements exist
      // Section starts below screen and will slide up
      if (section) gsap.set(section, { y: "100%" });
      // Background is visible at full opacity
      if (bg) gsap.set(bg, { opacity: 1 });
      if (topLeft) gsap.set(topLeft, { opacity: 0, x: -100 });
      if (bottomRight) gsap.set(bottomRight, { opacity: 0, x: 100, y: 100 });
      if (title) gsap.set(title, { opacity: 0, y: 100 });
      if (table) gsap.set(table, { opacity: 0, y: -100 });

      // Make sure section is visible for animation
      if (section) gsap.set(section, { visibility: "visible" });

      // Store timeline reference for reversing
      let elementTl: gsap.core.Timeline | null = null;

      // Time-based animation for elements (not scroll-based)
      const animateElements = () => {
        if (elementTl && elementTl.isActive()) return;

        elementTl = gsap.timeline({});

        if (topLeft)
          elementTl.to(
            topLeft,
            { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
            0,
          );
        if (bottomRight)
          elementTl.to(
            bottomRight,
            { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" },
            0,
          );
        if (title)
          elementTl.to(
            title,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0,
          );
        if (table)
          elementTl.to(
            table,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0,
          );
      };

      // Reverse elements animation
      const reverseElements = () => {
        if (elementTl) {
          elementTl.reverse();
          elementTl = null;
        }
      };

      // Section slides up and gets pinned when preview section ends
      ScrollTrigger.create({
        trigger: firstSpacer || spacer,
        start: "bottom top",
        end: "bottom bottom",
        pin: section,
        pinSpacing: true,
        onEnter: () => {
          setIsVisible(true);
          // Immediately slide section up completely
          if (section) {
            gsap.to(section, {
              y: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                // Trigger element animations after slide completes
                animateElements();
              },
            });
          }
        },
        onLeaveBack: () => {
          setIsVisible(false);
          // Slide section back down
          if (section) {
            gsap.to(section, { y: "100%", duration: 1, ease: "power2.out" });
          }
          reverseElements();

          if (typeof window !== "undefined" && window.heroScrollTrigger) {
            window.heroScrollTrigger.enable();
            // ScrollTrigger.refresh();
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div
        ref={firstSpacerRef}
        className="relative w-full h-[1px] pointer-events-none"
      />
      <div
        id="faq"
        ref={spacerRef}
        className="relative w-full h-[300vh] pointer-events-none"
      />

      <section
        ref={sectionRef}
        className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-20"
      >
        <div ref={containerRef} className="absolute w-full h-full">
          <div
            ref={bgRef}
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
            ref={topLeftRef}
            src={
              typeof window !== "undefined" && window.innerWidth < 1024
                ? "/faq/top-left-mob.webp"
                : "/faq/top-left.webp"
            }
            alt=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: 5,
              pointerEvents: "none",
              width:
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? "180px"
                  : "280px",
              height: "auto",
              aspectRatio: "426/480",
            }}
          />

          {/* Bottom Right Decoration */}
          <img
            ref={bottomRightRef}
            src="/faq/bottom-right.webp"
            alt=""
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: 5,
              pointerEvents: "none",
              width: "100%",
              maxWidth:
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? "250px"
                  : "426px",
              height: "auto",
              aspectRatio: "426/343",
            }}
          />

          <h1
            ref={titleRef}
            className="font-akira"
            style={{
              position: "absolute",
              width: "291px",
              height: "160px",
              left:
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? "20px"
                  : "160px",
              top:
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? "140px"
                  : "80px",
              fontStyle: "normal",
              fontWeight: "800",
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? "50px"
                  : "87.94px",
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

          <div
            ref={tableRef}
            className="relative z-10 px-4 h-full pt-8 md:-mt-16 pb-32"
          >
            <FAQTable items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
