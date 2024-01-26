import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";

const EarnedReward = () => {
  const { stakingContract, selectedAccounts } = useContext(Web3Context);
  const [earnedReward, setEarnedReward] = useState("0");

  // useeffect
  useEffect(() => {
    const fetchEarnedReward = async () => {
      try {
        const rewardWei = await stakingContract.earned(selectedAccounts);
        const rewardEth = ethers
          .formatUnits(rewardWei, 18)
          .toString();
        const roundedReward = parseFloat(rewardEth).toFixed(2);
        setEarnedReward(roundedReward);
      } catch (error) {
        console.error("Error fetching earned reward:", error);
      }
    };
    stakingContract && fetchEarnedReward();
  }, [stakingContract, selectedAccounts]);
  return (
    <div>
      <p>Earned Reward: {earnedReward}</p>
    </div>
  );
};

export default EarnedReward;
