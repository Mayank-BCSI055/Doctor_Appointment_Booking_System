import "./DoctorCard.css";

export default function DoctorCard({
  doctor,
  favorite,
  onFavorite,
  onClick
}) {
  return (
    <div className="doctor-card" onClick={onClick}>
      {/* Favorite */}
      <button
        className="doctor-favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        aria-label="Toggle favorite doctor"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      {/* Avatar */}
      <div className="doctor-avatar">
        {doctor.name[0]}
      </div>

      <h3 className="doctor-name">{doctor.name}</h3>
      <p className="doctor-spec">{doctor.spec}</p>

      <p className="doctor-quote">
        “{doctor.quote}”
      </p>

      <div className="doctor-rating">
        {"★".repeat(doctor.rating)}
        {"☆".repeat(5 - doctor.rating)}
      </div>
    </div>
  );
}

