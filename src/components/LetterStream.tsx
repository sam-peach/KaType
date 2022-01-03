import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { timer } from "d3";
import { Letter } from "../types/Letter";
import LetterWrapper from "./LetterWrapper";
import Box from "./Box";
import ScoreBoard from "./ScoreBoard";
import { bpmToMilliseconds, randomLetter, nextBigram } from "../utils";

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
  gameLength,
  letterPattern,
}: {
  bpm: number;
  onStop: (score: number) => void;
  speedMultiplier: number;
  gameLength: number;
  letterPattern: string;
}) => {
  const { innerWidth, innerHeight } = window;
  const letterGenerator = useCallback(
    (currentLetter?: string): Letter => {
      let letter = randomLetter();

      if (currentLetter && letterPattern === "Bigrams" && Math.random() > 0.3) {
        letter = nextBigram(currentLetter);
      }

      return { letter, offset: window.innerWidth / 4, disabled: false };
    },
    [letterPattern]
  );

  const [ticks, setTicks] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [remainingLetters, setRemainingLetters] = useState<number>(
    gameLength - 1
  );
  const [letterStream, setLetterStream] = useState<Array<Letter>>([
    letterGenerator(),
  ]);
  const [shouldStop, setShouldStop] = useState<boolean>(false);

  const handleKeypress = (e: KeyboardEvent) => {
    const letter = letterStream.find((l) => {
      const position = innerWidth - l.offset;
      return (
        !l.disabled &&
        position <= innerWidth / 2 + 40 &&
        position >= innerWidth / 2 - 40
      );
    });

    if (letter && e.key === letter.letter && !letter.disabled) {
      letter.color = "success";
      letter.disabled = true;
      const newScore = score + 1 * speedMultiplier;
      setScore(Number(newScore.toFixed(2)));
    }
  };

  const moveLetters = useCallback(
    (elapsed: number) => {
      const updatedLetters = letterStream.reduce<Array<Letter>>(
        (accum, letter, idx) => {
          if (
            idx === 0 &&
            innerWidth - letterStream[0].offset <= innerWidth / 4
          ) {
            return accum;
          }

          return [...accum, { ...letter, offset: letter.offset + 3 }];
        },
        []
      );

      if (ticks >= bpmToMilliseconds(bpm) && remainingLetters > 0) {
        const randLetter = letterGenerator(
          updatedLetters[updatedLetters.length - 1].letter
        );
        setLetterStream([...updatedLetters, randLetter]);
        setTicks(0);
        setRemainingLetters(remainingLetters - 1);
      } else {
        setLetterStream(updatedLetters);
        setTicks(ticks + elapsed);
      }
    },
    [bpm, innerWidth, letterGenerator, letterStream, remainingLetters, ticks]
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

  useEffect(() => {
    if (remainingLetters === 0 && letterStream.length === 0) {
      setShouldStop(true);
    }
  }, [letterStream.length, remainingLetters]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flex: "1 0 100%",
        height: "350px",
      }}
    >
      <div
        id="letter-stream"
        style={style(shouldStop)}
        onKeyDown={handleKeypress}
        tabIndex={-1}
        onTransitionEnd={(e) => {
          if ((e.target as HTMLElement).id !== "reset-button") {
            onStop(score);
          }
        }}
      >
        <div>
          <ScoreBoard score={score} />
          {letterStream.map((letter, idx) => (
            <LetterWrapper
              key={`${letter}${idx}`}
              letter={letter}
              yPos={innerHeight / 2}
            />
          ))}
        </div>
        <Box />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5em",
          }}
        >
          <div
            id="reset-button"
            onClick={() => {
              setShouldStop(true);
            }}
            style={{ fontWeight: 400 }}
          >
            reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterStream;
