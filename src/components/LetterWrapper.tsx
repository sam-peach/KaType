import React from "react";
import { Letter } from "../types/Letter";

const LetterWrapper = ({ letter, yPos }: { letter: Letter; yPos: number }) => {
  const { innerWidth } = window;

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${innerWidth - letter.offset}px, 0px)`,
        opacity: letter.color && letter.color === "success" ? 0.1 : 1,
      }}
    >
      {letter.letter}
    </div>
  );
};

export default LetterWrapper;
