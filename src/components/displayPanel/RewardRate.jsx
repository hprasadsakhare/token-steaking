import React, { useEffect, useContext, useState } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";

const RewardRate = () => {
  const { stakingContract, selectedAccounts } = useContext(Web3Context);
  const [rewardRate, setRewardRate] = useState("0");

  // useeffect
  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        const rewardRateWei = await stakingContract.REWARD_RATE();
        const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);
        setRewardRate(rewardRateEth);
      } catch (error) {
        console.error("Error fetching reward rate:", error);
      }
    };
    stakingContract && fetchRewardRate();
  }, [stakingContract, selectedAccounts]);

  return (
    <div>
      <p>Reward Rate: {rewardRate} token /seconds</p>
    </div>
  );
};

export default RewardRate;
