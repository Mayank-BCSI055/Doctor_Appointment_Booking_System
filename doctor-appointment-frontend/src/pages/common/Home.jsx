import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import DoctorCard from "../../components/common/DoctorCard.jsx";
import "./Home.css";

export default function Home() {
  const [paused, setPaused] = useState(false);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  const doctors = useMemo(() => ([
    { name: "Dr. Ananya Sharma", spec: "Cardiologist", rating: 4, quote: "A healthy heart is the rhythm of life." },
    { name: "Dr. Rahul Mehta", spec: "Orthopedic Surgeon", rating: 5, quote: "Movement is medicine." },
    { name: "Dr. Neha Verma", spec: "Dermatologist", rating: 4, quote: "Healthy skin reflects wellness." },
    { name: "Dr. Arjun Patel", spec: "Neurologist", rating: 5, quote: "The brain defines who we are." },
    { name: "Dr. Pooja Nair", spec: "Gynecologist", rating: 4, quote: "Women’s health is family health." },
    { name: "Dr. Vikram Singh", spec: "Pediatrician", rating: 5, quote: "Caring for little lives with big hearts." },
    { name: "Dr. Sanya Kapoor", spec: "ENT Specialist", rating: 4, quote: "Clear hearing, clear life." },
    { name: "Dr. Rohan Desai", spec: "General Physician", rating: 5, quote: "Your health, our mission." }
  ]), []);

  const orderedDoctors = useMemo(() => {
    const fav = doctors.filter(d => favorites.includes(d.name));
    const rest = doctors.filter(d => !favorites.includes(d.name));
    return [...fav, ...rest];
  }, [favorites, doctors]);

  const scrollDoctors = [...orderedDoctors, ...orderedDoctors];
  const trackRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    const speed = 0.05;

    const animate = () => {
      x -= speed;
      track.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) >= track.scrollWidth / 2) x = 0;
      requestAnimationFrame(animate);
    };
    animate();
  }, [paused, orderedDoctors]);

  const toggleFavorite = (name) => {
    const updated = favorites.includes(name)
      ? favorites.filter(f => f !== name)
      : [...favorites, name];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home-page" id="top">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>
            A digital healthcare platform to book appointments, consult verified
            doctors, and manage medical visits effortlessly.
          </p>
          <div className="home-hero-actions">
            <Link to="/patient/doctors" className="hero-btn-primary">
              Book Appointment
            </Link>
            <Link to="/login" className="hero-btn-secondary">
              Availability
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="home-section">
        <h2 className="section-title">Why Choose Our Medical Platform?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Verified Doctors</h3>
            <p>All doctors are certified, experienced, and thoroughly verified.</p>
          </div>
          <div className="info-card">
            <h3>Instant Appointments</h3>
            <p>Real-time slot booking with instant confirmation.</p>
          </div>
          <div className="info-card">
            <h3>Secure Records</h3>
            <p>Your medical data is encrypted and privacy-protected.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <h2 className="section-title">Our Impact at a Glance</h2>
        <div className="stats-grid">
          <div><strong>25,000+</strong><span>Patients Served</span></div>
          <div><strong>500+</strong><span>Doctors Onboarded</span></div>
          <div><strong>120+</strong><span>Clinics & Hospitals</span></div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="home-section">
        <h2 className="section-title">Medical Specialties</h2>
        <div className="specialties-grid">
          {["Cardiology","Dermatology","Orthopedics","Pediatrics","Neurology","Gynecology","ENT","General Medicine"]
            .map(s => <div key={s} className="specialty-card">{s}</div>)}
        </div>
      </section>

      {/* DOCTORS */}
      <section
        className="home-doctors"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="section-title">Meet Our Specialists</h2>
        <div className="doctor-carousel">
          <div ref={trackRef} className="doctor-track">
            {scrollDoctors.map((doc, i) => (
              <DoctorCard
                key={i}
                doctor={doc}
                favorite={favorites.includes(doc.name)}
                onFavorite={() => toggleFavorite(doc.name)}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section">
        <h2 className="section-title">How It Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Register Account</h3>
            <p>Create your patient account in a few simple steps.</p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Choose Doctor</h3>
            <p>Browse doctors by specialization and availability.</p>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Book Slot</h3>
            <p>Select a convenient time slot and confirm your visit.</p>
          </div>

          <div className="step-card">
            <span className="step-number">4</span>
            <h3>Visit Doctor</h3>
            <p>Attend your appointment with complete confidence.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-section testimonials">
        <h2 className="section-title">What Patients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">“Quick booking and trusted doctors.” — Amit</div>
          <div className="testimonial">“Saved me hours of waiting.” — Priya</div>
          <div className="testimonial">“Very professional platform.” — Rohan</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <section  id="contact">
          <p>© {new Date().getFullYear()} Doctor Appointment System</p>
          <p>Contact: support@doctorappointment.com | +91 98765 43210</p>
        </section>
      </footer>

    </div>
  );
}
