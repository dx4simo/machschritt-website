import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="bg-blue-50 min-h-screen flex items-center justify-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Willkommen bei MachSchritt
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ihr Partner für qualifizierte Pflegekräfte und nachhaltige
            Lösungen im Gesundheitswesen.
          </p>
          <a
            href="/kontakt"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </div>
  );
}
