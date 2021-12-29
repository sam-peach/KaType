import React, { useState, useEffect, KeyboardEvent } from "react";

const fadeOut = {
  opacity: 0,
  transition: "opacity 0.5s 0.4s",
};

const style = { alignSelf: "center", outline: "none" };

const StartScreen = ({ afterStart }: { afterStart: () => void }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      setClicked(true);
    }
  };

  useEffect(() => {
    document.getElementById("start-screen")?.focus();
  }, []);

  return (
    <div
      id="start-screen"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onTransitionEnd={afterStart}
      style={clicked ? { ...style, ...fadeOut } : style}
    >
      Press space bar to begin
    </div>
  );
};

export default StartScreen;
