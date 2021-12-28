import React, { useState } from "react";

import LetterStream from "./LetterStream";
import StartScreen from "./StartScreen";

const TempoType = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(120);

  return (
    <div
      tabIndex={0}
      style={{
        display: "flex",
        justifySelf: "center",
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
          <LetterStream bpm={bpm} />
        ) : (
          <StartScreen
            afterStart={() => {
              setRunning(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TempoType;
