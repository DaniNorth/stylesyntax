import './Footer.css';
import { Link } from 'react-router-dom';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/quiz">Style Quiz</Link>
          <Link to="/outfits">Browse Outfits</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} StyleSyntax</p>
          <p>Created by</p>
          <p className="footer-names">
            <a
              href="https://www.linkedin.com/in/randallgadduang/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Randall Gadduang <FaLinkedinIn className="linkedin-icon" />
            </a>
            <span className="separator">• </span>
            <a
              href="https://www.linkedin.com/in/daninorth/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Danielle North <FaLinkedinIn className="linkedin-icon" />
            </a>
            <span className="separator">• </span>
            <a
              href="https://www.linkedin.com/in/angela-ellsworth/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Angela Ellsworth <FaLinkedinIn className="linkedin-icon" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;