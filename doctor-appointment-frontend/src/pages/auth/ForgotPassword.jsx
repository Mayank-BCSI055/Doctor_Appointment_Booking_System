import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/common/Dialog";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      setDialog({
        title: "Missing email",
        message: "Please enter your registered email address."
      });
      return;
    }

    try {
      setLoading(true);

      // API call placeholder
      // await apiForgotPassword({ email });

      setDialog({
        title: "Check your inbox",
        message:
          "We’ve sent a password reset link to your email."
      });
    } catch {
      setDialog({
        title: "Something went wrong",
        message: "Unable to send reset email. Try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-subtext">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="auth-footer">
          Remembered it?{" "}
          <span onClick={() => nav("/login")}>Back to login</span>
        </p>
      </div>

      <Dialog
        open={!!dialog}
        title={dialog?.title}
        message={dialog?.message}
        onClose={() => {
          setDialog(null);
          if (dialog?.title === "Check your inbox") {
            nav("/login");
          }
        }}
      />
    </div>
  );
}
