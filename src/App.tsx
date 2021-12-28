import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

import TempoType from "./components/TempoType";
import StartScreen from "./components/StartScreen";

function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 100%",
          justifyContent: "center",
        }}
      >
        <TempoType />
      </div>
    </div>
  );
}

export default App;
