import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useTokenOperations, useMarketplaceOperations, useStakingOperations } from '@/hooks/useContracts';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, Loader2, Send, ShoppingCart, Wallet, Lock,
  Unlock, Gift, Server
} from 'lucide-react';
import { ethers } from 'ethers';

export default function SmartContractActions() {
  const { isConnected, account, provider } = useWeb3();
  const { getBalance, transfer, approve } = useTokenOperations();
  const { rentNode, releasePayment, withdrawEarnings } = useMarketplaceOperations();
  const { stake, unstake, claimRewards, getStakedBalance } = useStakingOperations();
  const { toast } = useToast();

  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [balances, setBalances] = useState({
    token: '0',
    staked: '0',
  });
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

  const refreshBalances = async () => {
    if (!account) return;
    try {
      const tokenBal = await getBalance(account);
      const stakedBal = await getStakedBalance(account);
      setBalances({
        token: ethers.formatUnits(tokenBal, 18),
        staked: ethers.formatUnits(stakedBal, 18),
      });
    } catch (err) {
      console.error("Failed to refresh balances:", err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      refreshBalances();
    }
  }, [isConnected]);

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
        description: (
          <a 
            href={`https://etherscan.io/tx/${tx.hash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline"
          >
            View on Explorer
          </a>
        ),
      });

      await tx.wait();

      toast({
        title: "Transaction Confirmed",
        description: `${action} completed successfully`,
      });

      await refreshBalances();
    } catch (error: any) {
      console.error(`${action} failed:`, error);
      toast({
        title: "Transaction Failed",
        description: error.reason || error.message || `Failed to ${action.toLowerCase()}`,
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  };

  // --- Helper untuk validasi address & amount ---
  const safeAddress = (addr: string) => ethers.isAddress(addr) ? addr : null;
  const safeAmount = (amt: string) => amt ? ethers.parseUnits(amt, 18) : null;

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
          Token Balance: {balances.token} INDO | Staked: {balances.staked} INDO
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
            {/* Transfer */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Send className="w-4 h-4" /> Transfer INDO Tokens
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Recipient 0x..."
                  value={formData.transferTo}
                  onChange={(e) => handleInputChange('transferTo', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.transferAmount}
                  onChange={(e) => handleInputChange('transferAmount', e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  const addr = safeAddress(formData.transferTo);
                  const amt = safeAmount(formData.transferAmount);
                  if (!addr || !amt) {
                    toast({ title: "Invalid Input", description: "Check address/amount", variant: "destructive" });
                    return;
                  }
                  return executeTransaction('Transfer', () => transfer(addr, amt));
                }}
                disabled={loading.Transfer}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.Transfer ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Transfer Tokens
              </Button>
            </div>

            <Separator />

            {/* Approve */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Unlock className="w-4 h-4" /> Approve Token Spending
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Spender 0x..."
                  value={formData.approveSpender}
                  onChange={(e) => handleInputChange('approveSpender', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.approveAmount}
                  onChange={(e) => handleInputChange('approveAmount', e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  const addr = safeAddress(formData.approveSpender);
                  const amt = safeAmount(formData.approveAmount);
                  if (!addr || !amt) {
                    toast({ title: "Invalid Input", description: "Check spender/amount", variant: "destructive" });
                    return;
                  }
                  return executeTransaction('Approve', () => approve(addr, amt));
                }}
                disabled={loading.Approve}
                variant="outline"
                className="w-full"
              >
                {loading.Approve ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Unlock className="w-4 h-4 mr-2" />}
                Approve Spending
              </Button>
            </div>
          </TabsContent>

          {/* Marketplace */}
          <TabsContent value="marketplace" className="space-y-6">
            {/* Rent Node */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Server className="w-4 h-4" /> Rent Node
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Node ID" value={formData.rentNodeId} onChange={(e) => handleInputChange('rentNodeId', e.target.value)} />
                <Input type="number" placeholder="Hours" value={formData.rentDuration} onChange={(e) => handleInputChange('rentDuration', e.target.value)} />
                <Input type="number" placeholder="Cost ETH" value={formData.rentCost} onChange={(e) => handleInputChange('rentCost', e.target.value)} />
              </div>
              <Button
                onClick={() => executeTransaction('RentNode', () =>
                  rentNode(formData.rentNodeId, parseInt(formData.rentDuration), formData.rentCost)
                )}
                disabled={loading.RentNode}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.RentNode ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShoppingCart className="w-4 h-4 mr-2" />}
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
                {loading.WithdrawEarnings ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wallet className="w-4 h-4 mr-2" />}
                Withdraw Earnings
              </Button>
              <Button
                onClick={() => executeTransaction('ReleasePayment', () => releasePayment('order-id-here'))}
                disabled={loading.ReleasePayment}
                variant="outline"
              >
                {loading.ReleasePayment ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Release Payment
              </Button>
            </div>
          </TabsContent>

          {/* Staking */}
          <TabsContent value="staking" className="space-y-6">
            {/* Stake */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" /> Stake INDO Tokens
              </h4>
              <Input
                type="number"
                placeholder="Amount"
                value={formData.stakeAmount}
                onChange={(e) => handleInputChange('stakeAmount', e.target.value)}
              />
              <Button
                onClick={() => {
                  const amt = safeAmount(formData.stakeAmount);
                  if (!amt) {
                    toast({ title: "Invalid Amount", description: "Enter valid number", variant: "destructive" });
                    return;
                  }
                  return executeTransaction('Stake', () => stake(amt));
                }}
                disabled={loading.Stake}
                className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              >
                {loading.Stake ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                Stake Tokens
              </Button>
            </div>

            <Separator />

            {/* Unstake */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Unlock className="w-4 h-4" /> Unstake INDO Tokens
              </h4>
              <Input
                type="number"
                placeholder="Amount"
                value={formData.unstakeAmount}
                onChange={(e) => handleInputChange('unstakeAmount', e.target.value)}
              />
              <Button
                onClick={() => {
                  const amt = safeAmount(formData.unstakeAmount);
                  if (!amt) {
                    toast({ title: "Invalid Amount", description: "Enter valid number", variant: "destructive" });
                    return;
                  }
                  return executeTransaction('Unstake', () => unstake(amt));
                }}
                disabled={loading.Unstake}
                variant="outline"
                className="w-full"
              >
                {loading.Unstake ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Unlock className="w-4 h-4 mr-2" />}
                Unstake Tokens
              </Button>
            </div>

            <Separator />

            {/* Claim Rewards */}
            <Button
              onClick={() => executeTransaction('ClaimRewards', claimRewards)}
              disabled={loading.ClaimRewards}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
            >
              {loading.ClaimRewards ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Gift className="w-4 h-4 mr-2" />}
              Claim Staking Rewards
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
               }
