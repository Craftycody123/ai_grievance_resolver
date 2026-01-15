import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span className="logo-gradient">🔄</span>
            </div>
            <div className="logo-text">
              <h1>Grievance<span className="logo-highlight">AI</span></h1>
              <p>Intelligent Complaint Resolution</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/submit" className="nav-link">Submit</Link>
            <Link to="/track" className="nav-link">Track</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/about" className="nav-link">About</Link>
            
            {/* Auth Buttons */}
            <div className="auth-buttons">
              {isLoggedIn ? (
                <>
                  <button className="auth-btn profile-btn">
                    <span className="profile-icon">👤</span>
                    Profile
                  </button>
                  <button onClick={handleLogout} className="auth-btn logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleLogin} className="auth-btn login-btn">
                    Login
                  </button>
                  <button onClick={() => navigate('/register')} className="auth-btn register-btn">
                    Register
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/submit" className="nav-link" onClick={() => setIsMenuOpen(false)}>Submit</Link>
          <Link to="/track" className="nav-link" onClick={() => setIsMenuOpen(false)}>Track</Link>
          <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          
          <div className="mobile-auth">
            {isLoggedIn ? (
              <>
                <button className="auth-btn profile-btn">
                  <span className="profile-icon">👤</span>
                  Profile
                </button>
                <button onClick={handleLogout} className="auth-btn logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="auth-btn login-btn">
                  Login
                </button>
                <button onClick={() => navigate('/register')} className="auth-btn register-btn">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;