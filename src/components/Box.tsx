import React from "react";

const boxStyle = (xPos: number): {} => {
  return {
    width: "50px",
    height: "50px",
    backgroundColor: "red",
    position: "absolute",
    left: `${xPos - 25}px`,
    opacity: 0.1,
  };
};

const Box = ({ xPos }: { xPos: number }) => {
  return <div style={boxStyle(xPos)}></div>;
};

export default Box;
