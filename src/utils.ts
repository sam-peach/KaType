export enum GameLength {
  Short = 30,
  ShortMedium = 60,
  LongMedium = 90,
  Long = 120,
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
