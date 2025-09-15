import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Willkommen bei MachSchritt
        </h2>
        <p className="text-lg text-gray-700">
          Ihr Partner für qualifizierte Pflegekräfte und nachhaltige Lösungen im Gesundheitswesen.
        </p>
      </div>
      <Footer />
    </div>
  );
}
