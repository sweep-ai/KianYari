import Footer from "../components/Footer";
import { manifesto } from "../data/copy";

export default function AboutPage() {
  return (
    <>
      <main className="container page-shell" style={{ maxWidth: 720 }}>
        <span className="eyebrow">
          <span className="dot" />
          Elite Player Academy
        </span>
        <h1 style={{ marginTop: "0.6rem" }}>About EPA</h1>
        <img
          src="/epa-mark.jpg"
          alt="Kian Yari at Missouri State"
          style={{ width: "100%", borderRadius: "var(--radius-md)", marginTop: "1.4rem" }}
        />
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          {manifesto.founderBio}
        </p>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          {manifesto.founderBio2}
        </p>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          {manifesto.founderBio3}
        </p>
      </main>
      <Footer />
    </>
  );
}
