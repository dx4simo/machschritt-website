import Navbar from "../components/Navbar";

export default function Einrichtungen() {
  return (
    <div>
      <Navbar />
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Für Einrichtungen</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Wir unterstützen Kliniken und Pflegeheime mit erfahrenen Pflegekräften
          und bieten nachhaltige Lösungen für den Fachkräftemangel.
        </p>
      </section>
    </div>
  );
}
