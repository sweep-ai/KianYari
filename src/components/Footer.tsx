import { Link } from "react-router-dom";
import { footer } from "../data/copy";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <div className="site-footer__brand">{footer.brandLine}</div>
          <div className="site-footer__sub">{footer.subLine}</div>
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
