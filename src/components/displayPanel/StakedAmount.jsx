import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";

const StakedAmount = () => {
  const { stakingContract, selectedAccounts } = useContext(Web3Context);
  const [stakedAmount, setStakedAmount] = useState("0");
  

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStakedWei = await stakingContract.stakedBalance(
          selectedAccounts
        );
        // console.log(amountStaked)
        const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(), 18);
        setStakedAmount(amountStakedEth);
        
      } catch (error) {
        console.error("Error fetching staked balance:", error);
      }
    };
    stakingContract && fetchStakedBalance();
  }, [stakingContract, selectedAccounts]);


  return <div>
    <p>Staked Amount: {stakedAmount}</p>
  </div>;
};

export default StakedAmount;
