import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';
import AppointmentFormIC from './AppointmentFormIC/AppointmentFormIC';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  
  // State for managing appointment booking and notification
  const [appointmentData, setAppointmentData] = useState(null); // Stores appointment data
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false); // To show/hide notification

  // Fetch doctor details
  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            (doctor) => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };

  // Handle search functionality
  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  // Handle the appointment submission
  const handleAppointmentSubmit = (data) => {
    setAppointmentData(data); // Store the appointment data
    setAppointmentConfirmed(true); // Set the state to show the confirmation notification
  };

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    setAppointmentData(null); // Clear the appointment data
    setAppointmentConfirmed(false); // Hide the notification
    localStorage.removeItem('appointmentData'); // Optionally remove from localStorage
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            ''
          )}
        </div>

        {/* Show the appointment booking form if a doctor is selected */}
        {filteredDoctors.length === 1 && (
          <AppointmentFormIC
            doctorName={filteredDoctors[0].name}
            doctorSpeciality={filteredDoctors[0].speciality}
            onSubmit={handleAppointmentSubmit} // Pass the submit handler
          />
        )}

        {/* Show the confirmation notification if an appointment is booked */}
        {appointmentConfirmed && appointmentData && (
          <div className="notification">
            <p>Your consultation with Dr. {appointmentData.doctorName} is booked for {appointmentData.selectedDate} at {appointmentData.selectedSlot}!</p>
            <button onClick={handleCancelAppointment}>Cancel Appointment</button>
          </div>
        )}
      </div>
    </center>
  );
};

export default InstantConsultation;
