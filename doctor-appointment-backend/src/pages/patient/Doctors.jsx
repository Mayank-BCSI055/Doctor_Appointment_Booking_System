import { useEffect, useState } from "react";
import { listDoctors } from "../../api/patient.api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    listDoctors().then((res) => setDoctors(res.data));
  }, []);

  return (
    <div>
      {doctors.map((doc) => (
        <div key={doc.id}>
          <h3>{doc.name}</h3>
          <p>{doc.specialization}</p>
        </div>
      ))}
    </div>
  );
}
