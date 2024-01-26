import React, { useContext, useRef, useState } from "react";
import Button from "../button/Button";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";

const TokenApproval = () => {
  const { stakeTokenContract, stakingContract } =
    useContext(Web3Context);

  const approvedTokenRef = useRef();

  const [transactionStatus, setTransactionStatus] = useState("");
  
  const approveToken = async (event) => {
    event.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      alert("Please Enter Valid Amount");
      return;
    }
    const amountToSend = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakeTokenContract.approve(
        stakingContract.target,
        amountToSend
      );
      setTransactionStatus("Transaction is in Pending...");

      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        setTransactionStatus("Transaction Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        approvedTokenRef.current.value = "";
      } else {
        setTransactionStatus("Transaction Failed");
      }
    } catch (error) {
      console.error("Error approving token:", error);
    }
  };

  return (
    <div>
      {transactionStatus && <div>{transactionStatus}</div>}
      <form onSubmit={approveToken} action="">
        <label htmlFor="">Token Approval:</label>
        <input
          className="border-green-900 text-gray-400"
          type="text"
          ref={approvedTokenRef}
        />
        <Button
          className="border-black text-blue-600"
          onClick={approveToken}
          type="submit"
          value="Token Approve"
          label={"Approve"}
        />
      </form>
    </div>
  );
};

export default TokenApproval;
