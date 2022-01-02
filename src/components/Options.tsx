import React, { useCallback, MouseEvent } from "react";
import { GameLength, getNextGameLength } from "../utils";
import "./Options.css";
import Option from "./Option";
import { CgInfinity } from "react-icons/cg";

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

      if (target === ">" && gameLength < GameLength.Infinite) {
        const nextGameLength = getNextGameLength({
          gameLength,
          type: "increase",
        });
        setGameLength(nextGameLength as GameLength);
      } else if (target === "<" && gameLength > GameLength.Short) {
        const nextGameLength = getNextGameLength({
          gameLength,
          type: "decrease",
        });
        setGameLength(nextGameLength as GameLength);
      }
    },
    [gameLength, setGameLength]
  );

  return (
    <>
      <div className="options-row">
        <Option heading="Speed">
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
        </Option>
        <Option heading={"Game length"}>
          <span onClick={handleGameLengthChange} style={{ marginRight: "1em" }}>
            {"<"}
          </span>
          <span style={{ fontSize: "36px" }}>
            {gameLength === GameLength.Infinite ? (
              <CgInfinity strokeWidth={0.5} />
            ) : (
              gameLength
            )}
          </span>
          <span onClick={handleGameLengthChange} style={{ marginLeft: "1em" }}>
            {">"}
          </span>
        </Option>

        <Option heading={"High score"}>
          <span style={{ fontSize: "36px" }}>{highScore.toFixed(1)}</span>
        </Option>
      </div>
    </>
  );
};

export default Options;
