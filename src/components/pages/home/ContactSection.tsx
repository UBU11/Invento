"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactBackground from "./contact/ContactBackground";
import ContactAddress from "./contact/ContactAddress";
import ContactHeader from "./contact/ContactHeader";
import SocialLinks from "./contact/SocialLinks";
import ContactInfo from "./contact/ContactInfo";
import NavigationLinks from "./contact/NavigationLinks";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const leftNavLinks = [
  { text: "Team Invento26", href: "/about" },
  { text: "GEC Palakkad", href: "https://maps.app.goo.gl/dn4B5Sjjsw1mdPPt8" },
];

const rightNavLinks = [
  { text: "Register", href: "https://app.makemypass.com/event/day-pass" },
  {
    text: "Saptha",
    href: "https://www.instagram.com/sapthagecpalakkad?igsh=d3J6cHE1b3Y5ZDVj",
  },
  {
    text: "Taksathi",
    href: "https://www.instagram.com/gecfashionclub?igsh=cjg0MHB3Mjd4cHly",
  },
  {
    text: "Natya",
    href: "https://www.instagram.com/_nh_13_?igsh=NmJmOHdkNmwxcGNz",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Refs for animated elements
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const bottomImageRef = useRef<HTMLImageElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const socialLinksRefs = useRef<(HTMLAnchorElement | null)[]>(
    new Array(4).fill(null),
  );
  const emailRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLParagraphElement>(null);
  const leftNavTitleRef = useRef<HTMLParagraphElement>(null);
  const leftNavLinksRefs = useRef<(HTMLAnchorElement | null)[]>(
    new Array(4).fill(null),
  );
  const rightNavTitleRef = useRef<HTMLParagraphElement>(null);
  const rightNavLinksRefs = useRef<(HTMLAnchorElement | null)[]>(
    new Array(4).fill(null),
  );

  useEffect(() => {
    const section = sectionRef.current;
    const spacer = spacerRef.current;
    const container = containerRef.current;
    const bg = bgRef.current;
    const logo = logoRef.current;
    const bottomImg = bottomImageRef.current;
    const address = addressRef.current;
    const header = headerRef.current;
    const email = emailRef.current;
    const phone = phoneRef.current;
    const leftNavTitle = leftNavTitleRef.current;
    const rightNavTitle = rightNavTitleRef.current;

    if (!section || !spacer || !container) return;

    const ctx = gsap.context(() => {
      // Initial states with transforms - only set if elements exist
      // Section starts below screen and will slide up
      if (section) gsap.set(section, { y: "100%" });
      // Background is visible at full opacity
      if (bg) gsap.set(bg, { opacity: 1 });
      if (logo) gsap.set(logo, { opacity: 0, x: 300 });
      if (bottomImg) gsap.set(bottomImg, { opacity: 0, y: 200 });
      if (address) gsap.set(address, { opacity: 0, x: 300 });
      if (header) gsap.set(header, { opacity: 0, y: -150 });
      if (email) gsap.set(email, { opacity: 0, y: 50 });
      if (phone) gsap.set(phone, { opacity: 0, y: 50 });
      if (leftNavTitle) gsap.set(leftNavTitle, { opacity: 0, x: 300 });
      if (rightNavTitle) gsap.set(rightNavTitle, { opacity: 0, x: 300 });

      // Set initial states for social links
      socialLinksRefs.current.forEach((link) => {
        if (link) gsap.set(link, { opacity: 0, y: -150 });
      });

      // Set initial states for navigation links
      leftNavLinksRefs.current.forEach((link) => {
        if (link) gsap.set(link, { opacity: 0, x: 300 });
      });
      rightNavLinksRefs.current.forEach((link) => {
        if (link) gsap.set(link, { opacity: 0, x: 300 });
      });

      // Make sure section is visible for animation
      if (section) gsap.set(section, { visibility: "visible" });

      // Store timeline reference for reversing
      let elementTl: gsap.core.Timeline | null = null;
      let isEntering = false;

      // Reset elements to initial state
      const resetElements = () => {
        if (logo) gsap.set(logo, { opacity: 0, x: 300 });
        if (bottomImg) gsap.set(bottomImg, { opacity: 0, y: 200 });
        if (address) gsap.set(address, { opacity: 0, x: 300 });
        if (header) gsap.set(header, { opacity: 0, y: -150 });
        if (email) gsap.set(email, { opacity: 0, y: 50 });
        if (phone) gsap.set(phone, { opacity: 0, y: 50 });
        if (leftNavTitle) gsap.set(leftNavTitle, { opacity: 0, x: 300 });
        if (rightNavTitle) gsap.set(rightNavTitle, { opacity: 0, x: 300 });
        socialLinksRefs.current.forEach((link) => {
          if (link) gsap.set(link, { opacity: 0, y: -150 });
        });
        leftNavLinksRefs.current.forEach((link) => {
          if (link) gsap.set(link, { opacity: 0, x: 300 });
        });
        rightNavLinksRefs.current.forEach((link) => {
          if (link) gsap.set(link, { opacity: 0, x: 300 });
        });
      };

      // Time-based animation for elements (not scroll-based)
      const animateElements = () => {
        // Kill any existing timeline before creating new one
        if (elementTl) {
          elementTl.kill();
          elementTl = null;
        }

        // Reset elements to initial state first
        resetElements();

        elementTl = gsap.timeline({});

        if (logo)
          elementTl.to(
            logo,
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (bottomImg)
          elementTl.to(
            bottomImg,
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
            0,
          );
        if (address)
          elementTl.to(
            address,
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (header)
          elementTl.to(
            header,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (email)
          elementTl.to(
            email,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (phone)
          elementTl.to(
            phone,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (leftNavTitle)
          elementTl.to(
            leftNavTitle,
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0,
          );
        if (rightNavTitle)
          elementTl.to(
            rightNavTitle,
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0,
          );

        // Social links animate
        socialLinksRefs.current.forEach((link) => {
          if (link) {
            elementTl!.to(
              link,
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
              0,
            );
          }
        });

        // Left nav links animate
        leftNavLinksRefs.current.forEach((link) => {
          if (link) {
            elementTl!.to(
              link,
              { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
              0,
            );
          }
        });

        // Right nav links animate
        rightNavLinksRefs.current.forEach((link) => {
          if (link) {
            elementTl!.to(
              link,
              { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
              0,
            );
          }
        });
      };

      // Reverse elements animation
      const reverseElements = () => {
        if (elementTl && !isEntering) {
          elementTl.reverse();
          elementTl = null;
        }
      };

      // Section slides up immediately when FAQ section ends
      ScrollTrigger.create({
        trigger: spacer,
        start: "top bottom",
        onEnter: () => {
          setIsVisible(true);
          isEntering = true;
          // Immediately slide section up completely
          if (section) {
            gsap.to(section, {
              y: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                // Trigger element animations after slide completes
                animateElements();
                setTimeout(() => {
                  isEntering = false;
                }, 2500);
              },
            });
          }
          // Immediately reset and clear any existing timeline
          if (elementTl) {
            elementTl.kill();
            elementTl = null;
          }
          resetElements();
        },
        onEnterBack: () => {
          setIsVisible(true);
          isEntering = true;
          // Immediately slide section up completely
          if (section) {
            gsap.to(section, {
              y: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                // Trigger element animations after slide completes
                animateElements();
                setTimeout(() => {
                  isEntering = false;
                }, 2500);
              },
            });
          }
          // Immediately reset and clear any existing timeline
          if (elementTl) {
            elementTl.kill();
            elementTl = null;
          }
          resetElements();
        },
        onLeaveBack: () => {
          setIsVisible(false);
          isEntering = false;
          // Slide section back down
          if (section) {
            gsap.to(section, { y: "100%", duration: 1, ease: "power2.out" });
          }
          reverseElements();

          if (typeof window !== "undefined" && window.heroScrollTrigger) {
            window.heroScrollTrigger.enable();
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        id="contact"
        ref={spacerRef}
        className="relative w-full h-[200vh] pointer-events-none"
      />

      <section
        ref={sectionRef}
        className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-40"
      >
        <div ref={containerRef} className="absolute w-full h-full">
          <ContactBackground
            sectionRef={sectionRef}
            showElements={isVisible}
            bgRef={bgRef}
            logoRef={logoRef}
            bottomImageRef={bottomImageRef}
          />
          <ContactAddress showElements={isVisible} addressRef={addressRef} />
          <ContactHeader showElements={isVisible} headerRef={headerRef} />
          <SocialLinks
            showElements={isVisible}
            socialLinksRefs={socialLinksRefs}
          />
          <ContactInfo
            showElements={isVisible}
            emailRef={emailRef}
            phoneRef={phoneRef}
          />
          <NavigationLinks
            showElements={isVisible}
            title="About us"
            titleRight="400px"
            titleTop="250px"
            links={leftNavLinks}
            linksRight="440px"
            linksTop="320"
            titleRef={leftNavTitleRef}
            linksRefs={leftNavLinksRefs}
          />
          <NavigationLinks
            showElements={isVisible}
            title="Useful links"
            titleRight="180px"
            titleTop="250px"
            links={rightNavLinks}
            linksRight="200px"
            linksTop="320"
            titleRef={rightNavTitleRef}
            linksRefs={rightNavLinksRefs}
          />
        </div>
      </section>
    </>
  );
}
