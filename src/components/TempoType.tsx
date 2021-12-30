import React, { useState } from "react";

import LetterStream from "./LetterStream";
import Options from "./Options";
import StartScreen from "./StartScreen";

const TempoType = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(120);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [highScore, setHighScore] = useState<number>(0.0);

  return (
    <div
      tabIndex={0}
      style={{
        display: "flex",
        justifySelf: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flex: "1 0 100%",
          height: "350px",
        }}
      >
        {running ? (
          <LetterStream
            bpm={bpm * speedMultiplier}
            speedMultiplier={speedMultiplier}
            onStop={(score: number) => {
              if (score > highScore) {
                setHighScore(score);
              }
              setRunning(false);
            }}
          />
        ) : (
          <StartScreen
            afterStart={() => {
              setRunning(true);
            }}
          />
        )}
      </div>
      <Options
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        disabled={running}
        highScore={highScore}
      />
    </div>
  );
};

export default TempoType;
