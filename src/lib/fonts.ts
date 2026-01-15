import localFont from "next/font/local";

export const akira = localFont({
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

export const urbanist = localFont({
  src: [
    {
      path: "../../public/fonts/Urbanist-VariableFont_wght.ttf",
      weight: "100 900",
    },
  ],
  variable: "--font-urbanist",
  display: "swap",
});

export const flood = localFont({
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

export const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});
