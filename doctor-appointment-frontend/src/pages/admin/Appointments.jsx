import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const res = await axiosInstance.get("/admin/appointments");
    setAppointments(res.data);
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    await axiosInstance.patch(`/admin/appointments/${id}/cancel`);
    loadAppointments();
  };

  return (
    <div className="page">
      <h2>All Appointments</h2>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.patient}</td>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
              <td>{a.status}</td>
              <td>
                {a.status === "BOOKED" && (
                  <button onClick={() => cancelAppointment(a.id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
