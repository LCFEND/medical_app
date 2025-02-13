import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 0 });
  const [reviews, setReviews] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Load reviews from localStorage when component mounts
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      // If no reviews in localStorage, set default reviews
      setReviews([
        { id: 1, name: "Dr. John Doe", specialty: "Cardiology", reviewGiven: "", reviewSubmitted: false },
        { id: 2, name: "Dr. Jane Smith", specialty: "Dermatology", reviewGiven: "", reviewSubmitted: false },
      ]);
    }
  }, []);

  const handleFeedbackClick = (doctor) => {
    if (doctor.reviewGiven) {
      return; // If feedback is already given, do nothing
    }
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the review for the selected doctor
    const updatedReviews = reviews.map((doctor) =>
      doctor.id === selectedDoctor.id
        ? { ...doctor, reviewGiven: formData.review, reviewSubmitted: true, rating: formData.rating }
        : doctor
    );

    // Save the updated reviews in localStorage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    // Update the state with the new reviews
    setReviews(updatedReviews);

    // Display a confirmation message
    alert(`Review submitted for ${selectedDoctor.name}!`);

    // Close the form and reset input fields
    setShowForm(false);
    setFormData({ name: "", review: "", rating: 0 });
    setFeedbackSubmitted(true);
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
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button
                  className="feedback-btn"
                  onClick={() => handleFeedbackClick(doctor)}
                  disabled={doctor.reviewSubmitted}
                >
                  {doctor.reviewSubmitted ? "Feedback Submitted" : "Click Here"}
                </button>
              </td>
              <td className="review-box">{doctor.reviewGiven || "No review yet"}</td>
              <td>{doctor.rating || "No rating yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="feedback-form">
          <h3>Give Your Review</h3>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label>Review:</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
            ></textarea>

            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? "filled" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      )}

      {feedbackSubmitted && (
        <div className="feedback-message" style={{ border: "2px solid red", padding: "10px", marginTop: "20px" }}>
          <h3>Thank you for your feedback!</h3>
          <p>Your review has been successfully submitted.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
