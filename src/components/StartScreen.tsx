import React, { useState } from "react";

const fadeOut = {
  opacity: 0,
  transition: "opacity 0.5s 0.4s",
};

const style = { alignSelf: "center" };

const StartScreen = ({ afterStart }: { afterStart: () => void }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div
      onClick={handleClick}
      onTransitionEnd={afterStart}
      style={clicked ? { ...style, ...fadeOut } : style}
    >
      Start
    </div>
  );
};

export default StartScreen;
