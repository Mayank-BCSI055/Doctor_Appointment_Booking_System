import React, { createContext, useState, useEffect } from "react";

import Loader from "../components/common/Loader.jsx";

console.log("🔥 AUTH CONTEXT FILE LOADED");

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Initialize Auth ---------------- */

useEffect(() => {
  try {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      setUser(JSON.parse(rawUser));
    }
  } catch (e) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } finally {
    setLoading(false);
  }
}, []);

  /* ---------------- Actions ---------------- */

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /* ---------------- Loader ---------------- */

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
