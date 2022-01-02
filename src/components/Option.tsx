import React from "react";

const Option = ({
  heading,
  children,
}: {
  heading: string;
  children?: JSX.Element | Array<JSX.Element>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginBottom: "0.5em",
        }}
      >
        {heading}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: Array.isArray(children) ? "space-between" : "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Option;
