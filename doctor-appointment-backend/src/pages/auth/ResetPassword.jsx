import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../components/common/Dialog";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const nav = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dialog, setDialog] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setDialog({
        title: "Missing fields",
        message: "Please fill in all fields."
      });
      return;
    }

    if (password !== confirmPassword) {
      setDialog({
        title: "Password mismatch",
        message: "Passwords do not match."
      });
      return;
    }

    try {
      setLoading(true);

      // API placeholder
      // await apiResetPassword({ token, password });

      setDialog({
        title: "Password updated",
        message: "Your password has been reset successfully."
      });
    } catch {
      setDialog({
        title: "Reset failed",
        message: "The reset link may be invalid or expired."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${loading ? "submitting" : ""}`}>
        <h2>Reset Password</h2>
        <p className="auth-subtext">
          Create a new password for your account
        </p>

        <form onSubmit={submit}>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>

      <Dialog
        open={!!dialog}
        title={dialog?.title}
        message={dialog?.message}
        onClose={() => {
          const success = dialog?.title === "Password updated";
          setDialog(null);
          if (success) nav("/login");
        }}
      />
    </div>
  );
}
