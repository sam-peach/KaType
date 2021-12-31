import React, { useEffect, useState } from "react";
import Options from "./Options";
import { GameLength } from "../utils";

const style = (shouldFade: boolean): {} => {
  const base = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const fade = shouldFade
    ? {
        opacity: 0,
        transition: "opacity 0.6s",
      }
    : { animation: "fadein", "-webkit-animation": "fadein 0.4s linear" };

  return { ...base, ...fade };
};

const StartScreen = ({
  afterStart,
  speedMultiplier,
  setSpeedMultiplier,
  running,
  highScore,
  gameLength,
  setGameLength,
}: {
  afterStart: () => void;
  speedMultiplier: number;
  setSpeedMultiplier: (hewSpeed: number) => void;
  running: boolean;
  highScore: number;
  gameLength: GameLength;
  setGameLength: (val: GameLength) => void;
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    document.getElementById("start-screen")?.focus();
  }, []);

  return (
    <div style={style(clicked)} onTransitionEnd={afterStart}>
      <div
        id="start-screen"
        onClick={() => setClicked(true)}
        style={{ marginBottom: "1em" }}
      >
        Click here to begin
      </div>
      <Options
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        highScore={highScore}
        gameLength={gameLength}
        setGameLength={setGameLength}
      />
    </div>
  );
};

export default StartScreen;
