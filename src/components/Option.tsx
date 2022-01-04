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
        flex: "1 1 100%",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: "1em", fontSize: "18px" }}>{heading}</div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: Array.isArray(children)
              ? "space-between"
              : "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Option;
