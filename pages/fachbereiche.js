import Layout from '../components/Layout';

export default function Fachbereiche() {
  return (
    <Layout title="Fachbereiche">
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Fachbereiche</h1>
        <ul className="list-disc ml-6">
          <li>Altenpflege</li>
          <li>Krankenpflege</li>
          <li>Intensivpflege</li>
        </ul>
      </div>
    </Layout>
  )
}
