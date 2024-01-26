import React from "react";
import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";

const DisplayPanel = () => {
  return (
    <div>
      <StakedAmount />
      <RewardRate />
      <EarnedReward />
    </div>
  );
};

export default DisplayPanel;
