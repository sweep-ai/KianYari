import { Link, useNavigate } from "react-router-dom";
import { brand, nav } from "../data/copy";
import EpaLogo from "./EpaLogo";
import ApplyButton from "./ApplyButton";
import "./Layout.css";

export default function Header({ onApply }: { onApply?: () => void }) {
  const navigate = useNavigate();

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (window.location.pathname !== "/") {
        navigate("/" + href);
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link to="/" className="site-header__logo">
          <EpaLogo variant="mark" />
        </Link>
        <nav className="site-header__nav">
          {nav.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
        <ApplyButton
          className="site-header__cta"
          onClick={onApply ?? (() => navigate("/#apply"))}
        >
          {brand.applyLabel} ↗
        </ApplyButton>
      </div>
    </header>
  );
}
