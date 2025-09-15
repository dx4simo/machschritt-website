import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#0070f3", color: "#fff" }}>
      <Link href="/">Startseite</Link> |{" "}
      <Link href="/ueber-uns">Über uns</Link> |{" "}
      <Link href="/einrichtungen">Für Einrichtungen</Link> |{" "}
      <Link href="/pflegekraefte">Für Pflegekräfte</Link> |{" "}
      <Link href="/fachbereiche">Fachbereiche</Link> |{" "}
      <Link href="/kontakt">Kontakt</Link>
    </nav>
  );
}
