import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="relative h-[70vh] flex items-center justify-center bg-gray-800 text-white">
          <Image
            src="/hero.jpg"
            alt="Pflegekräfte"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-70"
          />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Willkommen bei MachSchritt</h1>
            <p className="mt-4 text-lg">Pflegekräfte für Deutschland – mit Herz und Kompetenz</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
