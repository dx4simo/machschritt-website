import Layout from "../components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <h1>Willkommen bei MachSchritt</h1>
      <p>
        Wir bringen qualifizierte Pflegekräfte aus dem Ausland nach Deutschland,
        um das Gesundheitssystem zu unterstützen.
      </p>
      <Image src="/nurses1.jpg" alt="Pflegekräfte" width={600} height={400} />
    </Layout>
  );
}
