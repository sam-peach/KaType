import React, { useEffect, useState } from "react";
import Options from "./Options";

const style = (shouldFade: boolean): {} => {
  const base = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flex: "0 0 75%",
    paddingTop: "20vh",
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
  letterPattern,
  setLetterPattern,
}: {
  afterStart: () => void;
  speedMultiplier: number;
  setSpeedMultiplier: (hewSpeed: number) => void;
  running: boolean;
  highScore: number;
  gameLength: number;
  setGameLength: (val: number) => void;
  letterPattern: string;
  setLetterPattern: (val: string) => void;
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
        style={{ marginBottom: "10vh", fontSize: "36px" }}
      >
        Click here to begin
      </div>
      <Options
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        highScore={highScore}
        gameLength={gameLength}
        setGameLength={setGameLength}
        letterPattern={letterPattern}
        setLetterPattern={setLetterPattern}
      />
    </div>
  );
};

export default StartScreen;
