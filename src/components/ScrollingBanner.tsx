import { proofGrid } from "../data/assets";
import "./ScrollingBanner.css";

export default function ScrollingBanner() {
  const doubled = [...proofGrid, ...proofGrid];
  return (
    <div className="scrolling-banner" aria-hidden="true">
      <div className="scrolling-banner__track">
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}
