import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Willkommen bei MachSchritt
          </h1>
          <p className="text-lg text-gray-200 mb-8">
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
    </Layout>
  );
}
