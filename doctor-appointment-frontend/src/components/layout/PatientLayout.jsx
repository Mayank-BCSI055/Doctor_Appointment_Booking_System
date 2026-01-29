import { Outlet } from "react-router-dom";

export default function PatientLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow p-5">
        <h2 className="text-lg font-bold mb-6">Patient</h2>
        <nav className="space-y-3">
          <a href="/patient" className="block hover:text-primary">Dashboard</a>
          <a href="/patient/doctors" className="block hover:text-primary">Doctors</a>
          <a href="/patient/appointments" className="block hover:text-primary">My Appointments</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
