export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center py-6 mt-10">
      <p>© {new Date().getFullYear()} MachSchritt GmbH – Alle Rechte vorbehalten.</p>
      <p className="mt-2 text-sm">
        Pflegekräfte für Deutschland | Kontakt: info@machschritt.com
      </p>
    </footer>
  );
}
