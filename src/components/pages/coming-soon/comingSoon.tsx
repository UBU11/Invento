import MenuBar from "../../ui/menuBar";

export default function ComingSoonPage() {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-[url('/coming-soon/coming-soon-bg.jpg')] bg-cover">
      <h1 className="font-akira text-6xl md:text-9xl bg-linear-to-b from-black to-[#FFFFFF00] text-transparent bg-clip-text text-center">
        COMING SOON
      </h1>

      <div className="absolute bottom-8">
        <MenuBar />
      </div>
    </div>
  );
}
