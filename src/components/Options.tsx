import React, { useCallback, MouseEvent } from "react";
import { GAME_LENGTHS, LETTER_PATTERNS, buildObjectIterator } from "../utils";
import "./Options.css";
import Option from "./Option";
import { CgInfinity } from "react-icons/cg";

const MAX_SPEED_LIMIT = 3.0;
const MIN_SPEED_LIMIT = 0.5;
const gameLengthIterator = buildObjectIterator(GAME_LENGTHS);
const letterPatternIterator = buildObjectIterator(LETTER_PATTERNS);

const Options = ({
  speedMultiplier,
  setSpeedMultiplier,
  highScore,
  gameLength,
  setGameLength,
  letterPattern,
  setLetterPattern,
  uppercase,
  setUppercase,
  punctuation,
  setPunctuation,
}: {
  speedMultiplier: number;
  setSpeedMultiplier: (hewSpeed: number) => void;
  highScore: number;
  gameLength: number;
  setGameLength: (val: number) => void;
  letterPattern: string;
  setLetterPattern: (val: string) => void;
  uppercase: boolean;
  setUppercase: (val: boolean) => void;
  punctuation: boolean;
  setPunctuation: (val: boolean) => void;
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

      if (target === ">") {
        setGameLength(gameLengthIterator.next());
      } else if (target === "<") {
        setGameLength(gameLengthIterator.prev());
      }
    },
    [setGameLength]
  );

  const handleLetterPatternChange = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).textContent;

      if (target === ">") {
        setLetterPattern(letterPatternIterator.next());
      } else if (target === "<") {
        setLetterPattern(letterPatternIterator.prev());
      }
    },
    [setLetterPattern]
  );

  return (
    <>
      <div className="options-row" style={{ marginBottom: "8vh" }}>
        <Option heading={"High score"}>
          <span style={{ fontSize: "36px" }}>{highScore.toFixed(1)}</span>
        </Option>
      </div>
      <div
        className="options-row"
        style={{
          borderTop: "2px dashed #ffd76a",
          padding: "8vh 0",
          flex: "1 1 100%",
        }}
      >
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
            {gameLength === GAME_LENGTHS.Infinite ? (
              <CgInfinity strokeWidth={0.5} />
            ) : (
              gameLength
            )}
          </span>
          <span onClick={handleGameLengthChange} style={{ marginLeft: "1em" }}>
            {">"}
          </span>
        </Option>
        <Option heading="Letter pattern">
          <span
            onClick={handleLetterPatternChange}
            style={{ marginRight: "0.75em" }}
          >
            {"<"}
          </span>
          <span style={{ fontSize: "24px" }}>{letterPattern}</span>
          <span
            onClick={handleLetterPatternChange}
            style={{ marginLeft: "0.75em" }}
          >
            {">"}
          </span>
        </Option>
        <Option heading="Uppercase">
          <span
            onClick={() => setUppercase(!uppercase)}
            style={{ marginRight: "0.75em" }}
          >
            {"<"}
          </span>
          <span style={{ fontSize: "24px" }}>{uppercase ? "Yes" : "No"}</span>
          <span
            onClick={() => setUppercase(!uppercase)}
            style={{ marginLeft: "0.75em" }}
          >
            {">"}
          </span>
        </Option>
        <Option heading="Punctuation">
          <span
            onClick={() => setPunctuation(!punctuation)}
            style={{ marginRight: "0.75em" }}
          >
            {"<"}
          </span>
          <span style={{ fontSize: "24px" }}>{punctuation ? "Yes" : "No"}</span>
          <span
            onClick={() => setPunctuation(!punctuation)}
            style={{ marginLeft: "0.75em" }}
          >
            {">"}
          </span>
        </Option>
      </div>
    </>
  );
};

export default Options;
