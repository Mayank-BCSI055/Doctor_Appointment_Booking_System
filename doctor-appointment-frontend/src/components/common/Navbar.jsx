import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../auth/useAuth.js";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  /* =========================
     DARK MODE
     ========================= */
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* =========================
     DOCTOR APPOINTMENT → TOP
     ========================= */
  const handleTopClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("top")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document
        .getElementById("top")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* =========================
     CONTACT
     ========================= */
  const handleContactClick = () => {
    if (location.pathname !== "/contact") {
      navigate("/contact");
    }
  }
  
  return (
    <nav className={`navbar ${isHome ? "navbar-fixed" : ""}`}>
      {/* LEFT */}
      <div className="navbar-brand">
        <button className="appointment-btn" onClick={handleTopClick}>
          Doctor Appointment
        </button>
      </div>

      {/* RIGHT */}
      <div className="navbar-links">
        {/* 🔒 AUTH PAGES → MINIMAL NAVBAR */}
        {isAuthPage ? (
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(v => !v)}
            title="Toggle theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        ) : (
          <>
            {/* FULL NAVBAR */}
            <button onClick={handleContactClick} className="nav-link-btn">
              Contact
            </button>

            <NavLink to="/aboutus">About Us</NavLink>
            <NavLink to="/doctors">Doctors</NavLink>

            {!user ? (
              <>
                <NavLink to="/register">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            ) : (
              <button
                className="nav-link-btn logout-btn"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}

            <button
              className="theme-toggle"
              onClick={() => setDarkMode(v => !v)}
              title="Toggle theme"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
