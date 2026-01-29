import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./Doctors.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDoctors();
  }, [page, search]);

  const fetchDoctors = async () => {
    const res = await axiosInstance.get("/admin/doctors", {
      params: { page, search },
    });
    setDoctors(res.data.items);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="page">
      <h2>Doctor Management</h2>
      
      <input
        className="search"
        placeholder="Search by name or specialization"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
              <td>{d.experience} yrs</td>
              <td>{d.is_active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
