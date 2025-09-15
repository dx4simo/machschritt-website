import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="MachSchritt - Startseite">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Willkommen bei MachSchritt</h1>
        <p className="mt-4 text-lg">Ihre zuverlässige Pflegevermittlung für Deutschland.</p>
        <img src="/images/nurse1.jpg" alt="Pflegekräfte" className="mx-auto mt-6 rounded-lg shadow-lg w-1/2"/>
      </div>
    </Layout>
  )
}
