import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./SlotHeatmap.css";

export default function SlotHeatmap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/slot-heatmap").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="page">
      <h2>Slot Utilization</h2>

      {data.map((doc) => (
        <div key={doc.doctorId} className="doctor-heatmap">
          <h4>{doc.doctorName}</h4>
          <div className="slots">
            {doc.slots.map((s, i) => (
              <div
                key={i}
                className={`slot ${s.booked ? "booked" : "free"}`}
                title={s.time}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
