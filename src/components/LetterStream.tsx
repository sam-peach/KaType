import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { timer } from "d3";
import { Letter } from "../types/Letter";
import LetterWrapper from "./LetterWrapper";
import Box from "./Box";
import ScoreBoard from "./ScoreBoard";

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

const LetterStream = ({ bpm }: { bpm: number }) => {
  const { innerWidth, innerHeight } = window;

  const [ticks, setTicks] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const LETTER_ORIGIN = innerWidth / 4;
  const [letterStream, setLetterStream] = useState<Array<Letter>>([
    randomLetter(LETTER_ORIGIN),
  ]);

  const handleKeypress = (e: KeyboardEvent) => {
    const letter = letterStream.find((x) => {
      const position = innerWidth - x.offset;
      return position <= innerWidth / 2 + 25 && position >= innerWidth / 2 - 25;
    });

    if (letter && e.key === letter.letter) {
      setScore(score + 1);
    }
  };

  const moveLetters = useCallback(
    (elapsed: number) => {
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
      style={{
        display: "flex",
        flex: "1 0 100%",
        flexDirection: "column",
        height: "100%",
      }}
      onKeyDown={handleKeypress}
      tabIndex={0}
    >
      <ScoreBoard score={score} />
      <div style={{ display: "flex", flex: "1 0 100%" }}>
        {letterStream.map((letter) => (
          <LetterWrapper letter={letter} yPos={innerHeight / 2} />
        ))}
      </div>
      <Box xPos={innerWidth / 2} yPos={innerHeight / 2} />
    </div>
  );
};

export default LetterStream;
