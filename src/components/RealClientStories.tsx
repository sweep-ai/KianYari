import { videoTestimonials } from "../data/videos";
import { stories } from "../data/copy";
import { useExclusiveHtmlVideo } from "../lib/exclusiveVideo";
import SectionTitle from "./SectionTitle";
import "./RealClientStories.css";

function TestimonialVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useExclusiveHtmlVideo(`testimonial-${src}`);

  return <video ref={videoRef} src={src} poster={poster} controls playsInline preload="none" />;
}

export default function RealClientStories() {
  return (
    <section id="stories" className="client-stories">
      <div className="container">
        <SectionTitle kicker={stories.kicker} title={stories.headline} sub={stories.sub} />
        <div className="client-stories__videos">
          {videoTestimonials.map((t) => (
            <article key={t.src} className={`client-story-video client-story-video--${t.orientation}`}>
              <TestimonialVideo src={t.src} poster={t.poster} />
              <div className="client-story-video__body">
                <div className="client-story-video__name">{t.name}</div>
                <div className="client-story-video__role">{t.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
