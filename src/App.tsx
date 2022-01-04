import React from "react";
import "./App.css";
import Header from "./components/Header";

import TempoType from "./components/TempoType";

function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => document.getElementById("start-screen")?.focus()}
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
