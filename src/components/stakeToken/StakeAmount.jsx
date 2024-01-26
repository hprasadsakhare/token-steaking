import { useContext, useRef, useState } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import Button from "../button/Button";
const StakeAmount = () => {
  const { stakingContract } = useContext(Web3Context);
  const stakeTokenRef = useRef();

  const [transactionStatus, setTransactionStatus] = useState("");

  const stakeToken = async (event) => {
    event.preventDefault();
    const amount = stakeTokenRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      alert("Please Enter Valid Amount");
      return;
    }

    const amountToStake = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakingContract.stake(amountToStake);
      setTransactionStatus("Transaction is in Pending...");

      const receipt = await transaction.wait();

      if (receipt.status === 1) {
        setTransactionStatus("Transaction Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        stakeTokenRef.current.value = "";
      } else {
        setTransactionStatus("Transaction Failed");
      }
    } catch (error) {
      console.error("Error staking token:", error);
    }
  };
  return (
    <div>
      {transactionStatus && <div>{transactionStatus}</div>}
      <form onSubmit={stakeToken} action="">
        <label htmlFor="">Token Staked:</label>
        <input
          className="border-green-900 text-gray-400"
          type="text"
          ref={stakeTokenRef}
        />
        <Button
          className="border-black text-blue-600"
          onClick={stakeToken}
          type="submit"
          value="Token Approve"
          label={"Stake token"}
        />
      </form>
    </div>
  );
};

export default StakeAmount;
