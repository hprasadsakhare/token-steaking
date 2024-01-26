import React from "react";
import { Contract, ethers } from "ethers";
import stakingABI from "../ABI/stakingABI.json";
import stakeTokenABI from "../ABI/stakeTokenABI.json";

export const ConnectWallet = async () => {
  try {
    let [signer, provider, stakingContract, stakeTokenContract, chainId] = [
      null,
    ];

    if (window.ethereum === null) {
      throw new Error("Please install Metamask");
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    let chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });
    chainId = parseInt(chainIdHex, 16);

    let selectedAccounts = accounts[0];
    if (!selectedAccounts) {
      throw new Error("No Ethereum Wallet connected");
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const stakingContractAddress = "0x03529d47b189a19951f5bce9ec88df25aced925e";
    const stakeTokenContractAddress =
      "0xe7490cb83290cbc9d97a5b9372e1bbd8c7c1296a";

    stakingContract = new Contract(stakingContractAddress, stakingABI, signer);
    stakeTokenContract = new Contract(
      stakeTokenContractAddress,
      stakeTokenABI,
      signer
    );
  

    return {
      provider,
      selectedAccounts,
      stakeTokenContract,
      stakingContract,
      chainId,
    };

  } catch (error) {
    console.error(error);
    throw error;
  }
};
