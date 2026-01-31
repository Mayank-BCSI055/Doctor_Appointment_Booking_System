import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      {/* HERO */}
      <section className="about-hero">
        <h1>About Our Medical Center</h1>
        <p>
          Providing trusted healthcare solutions through technology,
          compassion, and clinical excellence.
        </p>
      </section>

      {/* CONTENT */}
      <section className="about-content">
        <div className="about-card">
          <h2>Who We Are</h2>
          <p>
            Our Doctor Appointment System was created to simplify access to
            healthcare. We connect patients with qualified doctors using a
            secure, reliable, and easy to use digital platform.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To make healthcare accessible, organized, and stress free by
            enabling fast appointment scheduling, real time availability, and
            seamless communication between doctors and patients.
          </p>
        </div>

        <div className="about-card">
          <h2>Why Choose Us</h2>
          <ul>
            <li>✔ Certified and verified doctors</li>
            <li>✔ Secure patient data protection</li>
            <li>✔ Simple appointment booking</li>
            <li>✔ Real time schedule management</li>
            <li>✔ Modern, user friendly interface</li>
          </ul>
        </div>
      </section>

      {/* FOOTER MESSAGE */}
      <section className="about-footer">
        <h3>Your health. Your time. Your care.</h3>
        <p>
          We believe quality healthcare should be accessible with just a few
          clicks.
        </p>
      </section>
    </div>
  );
}
