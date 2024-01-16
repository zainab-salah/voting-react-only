import "./App.css";
import React from "react";
// 👇️ import Routes instead of Switch 👇️
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ThankYou from "./Pages/ThankYou";

export default function App() {
  return (
    
    <Router>
      <div className="bg-dark min-h-screen flex items-center justify-center flex-col text-light">

      <Routes>
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </Router>
  );
}
