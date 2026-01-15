interface SocialLink {
  href: string;
  src: string;
  alt: string;
  left: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/invento_gecpalakkad",
    src: "/contact/ig.svg",
    alt: "Instagram",
    left: "192px",
  },
  {
    href: "https://youtube.com/@inventogecpalakkad2600",
    src: "/contact/yt.svg",
    alt: "YouTube",
    left: "320px",
  },
  {
    href: "https://www.facebook.com/share/17kUJeAfrY/",
    src: "/contact/fb.svg",
    alt: "Facebook",
    left: "456px",
  },
  {
    href: "#",
    src: "/contact/in.svg",
    alt: "LinkedIn",
    left: "592px",
  },
];

export default function SocialLinks() {
  return (
    <>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: link.left,
            top: "240px",
            zIndex: 20,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <img
            src={link.src}
            alt={link.alt}
            style={{
              width: "auto",
              height: "40px",
              display: "block",
            }}
          />
        </a>
      ))}
    </>
  );
}

