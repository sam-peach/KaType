export enum GameLength {
  Short = 30,
  ShortMedium = 60,
  LongMedium = 90,
  Long = 120,
  Infinite = Infinity,
}

export const getNextGameLength = ({
  gameLength,
  type,
}: {
  gameLength: GameLength;
  type: string;
}) => {
  if (type === "increase") {
    return Object.values(GameLength).find((v) => v > gameLength) || gameLength;
  }

  if (type === "decrease") {
    const idx = Object.values(GameLength).indexOf(gameLength);

    return idx - 1 > 0
      ? (Object.values(GameLength)[idx - 1] as GameLength)
      : gameLength;
  }
};

export enum LetterGeneration {
  Random,
  Bigrams,
}

export const randomLetter = (offset: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const letter = characters.charAt(
    Math.floor(((Math.random() + Math.random()) / 2) * characters.length)
  );

  return { letter, offset, disabled: false };
};

export const bpmToMilliseconds = (bpm: number) => {
  return 1000 / (bpm / 60);
};
