import Header from "../components/Layout";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: "3rem 1.5rem", maxWidth: 720 }}>
        <h1>Contact</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem" }}>
          Questions about the program? Reach out directly.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <a href="https://instagram.com/ky.training" target="_blank" rel="noreferrer" className="accent">
            Instagram · @ky.training
          </a>
          <a href="mailto:ky.training8@gmail.com" className="accent">
            ky.training8@gmail.com
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
