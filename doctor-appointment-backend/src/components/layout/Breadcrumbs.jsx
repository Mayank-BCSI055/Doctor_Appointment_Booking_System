import { Link } from "react-router-dom";

const titleMap = {
  admin: "Admin",
  doctors: "Doctors",
  create: "Create Doctor",
  availability: "Availability",
  appointments: "Appointments",
};

export default function Breadcrumbs({ pathname }) {
  const parts = pathname.split("/").filter(Boolean);

  return (
    <div>
      {parts.map((p, i) => {
        const path = "/" + parts.slice(0, i + 1).join("/");
        return (
          <span key={i}>
            <Link to={path}>{titleMap[p] || p}</Link>
            {i < parts.length - 1 && " / "}
          </span>
        );
      })}
    </div>
  );
}
