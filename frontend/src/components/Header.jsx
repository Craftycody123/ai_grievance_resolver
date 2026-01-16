import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../styles/components.css";

const Header = () => {
  const { user, profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LEFT: LOGO */}
        <div className="header-left">
          <Link to="/" className="logo">
            AI Grievance Resolver
          </Link>
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="header-center">
          <Link to="/">Home</Link>
          <Link to="/submit">Submit</Link>
          <Link to="/track">Track</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* RIGHT: AUTH AREA */}
        <div className="header-right">
          {!user ? (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            
            </>
          ) : (
            <>
              <span className="user-info">
                {profile?.name || profile?.email}
              </span>

              {profile?.role === "admin" && (
                <Link to="/admin" className="btn-link">
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
