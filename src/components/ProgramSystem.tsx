import { system } from "../data/copy";
import SectionTitle from "./SectionTitle";
import ApplyButton from "./ApplyButton";
import "./ProgramSystem.css";

export default function ProgramSystem({ onApply }: { onApply: () => void }) {
  return (
    <section id="program" className="program-system">
      <div className="container">
        <SectionTitle kicker={system.kicker} title={system.headline} sub={system.sub} />
        <div className="program-system__phases">
          {system.phases.map((phase) => (
            <div key={phase.tag} className="program-phase">
              <span className="program-phase__tag">{phase.tag}</span>
              <h3 className="program-phase__title">{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="program-system__cta">
          <ApplyButton onClick={onApply}>Apply Now →</ApplyButton>
          <span className="program-system__scarcity">Limited Spots Available</span>
        </div>
      </div>
    </section>
  );
}
