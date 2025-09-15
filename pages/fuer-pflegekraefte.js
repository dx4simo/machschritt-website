import Navbar from "../components/Navbar";

export default function Pflegekraefte() {
  return (
    <div>
      <Navbar />
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Für Pflegekräfte</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Wir begleiten Pflegekräfte auf ihrem Weg nach Deutschland – von der
          Bewerbung bis zur erfolgreichen Integration im Arbeitsumfeld.
        </p>
      </section>
    </div>
  );
}
