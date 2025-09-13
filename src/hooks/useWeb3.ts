import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from './use-toast';

interface Web3State {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isLoading: boolean;
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    provider: null,
    signer: null,
    account: null,
    chainId: null,
    isConnected: false,
    isLoading: false,
  });
  
  const { toast } = useToast();

  const connectWallet = useCallback(async () => {
    setWeb3State(prev => ({ ...prev, isLoading: true }));
    
    try {
      const ethereumProvider = await detectEthereumProvider();
      
      if (!ethereumProvider) {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        return;
      }

      // Request account access
      const accounts = await (ethereumProvider as any).request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        toast({
          title: "No Accounts",
          description: "Please connect at least one account in MetaMask",
          variant: "destructive",
        });
        return;
      }

      // Create provider and signer
      const provider = new ethers.BrowserProvider(ethereumProvider as any);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      setWeb3State({
        provider,
        signer,
        account: accounts[0],
        chainId: Number(network.chainId),
        isConnected: true,
        isLoading: false,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });

    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      
      setWeb3State(prev => ({ 
        ...prev, 
        isLoading: false,
        isConnected: false 
      }));
    }
  }, [toast]);

  const disconnectWallet = useCallback(() => {
    setWeb3State({
      provider: null,
      signer: null,
      account: null,
      chainId: null,
      isConnected: false,
      isLoading: false,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, [toast]);

  const switchNetwork = useCallback(async (chainId: number) => {
    if (!web3State.provider) return;

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        toast({
          title: "Network Not Added",
          description: "Please add this network to your MetaMask",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Switch Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  }, [web3State.provider, toast]);

  // Listen for account and network changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setWeb3State(prev => ({
          ...prev,
          account: accounts[0],
        }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWeb3State(prev => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }));
    };

    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [disconnectWallet]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        const accounts = await (ethereumProvider as any).request({
          method: 'eth_accounts',
        });
        
        if (accounts.length > 0) {
          connectWallet();
        }
      }
    };

    autoConnect();
  }, []);

  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
};