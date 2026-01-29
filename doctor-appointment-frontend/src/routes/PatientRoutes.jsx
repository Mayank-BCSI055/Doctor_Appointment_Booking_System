import { Routes, Route } from "react-router-dom";
import PatientLayout from "../components/layout/PatientLayout";
import PatientDashboard from "../pages/patient/Dashboard";
import MyAppointments from "../pages/patient/MyAppointments";

export default function PatientRoutes() {
  return (
    <Routes>
      <Route element={<PatientLayout />}>
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<MyAppointments />} />
        <Route path="/patient/doctors" element={<DoctorsList />} />
      </Route>
    </Routes>
  );
}
