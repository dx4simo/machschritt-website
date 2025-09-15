import Navbar from "../components/Navbar";

export default function Kontakt() {
  return (
    <div>
      <Navbar />
      <section className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Sie erreichen uns unter <b>info@machschritt.com</b> oder über das
          Kontaktformular.
        </p>
        <a
          href="mailto:info@machschritt.com"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          E-Mail senden
        </a>
      </section>
    </div>
  );
}
