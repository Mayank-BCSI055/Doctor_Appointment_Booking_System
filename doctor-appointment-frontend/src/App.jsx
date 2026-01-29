import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./auth/AuthContext.jsx";
import Navbar from "./components/common/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster position="top-right" />

      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}
