import React, { useState } from "react";

const ScoreBoard = ({ score }: { score: number }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: "1 0%",
        justifyContent: "center",
        alignContent: "center",
        fontSize: "42px",
        textAlign: "center",
      }}
    >
      <div>{score}</div>
    </div>
  );
};

export default ScoreBoard;
