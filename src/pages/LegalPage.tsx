import Footer from "../components/Footer";

type Props = { title: string; children: React.ReactNode };

export default function LegalPage({ title, children }: Props) {
  return (
    <>
      <main className="container page-shell" style={{ maxWidth: 720 }}>
        <h1>{title}</h1>
        <div style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.7, fontSize: "0.92rem" }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
