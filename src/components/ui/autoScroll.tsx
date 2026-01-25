"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function AutoScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    // IMPORTANT: wait for preload + pin setup
    const timeout = setTimeout(() => {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: target,
          offsetY: 0,
        },
        ease: "power3.out",
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
