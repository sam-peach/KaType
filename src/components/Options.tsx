import React, { useCallback, MouseEvent } from "react";
import { GameLength } from "../utils";
import "./Options.css";

const rowHeadingStyle = {
  marginBottom: "0.5em",
};

const MAX_SPEED_LIMIT = 3.0;
const MIN_SPEED_LIMIT = 0.5;

const Options = ({
  speedMultiplier,
  setSpeedMultiplier,

  highScore,
  gameLength,
  setGameLength,
}: {
  speedMultiplier: number;
  setSpeedMultiplier: (hewSpeed: number) => void;

  highScore: number;
  gameLength: GameLength;
  setGameLength: (val: GameLength) => void;
}) => {
  const handleSpeedMultiplierChange = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).textContent;

      if (target === ">" && speedMultiplier < MAX_SPEED_LIMIT) {
        setSpeedMultiplier(speedMultiplier + 0.1);
      } else if (target === "<" && speedMultiplier > MIN_SPEED_LIMIT) {
        setSpeedMultiplier(speedMultiplier - 0.1);
      }
    },
    [setSpeedMultiplier, speedMultiplier]
  );

  const handleGameLengthChange = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).textContent;

      if (target === ">" && gameLength < GameLength.Long) {
        setGameLength(gameLength + 30);
      } else if (target === "<" && gameLength > GameLength.Short) {
        setGameLength(gameLength - 30);
      }
    },
    [gameLength, setGameLength]
  );

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
        <div style={rowHeadingStyle}>Game length</div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span onClick={handleGameLengthChange} style={{ marginRight: "1em" }}>
            {"<"}
          </span>
          <span style={{ fontSize: "36px" }}>{gameLength}</span>
          <span onClick={handleGameLengthChange} style={{ marginLeft: "1em" }}>
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
