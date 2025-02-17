import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="hero-section">
      <div style={{ margin: "auto", maxWidth: "1200px" }}>
      <Link to="/instant-consultation">
  <button type="button" className="btn btn-primary btn-lg button">
    Instant Consultation
  </button>
</Link>
<Link to="/consultation">
  <button type="button" className="btn btn-primary btn-lg button">
    Book an Appointment
  </button>
</Link>
        <Link to="/self-checkup">  {/* Fixed the case to match route */}
          <button type="button" className="btn btn-primary btn-lg button">
            Self Checkup
          </button>
        </Link>
        <Link to="/healthblog">  {/* Fixed the case to match route */}
          <button type="button" className="btn btn-primary btn-lg button">
            Health Tips and Guidance
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
