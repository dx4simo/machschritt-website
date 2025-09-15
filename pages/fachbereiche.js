import Navbar from "../components/Navbar";

export default function Fachbereiche() {
  return (
    <div>
      <Navbar />
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Fachbereiche</h1>
        <ul className="text-gray-700 max-w-2xl mx-auto space-y-2">
          <li>👩‍⚕️ Altenpflege</li>
          <li>🏥 Krankenpflege</li>
          <li>💉 Intensivpflege</li>
        </ul>
      </section>
    </div>
  );
}
