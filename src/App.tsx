import React from "react";
import "./App.css";
import Header from "./components/Header";

import LetterStream from "./components/LetterStream";

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
        <LetterStream />
      </div>
    </div>
  );
}

export default App;
