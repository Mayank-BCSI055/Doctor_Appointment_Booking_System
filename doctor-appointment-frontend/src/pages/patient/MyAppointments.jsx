import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { myAppointments, cancelAppointment } from "../../api/patient.api";

import "./MyAppointments.css"; // optional, safe even if empty

export default function MyAppointments() {
  console.log("MyAppointments rendered");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Appointments ---------------- */

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await myAppointments();
        setAppointments(data);
      } catch (err) {
        toast.error(err, { duration: 3000 });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  /* ---------------- Cancel Appointment ---------------- */

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);

      toast.success("Appointment cancelled", {
        duration: 3000
      });

      // remove cancelled appointment from UI
      setAppointments((prev) =>
        prev.filter((a) => a.id !== id)
      );
    } catch (err) {
      toast.error(err, {
        duration: 3000
      });
    }
  };

  /* ---------------- UI States ---------------- */

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p>You have no appointments yet.</p>;
  }

  /* ---------------- Render ---------------- */

    return (
    <div className="my-appointments">
        <h2>My Appointments</h2>

        <ul className="appointment-list">
        {appointments.map((a) => (
            <li key={a.id} className="appointment-card">
            <div>
                <strong>Doctor ID:</strong> {a.doctor_id}
            </div>
            <div className="appointment-status">
                Status: {a.status}
            </div>
            <div>
                <strong>Booked At:</strong>{" "}
                {new Date(a.booked_at).toLocaleString()}
            </div>

            {a.status === "booked" && (
                <button
                className="cancel-btn"
                onClick={() => handleCancel(a.id)}
                >
                Cancel
                </button>
            )}
            </li>
        ))}
        </ul>
    </div>
    );
}
