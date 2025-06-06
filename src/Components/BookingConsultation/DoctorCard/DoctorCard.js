import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { v4 as uuidv4 } from "uuid";
import AppointmentForm from '../AppointmentForm';
import "./DoctorCard.css";

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null); // Check existing appointment

  useEffect(() => {
    // Load appointment details from localStorage on mount
    const storedAppointment = JSON.parse(localStorage.getItem("appointmentData"));
    if (storedAppointment && storedAppointment.doctorName === name) {
      setAppointmentData(storedAppointment);
    }
  }, [name]);

  const handleBooking = () => {
    setShowModal(true);
  };

 const handleCancel = () => {
  localStorage.removeItem("appointmentData");
  localStorage.removeItem("doctorData");
  window.dispatchEvent(new Event("storage")); // Notify Notification component

  setAppointmentData(null); // Clear appointment state

  // Reopen the booking form
  setShowModal(true);
};

  const handleFormSubmit = (formData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name, // Ensure we store the doctor name
      ...formData,
    };

    setAppointmentData(newAppointment);
    setShowModal(true);

    const doctorData = { name, speciality, experience, ratings };
    localStorage.setItem("doctorData", JSON.stringify(doctorData));
    localStorage.setItem("appointmentData", JSON.stringify(newAppointment));

    window.dispatchEvent(new Event("storage")); // Notify other components
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        {/* Show Cancel button if an appointment exists, otherwise show Book button */}
        {appointmentData ? (
          <button className="cancel-appointment-btn" onClick={handleCancel}>
            Cancel Appointment
          </button>
        ) : (
          <button className="book-appointment-btn" onClick={handleBooking}>
            Book Appointment
          </button>
        )}

        <Popup
          style={{ backgroundColor: "#FFFFFF" }}
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="doctorbg" style={{ height: "100vh", overflow: "scroll" }}>
            <div>
              <div className="doctor-card-profile-image-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  fill="currentColor"
                  className="bi bi-person-fill img"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">{speciality}</div>
                <div className="doctor-card-detail-experience">
                  {experience} years experience
                </div>
                <div className="doctor-card-detail-consultationfees">
                  Ratings: {ratings}
                </div>
              </div>
            </div>

            {/* Show appointment details or booking form */}
            {appointmentData ? (
              <>
                <h3 style={{ textAlign: "center" }}>Thank you for your booking! </h3>
                <div className="bookedInfo">
                  <p>Name: {appointmentData.name}</p>
                  <p>Phone Number: {appointmentData.phoneNumber}</p>
                  <p>Book of Appointment: {appointmentData.date}</p>
                  <p>Time Slot: {appointmentData.selectedSlot}</p>
                  <h3 style={{ textAlign: "center" }}>We will confirm with you shortly!</h3>
                </div>
              </>
            ) : (
              <AppointmentForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
