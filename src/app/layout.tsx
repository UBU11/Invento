import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/src/context/EventContext";
import { akira, flood, poppins, urbanist } from "../lib/fonts";
import MenuPortal from "../components/ui/menubar/menuPortal";
import { LoadingProvider } from "../components/providers/LoadingProvider";
import AutoScroll from "../components/ui/autoScroll";

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
        className={`${poppins.variable} ${urbanist.variable} ${flood.variable} ${akira.variable} antialiased overflow-x-hidden`}
      >
        <LoadingProvider>
          <AutoScroll />
          <EventProvider>{children}</EventProvider>
          <MenuPortal />
        </LoadingProvider>
      </body>
    </html>
  );
}
