import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { login as apiLogin } from "../../api/auth.api.js";
import { useAuth } from "../../auth/useAuth.js";

import Dialog from "../../components/common/Dialog.jsx";
import "./Login.css";

import googleIcon from "../../assets/google.svg";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: ""
  });

  const showError = (title, message) => {
    setDialog({ open: true, title, message });
  };

  /* ---------------- Google Login ---------------- */

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        const data = await apiLogin({ googleCode: codeResponse.code });

        login(data.user, data.token);
        toast.success("Logged in with Google" , {duration: 4000});
        nav(data.user.role === "ADMIN" ? "/admin" : "/patient");
      
      } catch (e) {
        showError(e.response?.data?.message || "Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setDialog({
        open: true,
        title: "Google Login Failed",
        message: "Unable to sign in with Google. Please try again."
      });
    }
  });

  /* ---------------- Submit ---------------- */

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Login Failed", "Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const data = await apiLogin({ email, password, rememberMe });

      // save auth state
      login(data.user, data.token);

      toast.success("Login successful" , {duration: 4000});

      // close any old error dialog
      setDialog({ open: false, title: "", message: "" });

      // 🔥 ROLE-BASED REDIRECT
      if (data.user.role === "ADMIN") {
        nav("/admin");
      } else {
        nav("/patient");
      }

    } catch (e) {
      setDialog({
        open: true,
        title: "Login Failed",
        message: e.response?.data?.message || "Invalid email or password"
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="auth-page">
      <div className={`auth-card ${loading ? "submitting" : ""}`}>
        <h2>Welcome Back</h2>
        <p className="auth-subtext">Login using Google or email</p>

        {/* Google Login */}
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

        {/* Login Form */}
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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

          {/* Remember Me & Forgot Password */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <span
              className="forgot-password"
              onClick={() => nav("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" disabled={loading || !email || !password}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => nav("/register")}>Register</span>
        </p>
      </div>

      <Dialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        onClose={() =>
          setDialog({ open: false, title: "", message: "" })
        }
      />

    </div>
  );
}
