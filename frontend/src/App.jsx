import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import "./styles/App.css";
import "./styles/components.css";
import "./styles/theme.css";

/* =========================
   BACKEND CONFIG
========================= */

export const API_BASE_URL = "http://127.0.0.1:8000";
export const ApiContext = createContext(null);

/* =========================
   APP COMPONENT
========================= */

function App() {
  const [backendStatus, setBackendStatus] = useState("checking");

  /* 🔍 Check backend health on app load */
  useEffect(() => {
    fetch(`${API_BASE_URL}/`)
      .then((res) => res.json())
      .then(() => setBackendStatus("online"))
      .catch(() => setBackendStatus("offline"));
  }, []);

  /* 🔗 Centralized API helper */
  const apiRequest = async (endpoint, options = {}) => {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {})
        },
        ...options
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "API request failed");
      }

      return await res.json();
    } catch (err) {
      console.error("API Error:", err.message);
      throw err;
    }
  };

  return (
    <ApiContext.Provider value={{ apiRequest, backendStatus }}>
      <Router>
        <div className="app">

          {/* 🔴 Backend offline warning */}
          {backendStatus === "offline" && (
            <div className="backend-warning">
              ⚠ Backend not reachable. Please start the server.
            </div>
          )}

          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit" element={<SubmitComplaint />} />
              <Route path="/track" element={<TrackComplaint />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ApiContext.Provider>
  );
}

export default App;
