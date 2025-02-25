import React, { useState } from "react";
import "./Healthblog.css";

const Healthblog = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const topics = [
    {
      title: "Nutritious Eating: Fuel Your Body the Right Way",
      summary:
        "Eating a well-balanced diet boosts energy, strengthens immunity, and enhances overall well-being.",
      details:
        "Incorporating whole foods, such as fruits, vegetables, lean proteins, and whole grains, provides essential nutrients. Reducing processed foods and added sugars can lower the risk of chronic diseases and improve digestion.",
    },
    {
      title: "The Role of Exercise: Why Staying Active is Essential",
      summary:
        "Regular physical activity helps maintain heart health, mental clarity, and overall fitness.",
      details:
        "Exercise releases endorphins, reducing stress and boosting mood. Whether it's cardio, strength training, or yoga, staying active strengthens muscles and bones while enhancing endurance and flexibility.",
    },
    {
      title: "The Importance of Good Hygiene for Your Health",
      summary:
        "Proper hygiene prevents illness and promotes long-term health.",
      details:
        "Daily habits like handwashing, oral care, and skincare routines help protect against infections. Maintaining clean surroundings and practicing personal hygiene can significantly impact your overall well-being.",
    },
    {
      title: "Mental Wellness: The Key to a Balanced Life",
      summary:
        "Taking care of your mind is just as important as caring for your body.",
      details:
        "Managing stress through mindfulness, meditation, and relaxation techniques can enhance mental clarity. Building positive relationships and maintaining a healthy work-life balance also contribute to emotional stability.",
    },
    {
      title: "Building Sustainable Healthy Habits",
      summary:
        "Consistency in small, healthy habits leads to long-term wellness.",
      details:
        "Adopting sustainable habits like staying hydrated, getting quality sleep, and prioritizing self-care creates a foundation for lifelong health. Making gradual changes ensures lasting results.",
    },
  ];

  return (
    <section className="hero-section">
      <div style={{ margin: "auto", maxWidth: "800px" }}>
        <div data-aos="fade-up" className="flex-hero">
          <h2>Improving Your Health</h2>
          <p>
            A healthy lifestyle is built on balanced nutrition, regular exercise,
            good hygiene, and mental well-being. Explore these key strategies to
            improve your overall health and well-being.
          </p>

          {topics.map((topic, index) => (
            <div key={index} className="topic-card">
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              {expanded[index] && <p>{topic.details}</p>}
              <button onClick={() => toggleExpand(index)} className="more-info-btn">
                {expanded[index] ? "Show Less" : "More Info"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Healthblog;
