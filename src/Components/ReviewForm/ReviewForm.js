import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
    const [feedback, setFeedback] = useState({});

    const reviews = [
        { id: 1, doctorName: "Dr. John Doe", specialty: "Cardiology" },
        { id: 2, doctorName: "Dr. Jane Smith", specialty: "Dermatology" },
    ];

    const handleFeedbackClick = (doctorId) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [doctorId]: !prevFeedback[doctorId],
        }));
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
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td>{index + 1}</td>
                            <td>{review.doctorName}</td>
                            <td>{review.specialty}</td>
                           
                            <td>
                                <button
                                    className="feedback-btn"
                                    onClick={() => handleFeedbackClick(review.id)}
                                >
                                    {feedback[review.id] ? "Hide Feedback" : "Click Here"}
                                </button>
                                {feedback[review.id] && (
                                    <div className="feedback-form">
                                        <textarea
                                            placeholder="Enter your feedback..."
                                            rows="5"
                                        ></textarea>
                                        <button className="submit-btn">Submit</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewForm;
