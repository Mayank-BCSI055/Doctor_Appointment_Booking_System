import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Revenue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/revenue").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="page">
      <h2>Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
