import { useState } from "react";
import "./doctors.css";

export default function Doctors() {
  const [search, setSearch] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      specialization: "Cardiologist",
      experience: "12 Years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      experience: "8 Years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialization: "Orthopedic",
      experience: "15 Years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    },
    {
      id: 4,
      name: "Dr. Sneha Kapoor",
      specialization: "Pediatrician",
      experience: "10 Years",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    },
  ];

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-container">
        <h1 className="doctors-title">Our Specialists</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="doctor-image"
              />

              <div className="doctor-info">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>
                <p className="doctor-experience">
                  Experience: {doctor.experience}
                </p>

                <button className="book-btn">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}import { useState } from "react";
import "./doctors.css";

export default function Doctors() {
  const [search, setSearch] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      specialization: "Cardiologist",
      experience: "12 Years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      experience: "8 Years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    },
    {
      id: 3,
      name: "Dr. Amit Verma",
      specialization: "Orthopedic",
      experience: "15 Years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    },
    {
      id: 4,
      name: "Dr. Sneha Kapoor",
      specialization: "Pediatrician",
      experience: "10 Years",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    },
  ];

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-container">
        <h1 className="doctors-title">Our Specialists</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="doctor-image"
              />

              <div className="doctor-info">
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>
                <p className="doctor-experience">
                  Experience: {doctor.experience}
                </p>

                <button className="book-btn">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
