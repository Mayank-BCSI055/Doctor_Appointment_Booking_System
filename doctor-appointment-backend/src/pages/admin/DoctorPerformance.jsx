import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function DoctorPerformance() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/doctor-performance").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="page">
      <h2>Doctor Performance</h2>

      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Appointments</th>
            <th>Cancellation %</th>
            <th>Utilization %</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((d) => (
            <tr key={d.doctorId}>
              <td>{d.name}</td>
              <td>{d.completed}</td>
              <td>{d.cancellationRate}%</td>
              <td>{d.utilization}%</td>
              <td>
                <strong>{d.score}/100</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
