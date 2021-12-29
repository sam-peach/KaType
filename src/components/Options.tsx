import React, { useState, MouseEvent } from "react";
import "./Options.css";

const rowHeadingStyle = {
  marginBottom: "0.5em",
};

const Options = () => {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);

  const handleSpeedMultiplierChange = (e: MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).innerHTML);
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1 0 100%",
        justifyContent: "center",
        paddingTop: "4em",
      }}
    >
      <div className="options-row">
        <div style={rowHeadingStyle}>Speed</div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            onClick={handleSpeedMultiplierChange}
            style={{ marginRight: "0.75em" }}
          >
            {"<"}
          </span>
          <span style={{ fontWeight: 800 }}>x</span>
          <span style={{ fontSize: "36px" }}>{speedMultiplier.toFixed(1)}</span>
          <span
            onClick={handleSpeedMultiplierChange}
            style={{ marginLeft: "0.75em" }}
          >
            {">"}
          </span>
        </div>
      </div>
      <div className="options-row">
        <div style={rowHeadingStyle}>Top score</div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: "36px" }}>0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Options;
