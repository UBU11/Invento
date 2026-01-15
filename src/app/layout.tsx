import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { EventProvider } from "@/src/context/EventContext";

const akira = localFont({
  src: [
    {
      path: "../../public/fonts/Akira Expanded Demo.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-akira",
  display: "swap",
});

const urbanist = localFont({
  src: [
    {
      path: "../../public/fonts/Urbanist-VariableFont_wght.ttf",
      weight: "100 900",
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

const flood = localFont({
  src: [
    {
      path: "../../public/fonts/Flood Std Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-flood",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invento",
  description: "next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${flood.variable} ${akira.variable} antialiased`}
      >
        <EventProvider>{children}</EventProvider>
      </body>
    </html>
  );
}
