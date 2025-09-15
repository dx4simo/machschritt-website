import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="MachSchritt Logo" width={150} height={50} />
        </Link>
        <div className="space-x-6">
          <Link href="/ueber-uns" className="text-gray-700 hover:text-blue-600">
            Über uns
          </Link>
          <Link href="/einrichtungen" className="text-gray-700 hover:text-blue-600">
            Für Einrichtungen
          </Link>
          <Link href="/pflegekraefte" className="text-gray-700 hover:text-blue-600">
            Für Pflegekräfte
          </Link>
          <Link href="/fachbereiche" className="text-gray-700 hover:text-blue-600">
            Fachbereiche
          </Link>
          <Link href="/kontakt" className="text-gray-700 hover:text-blue-600">
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}
