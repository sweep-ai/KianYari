import Header from "../components/Layout";
import Footer from "../components/Footer";
import { manifesto } from "../data/copy";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: "3rem 1.5rem", maxWidth: 720 }}>
        <span className="eyebrow">
          <span className="dot" />
          Elite Player Academy
        </span>
        <h1 style={{ marginTop: "0.6rem" }}>About EPA</h1>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          {manifesto.founderBio}
        </p>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          EPA is designed for players at every competitive level — from ambitious club athletes and high school
          prospects to college-bound players looking to stand out in the recruiting process. Whether your goal is
          to make the varsity squad, earn a college scholarship, or simply become the best player you can be, EPA
          provides the roadmap and the accountability to get there.
        </p>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          What makes EPA different is who built it. KY Training brings deep, hands-on experience in player
          development, recruiting, and the modern soccer landscape. With over 150 players mentored, 2,000+ training
          hours delivered, and hundreds of recruiting sessions completed, EPA is not a generic coaching template —
          it is a battle-tested system refined through real results.
        </p>
        <p style={{ color: "var(--color-fg-muted)", marginTop: "1rem", lineHeight: 1.65 }}>
          {manifesto.founderBio2}
        </p>
      </main>
      <Footer />
    </>
  );
}
