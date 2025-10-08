import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTokenOperations, useMarketplaceOperations, useStakingOperations } from '@/hooks/useContracts';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  Loader2, 
  Send, 
  ShoppingCart, 
  Wallet, 
  Lock,
  Unlock,
  Gift,
  TrendingUp,
  Server
} from 'lucide-react';
import { ethers } from 'ethers';

export default function SmartContractActions() {
  const { isConnected, account } = useWeb3();
  const { getBalance, transfer, approve } = useTokenOperations();
  const { rentNode, releasePayment, withdrawEarnings, getUserBalance } = useMarketplaceOperations();
  const { stake, unstake, claimRewards, getStakedBalance, getPendingRewards } = useStakingOperations();
  const { toast } = useToast();

  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    transferTo: '',
    transferAmount: '',
    approveSpender: '',
    approveAmount: '',
    rentNodeId: '',
    rentDuration: '',
    rentCost: '',
    stakeAmount: '',
    unstakeAmount: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const executeTransaction = async (
    action: string,
    fn: () => Promise<ethers.ContractTransactionResponse>
  ) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, [action]: true }));

    try {
      const tx = await fn();
      toast({
        title: "Transaction Submitted",
        description: `Transaction hash: ${tx.hash.slice(0, 10)}...`,
      });

      const receipt = await tx.wait();
      toast({
        title: "Transaction Confirmed",
        description: `${action} completed successfully`,
      });
    } catch (error: any) {
      console.error(`${action} failed:`, error);
      toast({
        title: "Transaction Failed",
        description: error.message || `Failed to ${action.toLowerCase()}`,
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Connect your wallet to access smart contract features</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-cyan p-1">
            <Coins className="w-full h-full text-white" />
          </div>
          Smart Contract Actions
        </CardTitle>
        <CardDescription>
          Interact with VeloraCloud smart contracts
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens">Token Operations</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
          </TabsList>

          {/* Token Operations */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Send className="w-4 h-4" />
                Transfer Velora Tokens
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transferTo">Recipient Address</Label>
                  <Input
                    id="transferTo"
                    placeholder="0x..."
                    value={formData.transferTo}
                    onChange={(e) => handleInputChange('transferTo', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transferAmount">Amount (VLR)</Label>
                  <Input
                    id="transferAmount"
                    type="number"
                    placeholder="0.0"
                    value={formData.transferAmount}
                    onChange={(e) => handleInputChange('transferAmount', e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                onClick={() => executeTransaction('Transfer', () => 
                  transfer(formData.transferTo, formData.transferAmount)
                )}
                disabled={loading.Transfer || !formData.transferTo || !formData.transferAmount}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.Transfer ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Transfer Tokens
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                Approve Token Spending
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="approveSpender">Spender Address</Label>
                  <Input
                    id="approveSpender"
                    placeholder="0x..."
                    value={formData.approveSpender}
                    onChange={(e) => handleInputChange('approveSpender', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approveAmount">Amount (VLR)</Label>
                  <Input
                    id="approveAmount"
                    type="number"
                    placeholder="0.0"
                    value={formData.approveAmount}
                    onChange={(e) => handleInputChange('approveAmount', e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                onClick={() => executeTransaction('Approve', () => 
                  approve(formData.approveSpender, formData.approveAmount)
                )}
                disabled={loading.Approve || !formData.approveSpender || !formData.approveAmount}
                variant="outline"
                className="w-full"
              >
                {loading.Approve ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Unlock className="w-4 h-4 mr-2" />
                )}
                Approve Spending
              </Button>
            </div>
          </TabsContent>

          {/* Marketplace Operations */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Server className="w-4 h-4" />
                Rent Node
              </h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rentNodeId">Node ID</Label>
                  <Input
                    id="rentNodeId"
                    placeholder="node-001"
                    value={formData.rentNodeId}
                    onChange={(e) => handleInputChange('rentNodeId', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentDuration">Duration (hours)</Label>
                  <Input
                    id="rentDuration"
                    type="number"
                    placeholder="24"
                    value={formData.rentDuration}
                    onChange={(e) => handleInputChange('rentDuration', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentCost">Total Cost (ETH)</Label>
                  <Input
                    id="rentCost"
                    type="number"
                    placeholder="0.1"
                    value={formData.rentCost}
                    onChange={(e) => handleInputChange('rentCost', e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                onClick={() => executeTransaction('RentNode', () => 
                  rentNode(formData.rentNodeId, parseInt(formData.rentDuration), formData.rentCost)
                )}
                disabled={loading.RentNode || !formData.rentNodeId || !formData.rentDuration || !formData.rentCost}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.RentNode ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4 mr-2" />
                )}
                Rent Node
              </Button>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => executeTransaction('WithdrawEarnings', withdrawEarnings)}
                disabled={loading.WithdrawEarnings}
                variant="outline"
              >
                {loading.WithdrawEarnings ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wallet className="w-4 h-4 mr-2" />
                )}
                Withdraw Earnings
              </Button>
              
              <Button
                onClick={() => executeTransaction('ReleasePayment', () => 
                  releasePayment('order-id-here') // You'd get this from context
                )}
                disabled={loading.ReleasePayment}
                variant="outline"
              >
                {loading.ReleasePayment ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Release Payment
              </Button>
            </div>
          </TabsContent>

          {/* Staking Operations */}
          <TabsContent value="staking" className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Stake Velora Tokens
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="stakeAmount">Amount to Stake (INDO)</Label>
                <Input
                  id="stakeAmount"
                  type="number"
                  placeholder="100.0"
                  value={formData.stakeAmount}
                  onChange={(e) => handleInputChange('stakeAmount', e.target.value)}
                />
              </div>
              
              <Button
                onClick={() => executeTransaction('Stake', () => 
                  stake(formData.stakeAmount)
                )}
                disabled={loading.Stake || !formData.stakeAmount}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.Stake ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4 mr-2" />
                )}
                Stake Tokens
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                Unstake Velora Tokens
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="unstakeAmount">Amount to Unstake (INDO)</Label>
                <Input
                  id="unstakeAmount"
                  type="number"
                  placeholder="50.0"
                  value={formData.unstakeAmount}
                  onChange={(e) => handleInputChange('unstakeAmount', e.target.value)}
                />
              </div>
              
              <Button
                onClick={() => executeTransaction('Unstake', () => 
                  unstake(formData.unstakeAmount)
                )}
                disabled={loading.Unstake || !formData.unstakeAmount}
                variant="outline"
                className="w-full"
              >
                {loading.Unstake ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Unlock className="w-4 h-4 mr-2" />
                )}
                Unstake Tokens
              </Button>
            </div>

            <Separator />

            <Button
              onClick={() => executeTransaction('ClaimRewards', claimRewards)}
              disabled={loading.ClaimRewards}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
            >
              {loading.ClaimRewards ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Gift className="w-4 h-4 mr-2" />
              )}
              Claim Staking Rewards
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}