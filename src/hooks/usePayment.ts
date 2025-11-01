import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { useContracts } from './useContracts';
import { toast } from '@/hooks/use-toast';

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { account, signer } = useWeb3();
  const { bataraToken, nodeMarketplace } = useContracts();

  const processNodePayment = async (
    nodeId: string,
    pricePerHour: number,
    totalHours: number
  ): Promise<PaymentResult> => {
    if (!account || !signer) {
      return { success: false, error: 'Wallet not connected' };
    }

    if (!bataraToken || !nodeMarketplace) {
      return { success: false, error: 'Contracts not initialized' };
    }

    setIsProcessing(true);

    try {
      const totalPrice = ethers.parseEther((pricePerHour * totalHours).toString());
      
      // Step 1: Approve token spending
      toast({
        title: "Approving payment...",
        description: "Please confirm the token approval in your wallet.",
      });

      const approveTx = await bataraToken.approve(
        await nodeMarketplace.getAddress(),
        totalPrice
      );
      
      await approveTx.wait();

      // Step 2: Rent the node
      toast({
        title: "Processing payment...",
        description: "Please confirm the rental transaction in your wallet.",
      });

      const rentTx = await nodeMarketplace.rentNode(nodeId, totalHours, {
        value: totalPrice
      });

      const receipt = await rentTx.wait();

      toast({
        title: "Payment successful!",
        description: `Transaction hash: ${receipt.hash}`,
      });

      return {
        success: true,
        transactionHash: receipt.hash
      };

    } catch (error: any) {
      console.error('Payment error:', error);
      
      let errorMessage = 'Payment failed';
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processNodePayment,
    isProcessing
  };
};
