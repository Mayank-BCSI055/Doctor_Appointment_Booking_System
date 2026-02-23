import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoutes.jsx";
import PublicRoute from "../auth/PublicRoutes.jsx";

/* Common pages */
import Home from "../pages/common/Home.jsx";
import Contact from "../pages/common/Contact.jsx";
import AboutUs from "../pages/common/AboutUs.jsx";
import Login from "../pages/common/Login.jsx";
import Register from "../pages/common/Register.jsx";
import Unauthorized from "../components/common/Unauthorized.jsx";

/* Admin pages */
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Availability from "../pages/admin/Availability";
import Appointments from "../pages/admin/Appointments";

/* Patient pages */
import PatientLayout from "../components/layout/PatientLayout";
import PatientDashboard from "../pages/patient/Dashboard";
import MyAppointments from "../pages/patient/MyAppointments";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Auth */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Admin */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/availability" element={<Availability />} />
          <Route path="/admin/appointments" element={<Appointments />} />
        </Route>
      </Route>

      {/* Patient */}
      <Route element={<ProtectedRoute role="PATIENT" />}>
        <Route element={<PatientLayout />}>
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/appointments" element={<MyAppointments />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      
    </Routes>
  );
}
