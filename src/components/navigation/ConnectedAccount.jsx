import React, { useContext } from "react";
import Web3Context from "../../context/Web3Context";

const ConnectedAccount = () => {
  const { selectedAccounts } = useContext(Web3Context);
  // console.log(selectedAccounts);
  return <div>
    <p>Connected Account: {selectedAccounts}</p>
  </div>;
};

export default ConnectedAccount;
