import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Add custom styles for the popup

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Manage user authentication and data
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  const showBookingNotification = () => {
    setNotificationMessage('Consultation successfully booked!');
    setIsNotificationVisible(true);
  
    // Set appointment data in localStorage
    const appointment = {
      name: username,
      doctor: doctorData?.name,
      time: new Date().toLocaleString(),
    };
  
    localStorage.setItem('appointmentData', JSON.stringify(appointment));
    console.log('Appointment saved to localStorage:', appointment); // Debugging log
  };

  const cancelConsultation = () => {
    setNotificationMessage('Consultation has been canceled.');
    setIsNotificationVisible(true);
    // Clear localStorage and reset states
    localStorage.removeItem('appointmentData');
    setAppointmentData(null);
  };

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  return (
    <div>
      <Navbar />
      {children}

      {/* Render notification popup if visible */}
      {isNotificationVisible && (
        <div className="notification-popup">
          <div className="notification-content">
            <p>{notificationMessage}</p>
            <button onClick={closeNotification}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Show appointment details if logged in */}
      {isLoggedIn && doctorData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <button onClick={showBookingNotification}>Book Consultation</button>
            <button onClick={cancelConsultation}>Cancel Consultation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
