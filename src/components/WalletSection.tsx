import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Coins, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
  Zap,
  Shield
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock transaction data
const transactions = [
  {
    id: 1,
    type: "earned",
    amount: "+127.8 VLR",
    usd: "+$291.34",
    description: "Node Storage Rewards",
    timestamp: "2 hours ago",
    hash: "0xa1b2c3d4..."
  },
  {
    id: 2,
    type: "spent",
    amount: "-45.2 VLR",
    usd: "-$103.16", 
    description: "Compute Rental Payment",
    timestamp: "5 hours ago",
    hash: "0xe5f6g7h8..."
  },
  {
    id: 3,
    type: "earned",
    amount: "+89.5 VLR",
    usd: "+$204.27",
    description: "File Storage Revenue", 
    timestamp: "1 day ago",
    hash: "0xi9j0k1l2..."
  }
];

export default function WalletSection() {
  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 border-accent/30">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
                  1,250.45 VLR
                </p>
                <p className="text-lg text-muted-foreground">≈ $2,847.32 USD</p>
              </div>
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">+12.4% (24h)</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Receive
              </Button>
              <Button variant="outline" className="border-accent/50">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button variant="outline" className="border-accent/50">
                <ExternalLink className="w-4 h-4 mr-2" />
                Buy VLR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Connection */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="w-5 h-5 text-cyber-purple" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-accent/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">MetaMask</span>
                <Badge variant="secondary" className="bg-success/20 text-success">Connected</Badge>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                  0xa1b2...c3d4
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span>Polygon Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Price:</span>
                <span className="text-cyber-cyan">23 GWEI</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20">
                <Coins className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                <p className="text-xl font-bold">847.2 VLR</p>
                <div className="flex items-center gap-1 text-success text-xs">
                  <TrendingUp className="w-3 h-3" />
                  +23.4%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20">
                <Zap className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Staked Amount</p>
                <p className="text-xl font-bold">500.0 VLR</p>
                <p className="text-xs text-cyber-cyan">12% APY</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/20">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rewards Pending</p>
                <p className="text-xl font-bold">47.3 VLR</p>
                <p className="text-xs text-success">Ready to claim</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-pink/20">
                <TrendingDown className="w-6 h-6 text-cyber-pink" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Spent</p>
                <p className="text-xl font-bold">127.4 VLR</p>
                <div className="flex items-center gap-1 text-cyber-pink text-xs">
                  <TrendingDown className="w-3 h-3" />
                  -8.7%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions & Staking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Recent Transactions
              </span>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className={`p-2 rounded-full ${
                  tx.type === 'earned' 
                    ? 'bg-success/20' 
                    : 'bg-cyber-purple/20'
                }`}>
                  {tx.type === 'earned' ? (
                    <ArrowDownLeft className="w-4 h-4 text-success" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-cyber-purple" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-sm">{tx.description}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground">{tx.hash}</code>
                    <Button variant="ghost" size="icon" className="h-4 w-4">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold ${
                    tx.type === 'earned' ? 'text-success' : 'text-cyber-purple'
                  }`}>
                    {tx.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.usd}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Staking Panel */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyber-purple" />
              Velora Staking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-cyber-purple/10 to-cyber-cyan/10 border border-accent/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Currently Staked</p>
                  <p className="text-2xl font-bold">500.0 VLR</p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  12% APY
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Earn rewards by securing the network. Minimum stake: 100 VLR
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rewards Earned:</span>
                <span className="font-medium text-success">47.3 VLR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unbonding Period:</span>
                <span className="font-medium">7 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Reward:</span>
                <span className="font-medium text-cyber-cyan">2.1 VLR (6h)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
                Stake More
              </Button>
              <Button variant="outline" className="border-accent/50">
                Claim Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}