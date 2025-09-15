import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={120} height={40} />
        </Link>
        <div className="space-x-6">
          <Link href="/ueber-uns" className="hover:text-blue-600">Über uns</Link>
          <Link href="/einrichtungen" className="hover:text-blue-600">Für Einrichtungen</Link>
          <Link href="/pflegekraefte" className="hover:text-blue-600">Für Pflegekräfte</Link>
          <Link href="/fachbereiche" className="hover:text-blue-600">Fachbereiche</Link>
          <Link href="/kontakt" className="hover:text-blue-600">Kontakt</Link>
        </div>
      </div>
    </nav>
  );
}
