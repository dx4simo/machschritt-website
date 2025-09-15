import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Image src="/logo.svg" alt="MachSchritt Logo" width={50} height={50} />
        </Link>
        <div className="space-x-6">
          <Link href="/ueber-uns">Über uns</Link>
          <Link href="/einrichtungen">Für Einrichtungen</Link>
          <Link href="/pflegekraefte">Für Pflegekräfte</Link>
          <Link href="/fachbereiche">Fachbereiche</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
      </div>
    </nav>
  );
}
