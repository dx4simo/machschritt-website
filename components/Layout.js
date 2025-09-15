import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>{children}</main>
      <footer style={{ marginTop: "40px", padding: "20px", background: "#eee" }}>
        © 2025 MachSchritt - Pflegekräfte in Deutschland
      </footer>
    </>
  );
}
