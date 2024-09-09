import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import MqttClient from "./Pages/MqttClient";
import Result from "./Pages/result";
import Sobre from "./Pages/sobre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Dashboard" element={<MqttClient />} />
      <Route path="/result" element={<Result />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;
