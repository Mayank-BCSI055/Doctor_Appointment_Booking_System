import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth.js";
import Loader from "../components/common/Loader.jsx";

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log("USER ROLE:", user.role, "REQUIRED:", role);

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // ✅ THIS LINE FIXES EVERYTHING
}
