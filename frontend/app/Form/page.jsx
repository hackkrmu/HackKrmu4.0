"use client";
import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const token = Cookies.get("token");

function MultiStepHealthForm() {
  const [formData, setFormData] = useState({
    waterIntake: 3,
    dietBalance: 3,
    exerciseRoutine: 3,
    sleepQuality: 3,
    stressLevels: 3,
    skinHydration: 3,
    sunExposure: 3,
    skinCareRoutine: 3,
    skinSensitivity: 3,
    inflammationBreakouts: 3,
  });

  const [step, setStep] = useState(1); // Step state to track the current form step

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_HOST}/ht/api/health`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(token);
      if (response.ok) {
        alert("Personal quiz submitted"); // Display the alert
        window.location.href = "http://localhost:3000/Chart"; // Redirect to the Chart page
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1C1C1C",
        marginLeft: "250px",
        height: "89.2vh",
        zIndex: "-1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        marginTop: "84px",
        overflow: "hidden",
      }}
    >
      {step === 1 && (
        <div style={quizstyles.box}>
          <h2 style={quizstyles.heading}>
            Water Intake: How often do you drink water in a day?
          </h2>
          <div style={quizstyles.optionsContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} style={quizstyles.label}>
                <input
                  type="radio"
                  name="waterIntake"
                  value={value}
                  checked={formData.waterIntake === value}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>
          <p style={{ color: "white" }}>
            1 (Rarely: less than 4 glasses) - 5 (Always: more than 10 glasses)
          </p>
          <div style={quizstyles.buttonContainer}>
            <button
              type="button"
              onClick={handleNext}
              style={quizstyles.button}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={quizstyles.box}>
          <h2 style={quizstyles.heading}>
            Diet Balance: How balanced was your diet today?
          </h2>
          <div style={quizstyles.optionsContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} style={quizstyles.label}>
                <input
                  type="radio"
                  name="dietBalance"
                  value={value}
                  checked={formData.dietBalance === value}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>
          <p style={{ color: "white" }}>1 (Very poor) - 5 (Excellent)</p>
          <div style={quizstyles.buttonContainer}>
            <button
              type="button"
              onClick={handlePrevious}
              style={quizstyles.button}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              style={quizstyles.button}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={quizstyles.box}>
          <h2 style={quizstyles.heading}>
            Exercise Routine: How much physical activity did you do today?
          </h2>
          <div style={quizstyles.optionsContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} style={quizstyles.label}>
                <input
                  type="radio"
                  name="exerciseRoutine"
                  value={value}
                  checked={formData.exerciseRoutine === value}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>
          <p style={{ color: "white" }}>1 (None) - 5 (More than 1 hour)</p>
          <div style={quizstyles.buttonContainer}>
            <button
              type="button"
              onClick={handlePrevious}
              style={quizstyles.button}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              style={quizstyles.button}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={quizstyles.box}>
          <h2 style={quizstyles.heading}>
            Sleep Quality: How well did you sleep last night?
          </h2>
          <div style={quizstyles.optionsContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} style={quizstyles.label}>
                <input
                  type="radio"
                  name="sleepQuality"
                  value={value}
                  checked={formData.sleepQuality === value}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>
          <p style={{ color: "white" }}>1 (Very poorly) - 5 (Very well)</p>
          <div style={quizstyles.buttonContainer}>
            <button
              type="button"
              onClick={handlePrevious}
              style={quizstyles.button}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              style={quizstyles.button}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div style={quizstyles.box}>
          <h2 style={quizstyles.heading}>
            Stress Levels: How stressed have you felt today?
          </h2>
          <div style={quizstyles.optionsContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} style={quizstyles.label}>
                <input
                  type="radio"
                  name="stressLevels"
                  value={value}
                  checked={formData.stressLevels === value}
                  onChange={handleChange}
                />
                {value}
              </label>
            ))}
          </div>
          <p style={{ color: "white" }}>1 (Very stressed) - 5 (Very relaxed)</p>
          <div style={quizstyles.buttonContainer}>
            <button
              type="button"
              onClick={handlePrevious}
              style={quizstyles.button}
            >
              Previous
            </button>
            <button type="submit" style={quizstyles.button}>
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

const quizstyles = {
  label: {
    color: "#CEDF9F",
    fontFamily: "Istok Web",
    fontSize: "18px",
    display: "block",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#CEDF9F",
    padding: "10px",
    width: "100px",
    border: "2px solid #435940",
    boxShadow: "4px 4px 11.6px #00000033 inset",
    borderRadius: "9px",
    margin: "10px",
  },
  box: {
    padding: "20px",
    backgroundColor: "#2A2A2A",
    borderRadius: "9px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "center",
  },
  heading: {
    color: "#CEDF9F",
    fontSize: "24px",
    fontFamily: "Istok Web",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

export default MultiStepHealthForm;
