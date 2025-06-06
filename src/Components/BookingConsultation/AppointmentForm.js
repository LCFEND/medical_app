import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [date, setDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const validatePhoneNumber = function (phone) {
      const phoneNumberPattern = /^\d{10}$/;
      return phoneNumberPattern.test(phone);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      if (!validatePhoneNumber(phoneNumber)) {
        setErrorNumber("Phone Number Should Be 10 Digits.");
        return;
      }
  
      onSubmit({ name, phoneNumber, date, selectedSlot });
      setName("");
      setPhoneNumber("");
      setDate("");
      setSelectedSlot("");
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <p className="confirmation-note">
          Your booking request will be confirmed by our team. You will be
          notified once it is approved.
        </p>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            minLength="4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            minLength="10"
            maxLength="10"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errorNumber && <div className="err">{errorNumber}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Appointment:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Book Time Slot:</label>
          <select
            name="time"
            id="time"
            onChange={(e) => handleSlotSelection(e.target.value)}
            defaultValue="Select a time slot"
            required
          >
            <option disabled>Select a time slot</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };
  
  export default AppointmentForm;
