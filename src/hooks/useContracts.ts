import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import {
  BATARA_TOKEN_ABI,
  NODE_MARKETPLACE_ABI,
  STORAGE_ESCROW_ABI,
  STAKING_CONTRACT_ABI,
  CONTRACT_ADDRESSES,
} from '@/contracts/abis';

export const useContracts = () => {
  const { provider, signer, isConnected } = useWeb3();

  const contracts = useMemo(() => {
    if (!provider || !signer || !isConnected) {
      return {
        bataraToken: null,
        nodeMarketplace: null,
        storageEscrow: null,
        stakingContract: null,
      };
    }

    return {
      bataraToken: new ethers.Contract(
        CONTRACT_ADDRESSES.BATARA_TOKEN,
        BATARA_TOKEN_ABI,
        signer
      ),
      nodeMarketplace: new ethers.Contract(
        CONTRACT_ADDRESSES.NODE_MARKETPLACE,
        NODE_MARKETPLACE_ABI,
        signer
      ),
      storageEscrow: new ethers.Contract(
        CONTRACT_ADDRESSES.STORAGE_ESCROW,
        STORAGE_ESCROW_ABI,
        signer
      ),
      stakingContract: new ethers.Contract(
        CONTRACT_ADDRESSES.STAKING_CONTRACT,
        STAKING_CONTRACT_ABI,
        signer
      ),
    };
  }, [provider, signer, isConnected]);

  return contracts;
};

// Hook for token operations
export const useTokenOperations = () => {
  const { bataraToken } = useContracts();
  const { account } = useWeb3();

  const getBalance = async (address?: string): Promise<string> => {
    if (!bataraToken) throw new Error('Contract not initialized');
    const targetAddress = address || account;
    if (!targetAddress) throw new Error('No address provided');
    
    const balance = await bataraToken.balanceOf(targetAddress);
    return ethers.formatEther(balance);
  };

  const transfer = async (to: string, amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!bataraToken) throw new Error('Contract not initialized');
    const amountWei = ethers.parseEther(amount);
    return await bataraToken.transfer(to, amountWei);
  };

  const approve = async (spender: string, amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!bataraToken) throw new Error('Contract not initialized');
    const amountWei = ethers.parseEther(amount);
    return await bataraToken.approve(spender, amountWei);
  };

  const getAllowance = async (owner: string, spender: string): Promise<string> => {
    if (!bataraToken) throw new Error('Contract not initialized');
    const allowance = await bataraToken.allowance(owner, spender);
    return ethers.formatEther(allowance);
  };

  return {
    getBalance,
    transfer,
    approve,
    getAllowance,
  };
};

// Hook for marketplace operations
export const useMarketplaceOperations = () => {
  const { nodeMarketplace } = useContracts();

  const createNode = async (
    nodeId: string,
    pricePerHour: string,
    specs: string
  ): Promise<ethers.ContractTransactionResponse> => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    const priceWei = ethers.parseEther(pricePerHour);
    return await nodeMarketplace.createNode(nodeId, priceWei, specs);
  };

  const rentNode = async (
    nodeId: string,
    duration: number,
    totalCost: string
  ): Promise<ethers.ContractTransactionResponse> => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    const costWei = ethers.parseEther(totalCost);
    return await nodeMarketplace.rentNode(nodeId, duration, { value: costWei });
  };

  const releasePayment = async (orderId: string): Promise<ethers.ContractTransactionResponse> => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    return await nodeMarketplace.releasePayment(orderId);
  };

  const withdrawEarnings = async (): Promise<ethers.ContractTransactionResponse> => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    return await nodeMarketplace.withdrawEarnings();
  };

  const getNodeInfo = async (nodeId: string) => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    return await nodeMarketplace.getNodeInfo(nodeId);
  };

  const getUserBalance = async (address: string): Promise<string> => {
    if (!nodeMarketplace) throw new Error('Contract not initialized');
    const balance = await nodeMarketplace.getUserBalance(address);
    return ethers.formatEther(balance);
  };

  return {
    createNode,
    rentNode,
    releasePayment,
    withdrawEarnings,
    getNodeInfo,
    getUserBalance,
  };
};

// Hook for staking operations
export const useStakingOperations = () => {
  const { stakingContract } = useContracts();

  const stake = async (amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error('Contract not initialized');
    const amountWei = ethers.parseEther(amount);
    return await stakingContract.stake(amountWei);
  };

  const unstake = async (amount: string): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error('Contract not initialized');
    const amountWei = ethers.parseEther(amount);
    return await stakingContract.unstake(amountWei);
  };

  const claimRewards = async (): Promise<ethers.ContractTransactionResponse> => {
    if (!stakingContract) throw new Error('Contract not initialized');
    return await stakingContract.claimRewards();
  };

  const getStakedBalance = async (address: string): Promise<string> => {
    if (!stakingContract) throw new Error('Contract not initialized');
    const balance = await stakingContract.getStakedBalance(address);
    return ethers.formatEther(balance);
  };

  const getPendingRewards = async (address: string): Promise<string> => {
    if (!stakingContract) throw new Error('Contract not initialized');
    const rewards = await stakingContract.getPendingRewards(address);
    return ethers.formatEther(rewards);
  };

  const getStakingInfo = async () => {
    if (!stakingContract) throw new Error('Contract not initialized');
    return await stakingContract.getStakingInfo();
  };

  return {
    stake,
    unstake,
    claimRewards,
    getStakedBalance,
    getPendingRewards,
    getStakingInfo,
  };
};