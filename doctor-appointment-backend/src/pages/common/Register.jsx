import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { register as apiRegister } from "../../api/auth.api.js";

import Dialog from "../../components/common/Dialog.jsx";
import "./Register.css";

import googleIcon from "../../assets/google.svg";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: ""
  });

  const showDialog = (title, message) => {
    setDialog({
      open: true,
      title,
      message
    });
  };

  /* ---------------- Google Signup ---------------- */

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        await apiRegister({googleCode: codeResponse.code});
        nav("/login");
      } catch (e) {
        showDialog("Google Signup Failed", e.response?.data?.message || "Google signup failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => showDialog("Google Sign In failed")
  });

  /* ---------------- Password Strength ---------------- */

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { label: "Weak", color: "#e74c3c", width: "25%" };
    if (score === 3) return { label: "Medium", color: "#f39c12", width: "50%" };
    if (score === 4) return { label: "Strong", color: "#3498db", width: "75%" };
    return { label: "Very Strong", color: "#2ecc71", width: "100%" };
  };

  const strength = getPasswordStrength(password);

  /* ---------------- Password Rules ---------------- */

  const passwordRules = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) }
  ];

  const allRulesPassed = passwordRules.every((r) => r.valid);

  /* ---------------- Password Match ---------------- */

  const passwordsMatch =
    confirmPassword && password === confirmPassword;

  /* ---------------- Submit ---------------- */

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showDialog("All fields are required");
      return;
    }

    if (!allRulesPassed) {
      showDialog("Password does not meet requirements");
      return;
    }

    if (!passwordsMatch) {
      showDialog("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await apiRegister({ name, email, password});
      setDialog({
        open: true,
        title: "Success",
        message: "Registered successfully. Please login."
      });
    } catch (e) {
      showDialog("Registration Failed", e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Patient Account</h2>
        <p className="auth-subtext">Sign up using Google or email</p>

        <button
          type="button"
          className="google-btn"
          onClick={googleLogin}
          disabled={loading}
        >
          <img src={googleIcon} alt="Google" />
          <span>{loading ? "Connecting..." : "Continue with Google"}</span>
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {password && (
            <>
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: strength.width,
                      backgroundColor: strength.color
                    }}
                  />
                </div>
                <span>Password strength: {strength.label}</span>
              </div>

              <ul className="password-rules">
                {passwordRules.map((rule, i) => (
                  <li
                    key={i}
                    className={rule.valid ? "passed" : "failed"}
                  >
                    {rule.valid ? "✓" : "✗"} {rule.label}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Confirm Password */}
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {confirmPassword && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{
                    width: "100%",
                    backgroundColor: passwordsMatch
                      ? "#2ecc71"
                      : "#e74c3c"
                  }}
                />
              </div>
              <span>
                {passwordsMatch
                  ? "Passwords match"
                  : "Passwords do not match"}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              !allRulesPassed ||
              !passwordsMatch
            }
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>Login</span>
        </p>
      </div>

      <Dialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        onClose={() => {
          setDialog({ open: false, title: "", message: "" });

          if (dialog.title === "Success") {
            nav("/login");
          }
        }}
      />

    </div>
  );
}
