import React, { useState } from "react";

const SelfCheckup = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const checkups = [
    {
      title: "Track Your Heart Health",
      info: `Your heart rate and blood pressure are key indicators of cardiovascular health.

      - Check your resting heart rate in the morning—what’s normal depends on age and fitness level. If it’s consistently above 100 beats per minute, it may indicate stress, dehydration, or an underlying issue.
      - Measure your blood pressure using a home monitor. A healthy range is 90/60 to 120/80 mmHg. High readings could signal an increased risk of stroke or heart disease.
      - If readings remain outside the normal range, seek medical advice.`,
    },
    {
      title: "Keep an Eye on Your Skin",
      info: `Skin cancer is one of the most common cancers, but early detection can make a big difference.

      - Perform a monthly skin check, looking for new or changing moles, unusual growths, or spots that bleed, itch, or scab over.
      - If you notice anything suspicious, see a doctor or dermatologist.
      - Those with fair skin, numerous moles, or a history of sun exposure are at higher risk and should get annual checkups.`,
    },
    {
      title: "Monitor Blood Sugar Levels",
      info: `Diabetes can develop gradually, so it's important to watch for early signs.

      - A home glucose test (after fasting) can give you an idea of your blood sugar levels.
      - Symptoms like excessive thirst, frequent urination, fatigue, and blurred vision could indicate a problem.
      - If you have concerns, consult a doctor—virtual appointments can be a convenient first step.`,
    },
    {
      title: "Check for Lumps and Swellings",
      info: `Regular self-exams can help detect early signs of cancer.

      **For men:**
      - Perform a testicular self-exam after a warm shower. Gently check for lumps, swelling, or unusual hardness.

      **For women:**
      - Be breast aware by regularly feeling for lumps, changes in shape, or unusual skin texture. Pay attention to any nipple changes or discharge.`,
    },
    {
      title: "Measure Your Waistline",
      info: `Carrying excess fat around the waist increases the risk of heart disease, diabetes, and other metabolic conditions.

      - Measure your waist at belly button level:
        - **Men:** Over 94 cm (37 inches) indicates a higher risk.
        - **Women:** Over 80 cm (31.5 inches) suggests an increased health risk.
      - Maintaining a healthy weight through diet and exercise can help reduce these risks.`,
    },
    {
      title: "Assess Your Hydration",
      info: `Staying hydrated is essential for overall health, but how can you tell if you're drinking enough water?

      - Check urine color—pale yellow means well-hydrated, while dark yellow or amber suggests dehydration.
      - Try the skin pinch test—pinch the skin on your hand. If it takes a while to return to normal, you may be dehydrated.
      - Watch for dry mouth, fatigue, or dizziness, which are also signs of dehydration.`,
    },
    {
      title: "Test Your Oxygen Levels",
      info: `Blood oxygen levels indicate how well your lungs and heart are functioning.

      - Use a pulse oximeter (placed on your fingertip) to measure oxygen saturation. A normal reading is **95-100%**.
      - If levels drop below 92%, consult a doctor—it may indicate a lung or heart condition.
      - This test is especially useful if you have asthma, COVID-19, or respiratory issues.`,
    },
    {
      title: "Perform a Meningitis Test",
      info: `Meningitis develops quickly and can be life-threatening, especially in children.

      - Early symptoms include flu-like signs, neck stiffness, drowsiness, and sensitivity to bright lights.
      - **The glass test:** Press a clear glass firmly against the skin. If a rash does not fade, seek emergency medical care.
      - Mobile apps are available to help recognize meningitis symptoms.`,
    },
    {
      title: "Evaluate Your Reflexes",
      info: `Reflex tests can indicate nerve or muscle function issues.

      - Tap just below your kneecap with your fingers—your leg should twitch slightly.
      - If reflexes seem weak, slow, or uneven between sides, it could indicate a neurological problem.
      - If you notice unusual changes in reflexes, consult a doctor.`,
    },
    {
      title: "Monitor Your Temperature",
      info: `Your body temperature is a key indicator of infection or illness.

      - Normal adult temperature is around 37°C (98.6°F) but varies based on time of day and measurement location.
      - A high temperature (fever) may indicate infection—if persistent or accompanied by other symptoms, seek medical advice.
      - Digital thermometers provide the most accurate readings.`,
    },
  ];

  return (
    <section className="self-checkup">
      <div style={{ margin: "auto", maxWidth: "600px" }}>
        <h1>Self-Check: 10 Easy Health Tests You Can Do at Home</h1>
        
        <p>Here are 10 practical health tests you can do at home to stay on top of your health:</p>

        {checkups.map((checkup, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <button
              onClick={() => toggleSection(index)}
              style={{
                width: "100%",
                padding: "10px",
                textAlign: "center",
                fontSize: "16px",
                cursor: "pointer",
                border: "1px solid #ccc",
                backgroundColor: "blue",
              }}
            >
              {checkup.title} {openSections[index] ? "▼" : "▶"}
            </button>
            {openSections[index] && (
              <div style={{ padding: "10px", border: "1px solid #ddd", borderTop: "none" }}>
                <p>{checkup.info}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelfCheckup;
