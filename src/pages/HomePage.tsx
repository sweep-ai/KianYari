import { useEffect } from "react";
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
import { applyStep } from "../data/copy";
import { trackEvent, EVENTS } from "../lib/sweepTracking";

export default function HomePage() {
  useEffect(() => {
    void trackEvent(EVENTS.PAGE_VIEW, { page: "home" });
  }, []);

  function openForm() {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <main>
        <PageHero />
        <div className="container">
          <div id="application-anchor">
            <VSLPlayer />
          </div>

          <div id="apply" style={{ marginTop: "3rem", scrollMarginTop: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>
                <span className="dot" />
                {applyStep.eyebrowStep}
              </span>
              <h2 style={{ marginTop: "0.6rem" }}>{applyStep.headline}</h2>
              <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "0.6rem" }}>
                {applyStep.scarcity}
              </p>
            </div>
            <ApplicationForm variant="inline" open />
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <ScrollingBanner />
          <div style={{ marginTop: "1rem" }}>
            <ScrollingBanner reverse captioned />
          </div>
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
    </>
  );
}
