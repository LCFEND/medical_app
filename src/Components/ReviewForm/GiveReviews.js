import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

// Function component for giving reviews
function GiveReviews() {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // State to hold reviews
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage when the component mounts
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Function to handle feedback button click
  const handleFeedbackClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (formData.name && formData.review && formData.rating > 0) {
      // Update the review for the selected doctor
      const updatedReviews = reviews.map((doctor) =>
        doctor.id === selectedDoctor.id
          ? { ...doctor, reviewGiven: formData.review }
          : doctor
      );

      // Save the updated reviews to localStorage
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      // Update the state
      setReviews(updatedReviews);

      // Display the submitted message
      setSubmittedMessage(`Review for ${selectedDoctor.name}: ${formData.review} (Rating: ${formData.rating})`);

      // Reset form and hide it
      setShowForm(false);
      setShowWarning(false);
      setFormData({ name: '', review: '', rating: 0 });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button className="feedback-btn" onClick={() => handleFeedbackClick(doctor)}>
                  Click Here
                </button>
              </td>
              <td className="review-box">{doctor.reviewGiven || "No review yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Form */}
      {showForm && (
        <div className="feedback-form">
          <h2>Give Your Review</h2>
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="rating">Rating (1-5):</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      )}

      {/* Submitted Message Display */}
      {submittedMessage && (
        <div className="submitted-message">
          <h3>Submitted Review:</h3>
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
