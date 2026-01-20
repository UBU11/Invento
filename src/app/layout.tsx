import type { Metadata } from "next";
import "./globals.css"
import localFont from 'next/font/local';

const akira = localFont({
  src: [
    {
      path: "../../public/fonts/Akira Expanded Demo.otf",
      weight: "800",
      style: "normal"
    }
  ],
  variable: "--font-akira",
  display: "swap"
})

const flood = localFont({
  src: [
    {
      path: "../../public/fonts/Flood Std Regular.otf",
      weight: "400",
      style: "normal"
    }
  ],
  variable: "--font-flood",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Home",
  description: "next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${flood.variable} ${akira.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
