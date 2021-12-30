import React, { useState, MouseEvent } from "react";
import "./Options.css";

const rowHeadingStyle = {
  marginBottom: "0.5em",
};

const MAX_SPEED_LIMIT = 3.0;
const MIN_SPEED_LIMIT = 0.5;

const Options = ({
  speedMultiplier,
  setSpeedMultiplier,
  disabled,
  highScore,
}: {
  speedMultiplier: number;
  setSpeedMultiplier: (hewSpeed: number) => void;
  disabled: boolean;
  highScore: number;
}) => {
  const handleSpeedMultiplierChange = (e: MouseEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement).textContent;

    if (!disabled && target === ">" && speedMultiplier < MAX_SPEED_LIMIT) {
      setSpeedMultiplier(speedMultiplier + 0.5);
    } else if (target === "<" && speedMultiplier > MIN_SPEED_LIMIT) {
      setSpeedMultiplier(speedMultiplier - 0.5);
    }
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
        <div style={rowHeadingStyle}>High score</div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: "36px" }}>{highScore.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default Options;
