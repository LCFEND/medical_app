import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  // Dummy data for reviews
  const reviews = [
    { id: 1, doctor: "Dr. John Doe", specialty: "Cardiology" },
    { id: 2, doctor: "Dr. Jane Smith", specialty: "Dermatology" }
  ];

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
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id}>
              <td>{index + 1}</td>
              <td>{review.doctor}</td>
              <td>{review.specialty}</td>
              <td><button className="feedback-btn">Click Here</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewForm;
