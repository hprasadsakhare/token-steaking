import React, { useEffect, useState } from "react";
import { ConnectWallet } from "../../utils/ConnectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../button/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const {
        provider,
        selectedAccounts,
        stakingContract,
        stakeTokenContract,
        chainId,
      } = await ConnectWallet();
      setState({
        provider,
        selectedAccounts,
        stakingContract,
        stakeTokenContract,
        chainId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook
  useEffect(() => {
    window.ethereum.on("accountsChanged", () => handleAccountChange(setState));
    window.ethereum.on("chainChanged", () => handleChainChange(setState));

    return () => {
      window.ethereum.removeListener("accountsChanged", () =>
        handleAccountChange(setState)
      );
      window.ethereum.removeListener("chainChanged", () =>
        handleChainChange(setState)
      );
    };
  }, []);
  

  return (
    <div>
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
      {isLoading && <p>Loading...</p>}

      <Button onClick={handleWallet} label={"Connect Wallet"} />
    </div>
  );
};

export default Wallet;
