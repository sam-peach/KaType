import React from "react";

const boxStyle = {
  width: "77px",
  height: "50px",
  borderWidth: "3px",
  borderStyle: "dashed solid",
  borderRadius: "4px",
  transform: "translate(0em, -0.5em)",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const Box = () => {
  return (
    <div style={containerStyle}>
      <span style={boxStyle}></span>
    </div>
  );
};

export default Box;
