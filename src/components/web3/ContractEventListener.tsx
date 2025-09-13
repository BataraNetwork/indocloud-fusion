import { useEffect, useState } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useContracts } from '@/hooks/useContracts';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Server, 
  Lock,
  Gift,
  AlertCircle
} from 'lucide-react';

interface ContractEvent {
  id: string;
  type: 'transfer' | 'node_rented' | 'payment_released' | 'staked' | 'rewards_claimed';
  timestamp: Date;
  data: any;
  txHash: string;
}

export default function ContractEventListener() {
  const { isConnected, account } = useWeb3();
  const { indoToken, nodeMarketplace, stakingContract } = useContracts();
  const { toast } = useToast();
  const [events, setEvents] = useState<ContractEvent[]>([]);

  useEffect(() => {
    if (!isConnected || !account) return;

    const listeners: any[] = [];

    // INDO Token Events
    if (indoToken) {
      const transferFilter = indoToken.filters.Transfer(account);
      const transferToFilter = indoToken.filters.Transfer(null, account);
      
      const handleTransfer = (from: string, to: string, value: bigint, event: any) => {
        const isIncoming = to.toLowerCase() === account.toLowerCase();
        const isOutgoing = from.toLowerCase() === account.toLowerCase();
        
        if (isIncoming || isOutgoing) {
          const newEvent: ContractEvent = {
            id: event.transactionHash + event.logIndex,
            type: 'transfer',
            timestamp: new Date(),
            data: {
              from,
              to,
              value: value.toString(),
              isIncoming,
              isOutgoing
            },
            txHash: event.transactionHash
          };
          
          setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events
          
          toast({
            title: isIncoming ? "Tokens Received" : "Tokens Sent",
            description: `${(Number(value) / 1e18).toFixed(4)} INDO ${isIncoming ? 'received from' : 'sent to'} ${(isIncoming ? from : to).slice(0, 8)}...`,
          });
        }
      };

      indoToken.on(transferFilter, handleTransfer);
      indoToken.on(transferToFilter, handleTransfer);
      listeners.push(() => {
        indoToken.off(transferFilter, handleTransfer);
        indoToken.off(transferToFilter, handleTransfer);
      });
    }

    // Node Marketplace Events
    if (nodeMarketplace) {
      const nodeRentedFilter = nodeMarketplace.filters.NodeRented();
      
      const handleNodeRented = (nodeId: string, renter: string, duration: bigint, totalCost: bigint, event: any) => {
        const newEvent: ContractEvent = {
          id: event.transactionHash + event.logIndex,
          type: 'node_rented',
          timestamp: new Date(),
          data: {
            nodeId,
            renter,
            duration: duration.toString(),
            totalCost: totalCost.toString()
          },
          txHash: event.transactionHash
        };
        
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
        
        if (renter.toLowerCase() === account.toLowerCase()) {
          toast({
            title: "Node Rented",
            description: `Successfully rented node ${nodeId} for ${duration.toString()} hours`,
          });
        }
      };

      nodeMarketplace.on(nodeRentedFilter, handleNodeRented);
      listeners.push(() => nodeMarketplace.off(nodeRentedFilter, handleNodeRented));
    }

    // Staking Events
    if (stakingContract) {
      const stakedFilter = stakingContract.filters.Staked(account);
      const unstakedFilter = stakingContract.filters.Unstaked(account);
      const rewardsClaimedFilter = stakingContract.filters.RewardsClaimed(account);

      const handleStaked = (user: string, amount: bigint, event: any) => {
        const newEvent: ContractEvent = {
          id: event.transactionHash + event.logIndex,
          type: 'staked',
          timestamp: new Date(),
          data: { amount: amount.toString() },
          txHash: event.transactionHash
        };
        
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
        
        toast({
          title: "Tokens Staked",
          description: `Successfully staked ${(Number(amount) / 1e18).toFixed(4)} INDO`,
        });
      };

      const handleRewardsClaimed = (user: string, amount: bigint, event: any) => {
        const newEvent: ContractEvent = {
          id: event.transactionHash + event.logIndex,
          type: 'rewards_claimed',
          timestamp: new Date(),
          data: { amount: amount.toString() },
          txHash: event.transactionHash
        };
        
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
        
        toast({
          title: "Rewards Claimed",
          description: `Claimed ${(Number(amount) / 1e18).toFixed(4)} INDO in staking rewards`,
        });
      };

      stakingContract.on(stakedFilter, handleStaked);
      stakingContract.on(rewardsClaimedFilter, handleRewardsClaimed);
      listeners.push(() => {
        stakingContract.off(stakedFilter, handleStaked);
        stakingContract.off(rewardsClaimedFilter, handleRewardsClaimed);
      });
    }

    return () => {
      listeners.forEach(cleanup => cleanup());
    };
  }, [isConnected, account, indoToken, nodeMarketplace, stakingContract, toast]);

  const getEventIcon = (type: ContractEvent['type']) => {
    switch (type) {
      case 'transfer':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'node_rented':
        return <Server className="w-4 h-4" />;
      case 'staked':
        return <Lock className="w-4 h-4" />;
      case 'rewards_claimed':
        return <Gift className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getEventDescription = (event: ContractEvent) => {
    switch (event.type) {
      case 'transfer':
        const { value, isIncoming, from, to } = event.data;
        const amount = (Number(value) / 1e18).toFixed(4);
        return `${isIncoming ? 'Received' : 'Sent'} ${amount} INDO ${isIncoming ? 'from' : 'to'} ${(isIncoming ? from : to).slice(0, 8)}...`;
      
      case 'node_rented':
        const { nodeId, duration } = event.data;
        return `Rented node ${nodeId} for ${duration} hours`;
      
      case 'staked':
        const stakedAmount = (Number(event.data.amount) / 1e18).toFixed(4);
        return `Staked ${stakedAmount} INDO tokens`;
      
      case 'rewards_claimed':
        const rewardAmount = (Number(event.data.amount) / 1e18).toFixed(4);
        return `Claimed ${rewardAmount} INDO in rewards`;
      
      default:
        return 'Unknown event';
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Connect wallet to view events</p>
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
            <Activity className="w-full h-full text-white" />
          </div>
          Contract Events
        </CardTitle>
        <CardDescription>
          Real-time blockchain events for your wallet
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-80">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No events yet</p>
              <p className="text-sm text-muted-foreground">Contract events will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                    {getEventIcon(event.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">
                        {getEventDescription(event)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground font-mono">
                      {event.txHash.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}