import Layout from '../components/Layout';

export default function FuerPflegekraefte() {
  return (
    <Layout title="Für Pflegekräfte">
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Für Pflegekräfte</h1>
        <p>Wir begleiten Pflegekräfte auf ihrem Weg nach Deutschland und helfen bei allen Schritten.</p>
        <img src="/images/nurse3.jpg" alt="Pflegekräfte" className="mt-6 rounded-lg shadow-lg w-1/2"/>
      </div>
    </Layout>
  )
}
