import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/useAuth.js";
import Loader from "../../components/common/Loader.jsx";
import axiosInstance from "../../api/axiosInstance.js";

import "./Dashboard.css";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH APPOINTMENTS
     ========================= */
  useEffect(() => {
    let mounted = true;

    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/appointments/my");
        if (mounted) {
          setAppointments(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAppointments();
    return () => (mounted = false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="patient-dashboard">
      
      {/* HEADER */}
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || "Patient"}</h1>
        <p>Manage your appointments and health schedule</p>
      </header>

      {/* QUICK ACTIONS */}
      <section className="dashboard-actions">
        <Link to="/doctors" className="dashboard-card">
          <h3>Book Appointment</h3>
          <p>Find doctors and available slots</p>
        </Link>

        <Link to="/patient/appointments" className="dashboard-card">
          <h3>My Appointments</h3>
          <p>View upcoming and past visits</p>
        </Link>

        <Link to="/patient/profile" className="dashboard-card">
          <h3>Profile</h3>
          <p>Update personal details</p>
        </Link>
      </section>

      {/* UPCOMING APPOINTMENTS */}
      <section className="dashboard-appointments">
        <h2>Upcoming Appointments</h2>

        {appointments.length === 0 ? (
          <div className="empty-state">
            No appointments scheduled yet.
          </div>
        ) : (
          <div className="appointment-list">
            {appointments.map((appt) => (
              <div key={appt.id} className="appointment-card">
                <div>
                  <h4>Dr. {appt.doctor_name}</h4>
                  <span>
                    {appt.date} · {appt.start_time} – {appt.end_time}
                  </span>
                </div>

                <span className={`status ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
