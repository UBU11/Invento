import localFont from 'next/font/local'

export const akira = localFont({
  src: [
    {
      path: '../../public/fonts/AkiraExpanded-SuperBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-akira',
})
