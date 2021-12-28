import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { Letter } from "../types/Letter";
import LetterWrapper from "./LetterWrapper";
import { timer, interval } from "d3";
import Box from "./Box";

const INTERVAL_MS = 500;

const containerStyle = {
  display: "flex",
};

const randomLetter = (offset: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const letter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );

  return { letter, offset };
};

const bpmToMilliseconds = (bpm: number) => {
  return 1000 / (bpm / 60);
};

const LetterStream = () => {
  const { innerWidth, innerHeight } = window;

  const LETTER_ORIGIN = innerWidth / 4;

  const [running, setRunning] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(120);

  const [letterStream, setLetterStream] = useState<Array<Letter>>([
    randomLetter(LETTER_ORIGIN),
  ]);
  const [ticks, setTicks] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleKeypress = (e: KeyboardEvent) => {
    const letter = letterStream.find((x) => {
      const position = innerWidth - x.offset;
      return position <= innerWidth / 2 + 25 && position >= innerWidth / 2 - 25;
    });

    console.log(letter);

    if (letter && e.key === letter.letter) {
      setScore(score + 1);
    }
  };

  const moveLetters = useCallback(
    (elapsed: number) => {
      console.log(letterStream[0]);
      let updatedLetters = letterStream;
      if (innerWidth - letterStream[0].offset <= innerWidth / 4) {
        updatedLetters = letterStream.slice(1);
      }
      updatedLetters = updatedLetters.map((l) => {
        return { ...l, offset: l.offset + 3 };
      });

      if (ticks >= bpmToMilliseconds(bpm)) {
        const randLetter = randomLetter(LETTER_ORIGIN);
        setLetterStream([...updatedLetters, randLetter]);
        setTicks(0);
      } else {
        setLetterStream(updatedLetters);
        setTicks(ticks + elapsed);
      }
    },
    [LETTER_ORIGIN, bpm, innerWidth, letterStream, ticks]
  );

  useEffect(() => {
    const t = timer(moveLetters, 1);

    return () => {
      t.stop();
    };
  }, [moveLetters]);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeypress}
      style={{
        display: "flex",
        justifySelf: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {letterStream.map((letter) => (
          <LetterWrapper letter={letter} yPos={innerHeight / 2} />
        ))}
        <Box xPos={innerWidth / 2} yPos={innerHeight / 2} />
      </div>
    </div>
  );
};

export default LetterStream;
