import React, { useEffect, useState } from "react";
import './Notification.css';

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Load initial data from localStorage
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    const storedAppointmentData = JSON.parse(localStorage.getItem("appointmentData"));

    setDoctorData(storedDoctorData || null);
    setAppointmentData(storedAppointmentData || null);

    const handleStorageChange = () => {
      const newDoctorData = JSON.parse(localStorage.getItem("doctorData"));
      const newAppointmentData = JSON.parse(localStorage.getItem("appointmentData"));

      setDoctorData(newDoctorData || null);
      setAppointmentData(newAppointmentData || null); // Ensure null if data is removed
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {isLoggedIn && appointmentData && (  // Hide if appointmentData is null
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Speciality:</strong> {doctorData?.speciality}
            </p>
            <p className="appointment-card__message">
              <strong>Name:</strong> {appointmentData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
