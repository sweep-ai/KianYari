import { Link } from "react-router-dom";
import { footer } from "../data/copy";
import EpaLogo from "./EpaLogo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <EpaLogo variant="lockup" />
          <div className="site-footer__sub" style={{ marginTop: "0.6rem" }}>
            {footer.subLine}
          </div>
        </div>
        <nav className="site-footer__links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <div className="site-footer__legal">{footer.legal}</div>
      </div>
    </footer>
  );
}
