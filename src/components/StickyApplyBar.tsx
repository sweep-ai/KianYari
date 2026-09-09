import { useEffect, useState } from "react";
import ApplyButton from "./ApplyButton";
import { brand } from "../data/copy";
import "./StickyApplyBar.css";

export default function StickyApplyBar({ onApply }: { onApply: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("apply") || document.getElementById("application-anchor");
    if (!form) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && window.scrollY > 400),
      { rootMargin: "-10% 0px -60% 0px" }
    );
    io.observe(form);
    const onScroll = () => setVisible(window.scrollY > 400 && !isFormNearViewport());
    function isFormNearViewport() {
      const el = document.getElementById("apply") || document.getElementById("application-anchor");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`sticky-apply ${visible ? "sticky-apply--visible" : ""}`}>
      <ApplyButton onClick={onApply}>{brand.stickyLabel} →</ApplyButton>
    </div>
  );
}
