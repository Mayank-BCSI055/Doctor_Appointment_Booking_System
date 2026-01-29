import { Navigate } from "react-router-dom";

import { useAuth } from "./useAuth.js";

import Loader from "../components/common/Loader.jsx";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    const redirectPath =
      user.role === "ADMIN" ? "/admin" : "/patient";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
