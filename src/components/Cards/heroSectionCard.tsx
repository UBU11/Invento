export default function heroSectionCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-0">
      <div className="card h-auto min-h-72 md:min-h-80 lg:min-h-80 backdrop-blur-md p-6 opacity-0 translate-y-10 border-2 "></div>

      <div className="card h-80 backdrop-blur-md  p-6 opacity-0 translate-y-10 border-2 "></div>

      <div className="card h-80 backdrop-blur-md  p-6 opacity-0 translate-y-10 border-2 "></div>
    </div>
  );
}
