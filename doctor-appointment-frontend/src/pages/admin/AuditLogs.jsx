import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/audit-logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div className="page">
      <h2>Audit Logs</h2>

      <table>
        <thead>
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.actor}</td>
              <td>{l.action}</td>
              <td>{l.entity}</td>
              <td>{new Date(l.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
