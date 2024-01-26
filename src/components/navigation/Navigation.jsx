import React from "react";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";

const Navigation = () => {
  return (
    <nav>
      <ConnectedAccount />
      <ConnectedNetwork />
    </nav>
  );
};

export default Navigation;
