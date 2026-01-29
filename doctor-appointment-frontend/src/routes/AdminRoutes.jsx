import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Availability from "../pages/admin/Availability";
import Appointments from "../pages/admin/Appointments";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/availability" element={<Availability />} />
        <Route path="/admin/appointments" element={<Appointments />} />
      </Route>
    </Routes>
  );
}
