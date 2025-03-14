import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"; // Import the CSS file

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Brand Logo with an Icon */}
        <Link to="/" className="navbar-brand brand-large">
          🛒 SellSense
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/chat" className="nav-link">Chat</Link>
            </li>
            <li className="nav-item">
              <Link to="/reviews" className="nav-link">Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
