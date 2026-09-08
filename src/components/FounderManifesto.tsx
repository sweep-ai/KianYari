import { manifesto } from "../data/copy";
import { atmosphereTextureB } from "../data/assets";
import "./FounderManifesto.css";

export default function FounderManifesto() {
  return (
    <section className="founder-manifesto">
      <div className="container founder-manifesto__inner">
        <img src={atmosphereTextureB} alt="" />
        <div>
          {manifesto.lines.map((line, i) => (
            <p key={i} className={i % 2 === 1 ? "founder-manifesto__line is-emphasized" : "founder-manifesto__line"}>
              {line}
            </p>
          ))}
          <p className="founder-manifesto__bio">{manifesto.founderBio}</p>
          <p className="founder-manifesto__bio">{manifesto.founderBio2}</p>
        </div>
      </div>
    </section>
  );
}
