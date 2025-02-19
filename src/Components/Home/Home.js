import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Import images
import consultationImg from "../../assets/consultation.png";  
import appointmentImg from "../../assets/appointment.png";
import checkupImg from "../../assets/checkup.png";
import healthBlogImg from "../../assets/healthblog.png";

const Home = () => {
  return (
    <section className="hero-section">
      <div className="buttons-container">        
        <div className="button-wrapper">
          <img src={consultationImg} alt="Instant Consultation" className="button-image" />
          <Link to="/instant-consultation">
            <button type="button" className="btn btn-primary btn-lg button">
              Instant Consultation
            </button>
          </Link>
        </div>

        <div className="button-wrapper">
          <img src={appointmentImg} alt="Book an Appointment" className="button-image" />
          <Link to="/book-appointment"> {/* Change the path here */}
            <button type="button" className="btn btn-primary btn-lg button">
              Book an Appointment
            </button>
          </Link>
        </div>

        <div className="button-wrapper">
          <img src={checkupImg} alt="Self Checkup" className="button-image" />
          <Link to="/self-checkup">
            <button type="button" className="btn btn-primary btn-lg button">
              Self Checkup
            </button>
          </Link>
        </div>
        <div className="button-wrapper">
          <img src={healthBlogImg} alt="Health Tips and Guidance" className="button-image" />
          <Link to="/healthblog">
            <button type="button" className="btn btn-primary btn-lg button">
              Health Tips and Guidance
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Home;
