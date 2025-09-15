import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold">MachSchritt</div>
      <div className="space-x-4">
        <Link href="/">Startseite</Link>
        <Link href="/ueber-uns">Über uns</Link>
        <Link href="/fuer-einrichtungen">Für Einrichtungen</Link>
        <Link href="/fuer-pflegekraefte">Für Pflegekräfte</Link>
        <Link href="/fachbereiche">Fachbereiche</Link>
        <Link href="/kontakt">Kontakt</Link>
      </div>
    </nav>
  )
}
