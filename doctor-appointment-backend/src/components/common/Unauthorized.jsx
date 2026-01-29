import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.js";
import "./Unauthorized.css";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [seconds, setSeconds] = useState(5);

  // Decide redirect target based on role
  const redirectPath =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "PATIENT"
      ? "/patient"
      : "/";

  const roleMessage =
    user?.role === "PATIENT"
      ? "You are logged in as a patient and cannot access admin pages."
      : user?.role === "ADMIN"
      ? "You are logged in as an administrator and cannot access patient-only pages."
      : "You do not have permission to access this page.";

  // Countdown + redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, redirectPath]);

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        {/* Icon */}
        <div className="unauthorized-icon">
          🛡️
        </div>

        <h1 className="unauthorized-title">403 – Unauthorized</h1>

        <p className="unauthorized-message">
          {roleMessage}
        </p>

        <div className="countdown">
          Redirecting in{" "}
          <span className="countdown-number">{seconds}</span>{" "}
          seconds…
        </div>

        <button
          className="unauthorized-btn"
          onClick={() => navigate(redirectPath)}
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
}
