import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Layout";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import VSLPlayer from "../components/VSLPlayer";
import ApplicationForm from "../components/ApplicationForm";
import ScrollingBanner from "../components/ScrollingBanner";
import RealClientStories from "../components/RealClientStories";
import ProgramSystem from "../components/ProgramSystem";
import ExclusiveProgram from "../components/ExclusiveProgram";
import FounderManifesto from "../components/FounderManifesto";
import FaqSection from "../components/FaqSection";
import FinalCTA from "../components/FinalCTA";
import StickyApplyBar from "../components/StickyApplyBar";
import ApplyButton from "../components/ApplyButton";
import { applyStep, dq } from "../data/copy";
import { trackEvent, EVENTS } from "../lib/sweepTracking";

export default function HomePage() {
  const location = useLocation();
  const [formOpen, setFormOpen] = useState(false);
  const [showDq, setShowDq] = useState(false);

  useEffect(() => {
    void trackEvent(EVENTS.PAGE_VIEW, { page: "home" });
  }, []);

  useEffect(() => {
    if (location.hash === "#disqualified") {
      setShowDq(true);
      document.getElementById("application-anchor")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  function openForm() {
    setFormOpen(true);
  }

  return (
    <>
      <Header onApply={openForm} />
      <main>
        <PageHero />
        <div className="container">
          <div id="application-anchor">
            <VSLPlayer />
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <ApplyButton onClick={openForm}>Apply Now →</ApplyButton>
            <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "0.6rem" }}>
              Limited Spots Available
            </p>
          </div>

          {showDq ? (
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                background: "var(--color-panel)",
              }}
            >
              <h3>{dq.headline}</h3>
              <p style={{ color: "var(--color-fg-muted)" }}>{dq.body}</p>
              <ul style={{ color: "var(--color-fg-muted)", fontSize: "0.9rem" }}>
                {dq.resources.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="dot" />
              {applyStep.eyebrowStep}
            </span>
            <h2 style={{ marginTop: "0.6rem" }}>{applyStep.headline}</h2>
            <p className="section-sub">{applyStep.subhead}</p>
            <div style={{ marginTop: "1.2rem" }}>
              <ApplyButton onClick={openForm}>Apply Now →</ApplyButton>
              <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "0.6rem" }}>
                {applyStep.scarcity}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <ScrollingBanner />
        </div>

        <RealClientStories />
        <ProgramSystem onApply={openForm} />
        <ExclusiveProgram onApply={openForm} />
        <FounderManifesto />
        <FaqSection />
        <FinalCTA onApply={openForm} />
      </main>
      <Footer />
      <StickyApplyBar onApply={openForm} />
      <ApplicationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
