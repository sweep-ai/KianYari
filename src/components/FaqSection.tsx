import { useState } from "react";
import { faq } from "../data/copy";
import SectionTitle from "./SectionTitle";
import "./FaqSection.css";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <SectionTitle kicker={faq.kicker} title={faq.headline} sub={faq.sub} />
        <div className="faq-list">
          {faq.items.map((item, i) => (
            <div key={item.q} className="faq-item">
              <button className="faq-item__q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <span>{open === i ? "–" : "+"}</span>
              </button>
              {open === i ? <p className="faq-item__a">{item.a}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
