import { hero } from "../data/copy";
import EpaLogo from "./EpaLogo";
import "./PageHero.css";

export default function PageHero() {
  const parts = hero.headline.split(hero.headlineAccent);
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero__brand">
          <EpaLogo variant="lockup" />
        </div>
        <div className="eyebrow page-hero__step">
          <span className="dot" />
          {hero.eyebrowStep}
        </div>
        <h1 className="page-hero__headline">
          {parts[0]}
          <span className="accent">{hero.headlineAccent}</span>
          {parts[1]}
        </h1>
        <p className="page-hero__sub">{hero.subhead}</p>
      </div>
    </section>
  );
}
