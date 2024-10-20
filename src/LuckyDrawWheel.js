import React, { useEffect, useState } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./LuckyDrawWheel.css";

// Utility function to generate random colors
const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `hsl(${Math.floor((360 / count) * i)}, 100%, 45%)`; // Generating colors evenly spaced in the HSL color wheel
    colors.push(color);
  }
  return colors;
};

const generateDimColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `hsl(${Math.floor((360 / count) * i)}, 40%, 40%)`; // Dimmer colors: reduced saturation and lightness
    colors.push(color);
  }
  return colors;
};

const LuckyDrawWheel = () => {
  const navigate = useNavigate();
  const [prizes, setPrizes] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [degree, setDegree] = useState(0);
  const [result, setResult] = useState(""); // State to store the result

  // Load custom prizes from sessionStorage
  useEffect(() => {
    const storedPrizes = sessionStorage.getItem("prizes");
    if (storedPrizes) {
      setPrizes(JSON.parse(storedPrizes));
    } else {
      // If no prizes found, navigate back to the input page
      navigate("/");
    }
  }, [navigate]);

  // Generate dynamic colors based on the number of prizes
  const colors = generateColors(prizes.length);

  const handleSpin = () => {
    if (!isSpinning) {
      const randomSpin = Math.floor(Math.random() * 3000) + 720; // Random spin between 720° and 3600°
      setResult(""); // Clear result when spinning starts

      setDegree(degree + randomSpin);
      setIsSpinning(true);

      // Calculate which prize lands at 0° after the wheel stops
      setTimeout(() => {
        const finalDegree = (degree + randomSpin) % 360;
        const degreesPerPrize = 360 / prizes.length;
        const prizeIndex = Math.floor(
          (prizes.length - finalDegree / degreesPerPrize) % prizes.length
        );

        setIsSpinning(false);
        setResult(prizes[prizeIndex]); // Set the result with only the selected prize
      }, 5000); // Match with animation duration
    }
  };

  const handleBack = () => {
    // Navigate back to the input form
    navigate("/");
  };

  if (!prizes.length) {
    return <div>Loading...</div>;
  }

  // Build the dynamic gradient for the wheel based on the number of colors and prizes
  const wheelBackground = `conic-gradient(${colors
    .map(
      (color, index) =>
        `${color} ${(index / prizes.length) * 100}% ${
          (100 / prizes.length) * (index + 1)
        }%`
    )
    .join(", ")})`;

  return (
    <div className="wheel-container">
      {/* Back button with an arrow positioned at the top-left inside the wheel container */}
      <div className="back-button" onClick={handleBack}>
        <FaLeftLong className="back-icon" />
      </div>
      <div className="pointer"></div> {/* The pointer remains at the top */}
      <div
        className="wheel"
        style={{
          transform: `rotate(${degree}deg)`,
          background: wheelBackground,
        }}
      >
        <div className="prize-text-container">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="prize"
              style={{
                transform: `rotate(${
                  (index + 1) * (360 / prizes.length / 2) +
                  (360 / prizes.length / 2) * index
                }deg)`,
              }}
            >
              <span className="prize-text">{prize}</span>
            </div>
          ))}
        </div>
        <div className="center-circle"></div>
      </div>
      {/* Reserved space for the result */}
      <div
        className="result-display"
        style={
          result
            ? { backgroundColor: "#ffd700", color: "#000", fontWeight: "bold" }
            : {}
        }
      >
        {result ? result : <span>&nbsp;</span>}{" "}
        {/* This reserves the space without displaying anything */}
      </div>
      {/* Spin Now or Try Again button centered below the result */}
      <div className="cta-container">
        <button
          className="cta-button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : result ? "Try Again" : "Spin Now"}
        </button>
      </div>
    </div>
  );
};

export default LuckyDrawWheel;
