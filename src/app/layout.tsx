import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/src/context/EventContext";
import { akira, flood, poppins, urbanist } from "../lib/fonts";

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
        className={`${poppins.variable} ${urbanist.variable} ${flood.variable} ${akira.variable} antialiased`}
      >
        <EventProvider>{children}</EventProvider>
      </body>
    </html>
  );
}
