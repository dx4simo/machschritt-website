export default function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded">
        <h1 className="text-4xl md:text-6xl font-bold">MachSchritt GmbH</h1>
        <p className="mt-4 text-lg">
          Pflegekräfte für Deutschland – mit Herz und Kompetenz
        </p>
      </div>
    </div>
  );
}
