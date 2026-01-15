"use client";

import { useRef } from "react";
import ContactBackground from "./contact/ContactBackground";
import ContactAddress from "./contact/ContactAddress";
import ContactHeader from "./contact/ContactHeader";
import SocialLinks from "./contact/SocialLinks";
import ContactInfo from "./contact/ContactInfo";
import NavigationLinks from "./contact/NavigationLinks";

const leftNavLinks = [
  { text: "The team", href: "#" },
  { text: "Events", href: "#" },
  { text: "FAQ", href: "#" },
  { text: "Contact", href: "#" },
];

const rightNavLinks = [
  { text: "The team", href: "#" },
  { text: "Events", href: "#" },
  { text: "FAQ", href: "#" },
  { text: "Contact", href: "#" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <ContactBackground sectionRef={sectionRef} />
      <ContactAddress />
      <ContactHeader />
      <SocialLinks />
      <ContactInfo />
      <NavigationLinks
        title="About us"
        titleRight="400px"
        titleTop="250px"
        links={leftNavLinks}
        linksRight="440px"
        linksTop="320"
      />
      <NavigationLinks
        title="Useful links"
        titleRight="180px"
        titleTop="250px"
        links={rightNavLinks}
        linksRight="200px"
        linksTop="320"
      />
    </section>
  );
}

