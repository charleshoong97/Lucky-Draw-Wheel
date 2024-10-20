import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrizeInput from "./PrizeInput";
import LuckyDrawWheel from "./LuckyDrawWheel";
import Layout from "./Layout"; // Import the new Layout component

function App() {
  return (
    <Router>
      <Routes>
        {/* The Layout component wraps both the input and wheel pages */}
        <Route path="/" element={<Layout />}>
          {/* First Page: Prize Input Form */}
          <Route index element={<PrizeInput />} />
          {/* Second Page: Wheel Page */}
          <Route path="wheel" element={<LuckyDrawWheel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
