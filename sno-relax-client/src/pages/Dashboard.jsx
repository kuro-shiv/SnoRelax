import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import {
  User,
  Settings,
  Activity,
  HelpCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = {
      userId: localStorage.getItem("sno_userId") || "N/A",
      firstName: localStorage.getItem("sno_firstName") || "Guest",
      lastName: localStorage.getItem("sno_lastName") || "",
      email: localStorage.getItem("sno_email") || "Not Provided",
      phone: localStorage.getItem("sno_phone") || "Not Provided",
    };
    setUserData(userInfo);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [menuOpen]);

  return (
    <div className="dashboard dark-theme">
      {/* Navbar */}
      <header className="navbar">
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="app-title">🌙 SnoRelax</h1>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-profile">
          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userData.userId}`}
            alt="Profile"
            className="avatar"
          />
          <h3>
            {userData.firstName} {userData.lastName}
          </h3>
          <p className="uuid">ID: {userData.userId}</p>
        </div>

        <nav className="menu-options">
          <button onClick={() => navigate("/profile")}>
            <User size={20} /> Profile
          </button>
          <button>
            <Settings size={20} /> Settings
          </button>
          <button>
            <HelpCircle size={20} /> Help
          </button>
          {/* ✅ Open static health-vault.html */}
          <button onClick={() => window.location.href = "/health-vault.html"}>
            <BookOpen size={20} /> Health Vault
          </button>
          <button>
            <Users size={20} /> Join Community
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="overlay active" onClick={() => setMenuOpen(false)} />
      )}

      {/* Dashboard Container */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Welcome back, {userData.firstName} ✨</h2>
          <p>Your personal SnoRelax space</p>
        </header>

        <div className="dashboard-grid">
          <div className="widget">
            <h2>😃 Mood Tracker</h2>
            <button
              onClick={() => navigate("/mood-tracker")}
              className="btn"
            >
              Open Mood Tracker
            </button>
          </div>

          <div className="widget">
            <h2>🤖 AI Chatbot</h2>
            <button onClick={() => navigate("/chatbot")} className="btn">
              Open Chatbot
            </button>
          </div>

          <div className="widget">
            <h2>🧘 Relaxation Exercises</h2>
            <p>Try guided breathing or meditation exercises.</p>
            <button className="btn">Start Exercise</button>
          </div>

          <div className="widget">
            <h2>📝 Therapist Notes</h2>
            <button
              onClick={() => navigate("/therapist-notes")}
              className="btn"
            >
              Open Notes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} SnoRelax. All rights reserved.</p>
      </footer>
    </div>
  );
}
