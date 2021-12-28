import React from "react";

const boxStyle = (xPos: number, yPos: number): {} => {
  return {
    width: "50px",
    height: "50px",
    position: "absolute",
    left: `${xPos - 25}px`,
    top: `${yPos - 25}px`,
    borderWidth: "4px",
    borderStyle: "dashed solid",
    borderRadius: "4px",
  };
};

const Box = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  return <div style={boxStyle(xPos, yPos)}></div>;
};

export default Box;
