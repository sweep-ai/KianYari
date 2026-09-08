import { exclusive } from "../data/copy";
import { atmosphereTextureA } from "../data/assets";
import ApplyButton from "./ApplyButton";
import "./ExclusiveProgram.css";

export default function ExclusiveProgram({ onApply }: { onApply: () => void }) {
  return (
    <section className="exclusive-program">
      <div className="exclusive-program__media">
        <img src={atmosphereTextureA} alt="" />
      </div>
      <div className="container exclusive-program__content">
        <span className="exclusive-program__badge">{exclusive.badge}</span>
        <span className="eyebrow">
          <span className="dot" />
          {exclusive.kicker}
        </span>
        <h2>{exclusive.headline}</h2>
        <p>{exclusive.body}</p>
        <div className="exclusive-program__stats">
          {exclusive.stats.map((s) => (
            <div key={s.label}>
              <div className="exclusive-program__stat-value">{s.value}</div>
              <div className="exclusive-program__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="exclusive-program__footline">{exclusive.footline}</p>
        <ApplyButton onClick={onApply}>Apply Now →</ApplyButton>
        <span className="exclusive-program__scarcity">Limited Spots Available</span>
      </div>
    </section>
  );
}
