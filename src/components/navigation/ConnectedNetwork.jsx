import React, { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);
  //   console.log(chainId);

  return (
    <div>{chainId === 80001 ? "Polygon Mumbai" : "Unsupported Network"}</div>
  );
};

export default ConnectedNetwork;
