import React from "react";
import logo from "../logo.svg";

const headerContainerStyle: {} = {
  display: "flex",
  position: "absolute",
  margin: "0.75em 0.75em",
};

const Header = () => {
  return (
    <div style={headerContainerStyle}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Header;
