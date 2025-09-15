import Layout from '../components/Layout';

export default function UeberUns() {
  return (
    <Layout title="Über uns">
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Über uns</h1>
        <p>MachSchritt ist spezialisiert auf die Vermittlung qualifizierter Pflegekräfte für Einrichtungen in Deutschland.</p>
        <img src="/images/nurse2.jpg" alt="Über uns" className="mt-6 rounded-lg shadow-lg w-1/2"/>
      </div>
    </Layout>
  )
}
