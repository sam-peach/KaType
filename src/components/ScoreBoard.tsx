import React, { useState } from "react";

const ScoreBoard = ({ score }: { score: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        fontSize: "42px",
        textAlign: "center",
        marginBottom: "4em",
      }}
    >
      <div>{score}</div>
    </div>
  );
};

export default ScoreBoard;
