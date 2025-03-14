import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Developer Credits */}
        <p className="footer-text">Developed by <strong>Sefayet Alam</strong> & <strong>Sporsha Paul</strong></p>
        
        {/* Social Links */}
        <div className="social-links">
          <a href="https://github.com/Sefayet-Alam" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sefayet-alam-8333b4242/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:sefayetalam14@gmail.com">
            <FaEnvelope size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-text">&copy; {new Date().getFullYear()} SellSense. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
