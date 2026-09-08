import { finalCta } from "../data/copy";
import ApplyButton from "./ApplyButton";
import "./FinalCTA.css";

export default function FinalCTA({ onApply }: { onApply: () => void }) {
  return (
    <section className="final-cta">
      <div className="container">
        <span className="eyebrow final-cta__kicker">
          <span className="dot" />
          {finalCta.kicker}
        </span>
        <h2>{finalCta.headline}</h2>
        <p>{finalCta.sub}</p>
        <ApplyButton onClick={onApply}>{finalCta.button} →</ApplyButton>
        <div className="final-cta__badges">
          {finalCta.badges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
