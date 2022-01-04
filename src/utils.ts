import { notDeepEqual } from "assert";
import { Letter } from "./types/Letter";

export const GAME_LENGTHS: { [key: string]: number } = {
  Short: 30,
  ShortMedium: 60,
  LongMedium: 90,
  Long: 120,
  Infinite: Infinity,
};

export const LETTER_PATTERNS: { [key: string]: string } = {
  Random: "Random",
  Bigrams: "Bigrams",
};

export const BIGRAMS: { [key: string]: Array<string> } = {
  a: ["l", "n", "r", "s", "t"],
  b: ["e"],
  c: ["e", "h", "o", "t"],
  d: ["e", "h", "u"],
  e: ["a", "c", "d", "e", "i", "l", "n", "m", "r", "s", "t"],
  f: ["a", "e", "i", "o", "r"],
  g: ["a", "e", "h", "o", "r"],
  h: ["a", "e", "i", "o"],
  i: ["a", "c", "e", "l", "n", "o", "t", "u"],
  j: ["a", "e", "i", "o", "u"],
  k: ["e", "i", "o"],
  l: ["a", "e", "l", "o"],
  m: ["a", "e", "i", "o"],
  n: ["c", "d", "e", "g", "i", "t"],
  o: ["f", "n", "r", "t", "u"],
  p: ["e", "o", "r"],
  q: ["u"],
  r: ["a", "e", "i", "o", "t"],
  s: ["e", "i", "o", "t"],
  t: ["a", "e", "h", "o"],
  u: ["l", "n", "r", "s", "t"],
  v: ["e", "i"],
  w: ["a", "e", "i", "o"],
  x: ["a"],
  y: ["e", "o"],
  z: ["a", "e"],
};

export const buildObjectIterator = (obj: { [key: string]: any }) => {
  let nextIdx = 0;

  return {
    next: () => {
      if (nextIdx < Object.keys(obj).length - 1) {
        nextIdx++;
      }
      const key = Object.keys(obj)[nextIdx];
      return obj[key];
    },
    prev: () => {
      if (nextIdx > 0) {
        nextIdx--;
      }
      const key = Object.keys(obj)[nextIdx];
      return obj[key];
    },
  };
};

export const randomLetter = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const letter = characters.charAt(
    Math.floor(((Math.random() + Math.random()) / 2) * characters.length)
  );

  return letter;
};

export const randomPunctuation = () => {
  const punctuation = "~=!{}|`()_&@[]^*;-%+";
  const character = punctuation.charAt(
    Math.floor(((Math.random() + Math.random()) / 2) * punctuation.length)
  );

  return character;
};

export const nextBigram = (currentLetter: string) => {
  const nextLetterArray = BIGRAMS[currentLetter];
  return nextLetterArray[Math.floor(Math.random() * nextLetterArray.length)];
};

export const bpmToMilliseconds = (bpm: number) => {
  return 1000 / (bpm / 60);
};
