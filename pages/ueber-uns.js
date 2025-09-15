import Navbar from "../components/Navbar";

export default function UeberUns() {
  return (
    <div>
      <Navbar />
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Über uns</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          MachSchritt ist ein Unternehmen, das Pflegekräfte aus verschiedenen
          Ländern nach Deutschland bringt, um Einrichtungen mit qualifiziertem
          Personal zu unterstützen.
        </p>
      </section>
    </div>
  );
}
