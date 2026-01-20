export default function ComingSoonPage() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-[url('/coming-soon/coming-soon-mob.webp')] lg:bg-[url('/coming-soon/coming-soon-web.webp')] bg-center bg-cover">
      <h1 className="flex flex-col xl:flex-row font-akira text-6xl md:text-9xl text-center lg:gap-12">
        <span className="bg-linear-to-b from-black to-[#FFFFFF00] text-transparent bg-clip-text ">
          COMING
        </span>
        <span className="bg-linear-to-b from-black to-[#FFFFFF00] text-transparent bg-clip-text ">
          SOON
        </span>
      </h1>
    </div>
  );
}
