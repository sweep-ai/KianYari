import { testimonials } from "../data/assets";
import { stories } from "../data/copy";
import SectionTitle from "./SectionTitle";
import "./RealClientStories.css";

export default function RealClientStories() {
  return (
    <section id="stories" className="client-stories">
      <div className="container">
        <SectionTitle kicker={stories.kicker} title={stories.headline} sub={stories.sub} />
        <div className="client-stories__list">
          {testimonials.map((t) => (
            <article key={t.name} className="client-story">
              <span className="client-story__tag">{t.tag}</span>
              <img src={t.photo} alt={t.name} />
              <div className="client-story__body">
                <div className="client-story__name">{t.name}</div>
                <div className="client-story__role">{t.role}</div>
                {t.quote ? <p className="client-story__quote">"{t.quote}"</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
