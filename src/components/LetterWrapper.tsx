import React from "react";
import { Letter } from "../types/Letter";

const LetterWrapper = ({ letter }: { letter: Letter }) => {
  const { innerWidth } = window;

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${innerWidth - letter.offset}px, 0px)`,
      }}
    >
      {letter.letter}
    </div>
  );
};

export default LetterWrapper;
