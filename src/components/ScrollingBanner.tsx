import { proofGrid, testimonials } from "../data/assets";
import "./ScrollingBanner.css";

type CaptionItem = { src: string; name: string; caption: string };

type Props = {
  reverse?: boolean;
  captioned?: boolean;
};

export default function ScrollingBanner({ reverse = false, captioned = false }: Props) {
  if (captioned) {
    const items: CaptionItem[] = testimonials.map((t) => ({
      src: t.photo,
      name: t.name,
      caption: t.tag,
    }));
    const doubled = [...items, ...items];
    return (
      <div className={`scrolling-banner scrolling-banner--captioned ${reverse ? "is-reverse" : ""}`}>
        <div className="scrolling-banner__track">
          {doubled.map((item, i) => (
            <figure key={`${item.name}-${i}`} className="scrolling-banner__card">
              <img src={item.src} alt="" />
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  const doubled = [...proofGrid, ...proofGrid];
  return (
    <div className={`scrolling-banner ${reverse ? "is-reverse" : ""}`} aria-hidden="true">
      <div className="scrolling-banner__track">
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}
