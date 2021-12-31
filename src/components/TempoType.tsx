import React, { useState } from "react";
import { GameLength } from "../utils";
import LetterStream from "./LetterStream";
import StartScreen from "./StartScreen";

const BASE_BPM = 120;

const containerStyle: {} = {
  display: "flex",
  justifySelf: "center",
  flexWrap: "wrap",
  justifyContent: "center",
};

const TempoType = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [highScore, setHighScore] = useState<number>(0.0);
  const [gameLength, setGameLength] = useState<GameLength>(
    GameLength.ShortMedium
  );

  return (
    <div tabIndex={0} style={containerStyle}>
      {running ? (
        <LetterStream
          bpm={BASE_BPM * speedMultiplier}
          speedMultiplier={speedMultiplier}
          gameLength={gameLength}
          onStop={(score: number) => {
            if (score > highScore) {
              setHighScore(score);
            }
            setRunning(false);
          }}
        />
      ) : (
        <StartScreen
          afterStart={() => setRunning(true)}
          speedMultiplier={speedMultiplier}
          setSpeedMultiplier={setSpeedMultiplier}
          running
          highScore={highScore}
          gameLength={gameLength}
          setGameLength={setGameLength}
        />
      )}
    </div>
  );
};

export default TempoType;
