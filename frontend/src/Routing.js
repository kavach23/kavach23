import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App1";
import Home from "./pages/Home/Home";
import Flow from "./pages/Flow/Flow";

export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/flow" element={<Flow />} />
          <Route exact path="/custom" element={<App />} />
        </Routes>
      </Router>
    </div>
  );
}
