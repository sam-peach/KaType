import React, { useState, useEffect } from "react";

const fadeOut = {
  opacity: 0,
  transition: "opacity 0.5s 0.4s",
};

const style = { alignSelf: "center", outline: "none" };

const StartScreen = ({ afterStart }: { afterStart: () => void }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    document.getElementById("start-screen")?.focus();
  }, []);

  return (
    <div
      id="start-screen"
      tabIndex={-1}
      onClick={handleClick}
      onTransitionEnd={afterStart}
      style={clicked ? { ...style, ...fadeOut } : style}
    >
      Click here to begin
    </div>
  );
};

export default StartScreen;
