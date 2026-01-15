import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <span className="logo-gradient">🔄</span>
              </div>
              <div className="logo-text">
                <h3>Grievance<span className="logo-highlight">AI</span></h3>
              </div>
            </Link>
            <p className="footer-description">
              AI-powered grievance resolution platform making complaint management 
              smarter, faster, and more efficient.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                💻
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                📺
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/submit">Submit Complaint</Link></li>
              <li><Link to="/track">Track Status</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>📍 123 Innovation Street, Tech City</li>
              <li>📧 support@grievanceai.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>🕒 24/7 Support Available</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GrievanceAI. All rights reserved.</p>
          <p>Made with ❤️ for better grievance resolution</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;