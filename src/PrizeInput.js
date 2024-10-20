import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Only using the FaTrash icon for remove
import "./PrizeInput.css"; // Assuming the CSS is in a separate file

const PrizeInput = () => {
  const [prizes, setPrizes] = useState([""]); // Start with one empty field
  const navigate = useNavigate();

  // useEffect to populate prizes from sessionStorage when the page loads
  useEffect(() => {
    const storedPrizes = sessionStorage.getItem("prizes");
    if (storedPrizes) {
      const loadedPrizes = JSON.parse(storedPrizes);
      setPrizes([...loadedPrizes, ""]); // Add an extra empty field at the end
    }
  }, []);

  // Handle input field change
  const handlePrizeChange = (index, event) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index] = event.target.value;
    setPrizes(updatedPrizes);

    // If the last field is filled, add a new empty field
    if (
      updatedPrizes.every((prize) => prize !== "") &&
      !updatedPrizes.includes("")
    ) {
      setPrizes([...updatedPrizes, ""]);
    }
  };

  // Remove the field from the list
  const removePrize = (index) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(updatedPrizes);
  };

  // Clear all options and reset to one empty field
  const clearAllPrizes = () => {
    setPrizes([""]);
  };

  // Check if there are at least 2 non-empty options before allowing submit
  const canSubmit = prizes.filter((prize) => prize !== "").length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      // Store prizes in sessionStorage for later use
      sessionStorage.setItem(
        "prizes",
        JSON.stringify(prizes.filter((prize) => prize !== ""))
      );
      // Navigate to the lucky draw wheel page
      navigate("/wheel");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Enter Your Options</h2>
          <button
            type="button"
            className="clear-button"
            onClick={clearAllPrizes}
          >
            Clear
          </button>
        </div>
        {prizes.map((prize, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              className="input-field"
              value={prize}
              placeholder={`Option ${index + 1}`}
              onChange={(event) => handlePrizeChange(index, event)}
            />
            {!(index === prizes.length - 1 && prize === "") && (
              <button
                type="button"
                className="remove-button"
                onClick={() => removePrize(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button" disabled={!canSubmit}>
          {canSubmit ? "Next" : "Min 2 Options Needed"}
        </button>
      </form>
    </div>
  );
};

export default PrizeInput;
