import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { timer } from "d3";
import { Letter } from "../types/Letter";
import LetterWrapper from "./LetterWrapper";
import Box from "./Box";
import ScoreBoard from "./ScoreBoard";
import "./LetterStream.css";

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

const style = (transition: boolean): {} => {
  const base = {
    display: "flex",
    flex: "1 0 100%",
    flexDirection: "column",
    height: "100%",
    outline: "none",
  };

  const fade = transition
    ? {
        opacity: 0,
        transition: "opacity 0.4s",
      }
    : {
        animation: "fadein 0.4s linear",
        "-webkit-animation": "fadein 0.4s linear",
      };

  return { ...base, ...fade };
};

const LetterStream = ({
  bpm,
  onStop,
  speedMultiplier,
}: {
  bpm: number;
  onStop: (score: number) => void;
  speedMultiplier: number;
}) => {
  const { innerWidth, innerHeight } = window;
  const LETTER_ORIGIN = innerWidth / 4;

  const [ticks, setTicks] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [remainingLetters, setRemainingLetters] = useState<number>(59);
  const [letterStream, setLetterStream] = useState<Array<Letter>>([
    randomLetter(LETTER_ORIGIN),
  ]);

  const handleKeypress = (e: KeyboardEvent) => {
    const letter = letterStream.find((x) => {
      const position = innerWidth - x.offset;
      return position <= innerWidth / 2 + 25 && position >= innerWidth / 2 - 25;
    });

    if (letter && e.key === letter.letter) {
      letter.color = "success";
      setScore(score + 1 * speedMultiplier);
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

      if (ticks >= bpmToMilliseconds(bpm) && remainingLetters > 0) {
        const randLetter = randomLetter(LETTER_ORIGIN);
        setLetterStream([...updatedLetters, randLetter]);
        setTicks(0);
        setRemainingLetters(remainingLetters - 1);
      } else {
        setLetterStream(updatedLetters);
        setTicks(ticks + elapsed);
      }
    },
    [LETTER_ORIGIN, bpm, innerWidth, letterStream, remainingLetters, ticks]
  );

  useEffect(() => {
    const t = timer(moveLetters, 1);

    return () => {
      t.stop();
    };
  }, [moveLetters]);

  useEffect(() => {
    document.getElementById("letter-stream")?.focus();
  }, []);

  return (
    <div
      id="letter-stream"
      style={style(remainingLetters === 0 && letterStream.length === 0)}
      onKeyDown={handleKeypress}
      tabIndex={-1}
      onTransitionEnd={() => onStop(score)}
    >
      <ScoreBoard score={score} />
      <div>
        {letterStream.map((letter, idx) => (
          <LetterWrapper
            key={`${letter}${idx}`}
            letter={letter}
            yPos={innerHeight / 2}
          />
        ))}
      </div>
      <Box />
    </div>
  );
};

export default LetterStream;
