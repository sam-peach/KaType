import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { Letter } from "../types/Letter";
import LetterWrapper from "./LetterWrapper";
import { timer } from "d3";
import Box from "./Box";

const INTERVAL_MS = 500;

const containerStyle = {
  display: "flex",
};

const randomLetter = (offset: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const letter = characters.charAt(
    Math.round(Math.random() * characters.length)
  );

  return { letter, offset };
};

const LetterStream = () => {
  const { innerWidth } = window;

  const LETTER_ORIGIN = innerWidth / 4;

  const [letterStream, setLetterStream] = useState<Array<Letter>>([
    randomLetter(LETTER_ORIGIN),
  ]);
  const [ticks, setTicks] = useState<number>(0.0);
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
      const updatedLetters = letterStream.map((l) => {
        return { ...l, offset: l.offset + 2 };
      });

      if (ticks >= INTERVAL_MS) {
        setLetterStream([
          ...updatedLetters.slice(-5),
          randomLetter(LETTER_ORIGIN),
        ]);
        setTicks(0);
      } else {
        setLetterStream(updatedLetters);
        setTicks(ticks + elapsed);
      }
    },
    [LETTER_ORIGIN, letterStream, ticks]
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
      <div style={containerStyle}>
        {letterStream.map((letter) => (
          <LetterWrapper letter={letter} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box xPos={innerWidth / 2} />
      </div>
      <br />
      <br />
      <br />
      <div>{score}</div>
    </div>
  );
};

export default LetterStream;
