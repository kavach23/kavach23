import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Flow from "./pages/Flow/Flow";
// React minimal pie chart

export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/flow" element={<Flow />} />
        </Routes>
      </Router>
    </div>
  );
}
