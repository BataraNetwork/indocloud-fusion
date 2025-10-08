import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import WalletConnect from "@/components/web3/WalletConnect";
import SmartContractActions from "@/components/web3/SmartContractActions";
import ContractEventListener from "@/components/web3/ContractEventListener";
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
  Shield,
  Clock,
  Send,
  QrCode,
  History,
  Settings,
  Lock,
  Unlock,
  RefreshCw
} from "lucide-react";

// Enhanced transaction data with more details
const transactions = [
  {
    id: 1,
    type: "earned",
    category: "storage_reward",
    amount: "+127.8 VLR",
    usd: "+$291.34",
    description: "Node Storage Rewards",
    timestamp: "2 hours ago",
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcd",
    status: "confirmed",
    blockNumber: 2847291,
    gasUsed: "21000",
    nodeId: "Jakarta-Node-Pro"
  },
  {
    id: 2,
    type: "spent",
    category: "compute_rental",
    amount: "-45.2 VLR",
    usd: "-$103.16", 
    description: "GPU Compute Rental Payment",
    timestamp: "5 hours ago",
    hash: "0xe5f6g7h8i9j0123456789012345678901234567890",
    status: "confirmed",
    blockNumber: 2847285,
    gasUsed: "65000",
    nodeId: "AI-Cluster-ID"
  },
  {
    id: 3,
    type: "earned",
    category: "file_storage",
    amount: "+89.5 VLR",
    usd: "+$204.27",
    description: "IPFS File Storage Revenue", 
    timestamp: "1 day ago",
    hash: "0xi9j0k1l2m3n4567890123456789012345678901234",
    status: "confirmed",
    blockNumber: 2847201,
    gasUsed: "42000",
    nodeId: "Singapore-Ultra"
  },
  {
    id: 4,
    type: "staking",
    category: "stake_reward",
    amount: "+12.3 VLR",
    usd: "+$28.05",
    description: "Staking Rewards",
    timestamp: "2 days ago",
    hash: "0xm3n4o5p6q7r8901234567890123456789012345678",
    status: "confirmed",
    blockNumber: 2847089,
    gasUsed: "35000",
    nodeId: null
  }
];

const stakingOptions = [
  {
    duration: "7 days",
    apy: "8%",
    minAmount: 100,
    risk: "Low",
    color: "cyber-green"
  },
  {
    duration: "30 days",
    apy: "12%",
    minAmount: 250,
    risk: "Medium",
    color: "cyber-cyan"
  },
  {
    duration: "90 days",
    apy: "18%",
    minAmount: 500,
    risk: "Medium",
    color: "cyber-purple"
  },
  {
    duration: "365 days",
    apy: "25%",
    minAmount: 1000,
    risk: "High",
    color: "cyber-pink"
  }
];

const EnhancedWalletSection = () => {
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [selectedStaking, setSelectedStaking] = useState(1);

  const getTransactionIcon = (type: string, category: string) => {
    switch (category) {
      case 'storage_reward':
      case 'file_storage':
        return <Shield className="w-4 h-4 text-cyber-green" />;
      case 'compute_rental':
        return <Zap className="w-4 h-4 text-cyber-purple" />;
      case 'stake_reward':
        return <Coins className="w-4 h-4 text-cyber-cyan" />;
      default:
        return type === 'earned' ? 
          <ArrowDownLeft className="w-4 h-4 text-cyber-green" /> : 
          <ArrowUpRight className="w-4 h-4 text-cyber-purple" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-cyber-green/20 text-cyber-green';
      case 'pending': return 'bg-cyber-orange/20 text-cyber-orange';
      case 'failed': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
            Velora Wallet & Smart Contracts
          </h2>
          <p className="text-muted-foreground">Manage your tokens and blockchain interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Web3 Enabled
          </Badge>
        </div>
      </div>

      {/* Web3 Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WalletConnect />
        <ContractEventListener />
      </div>

      <SmartContractActions />

      {/* Enhanced Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Balance Card */}
        <Card className="lg:col-span-2 glass-card animated-border">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                <p className="text-5xl font-bold gradient-cosmic mb-2">
                  1,250.45 VLR
                </p>
                <p className="text-xl text-muted-foreground mb-4">≈ $2,847.32 USD</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-cyber-green">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">+12.4% (24h)</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: <span className="text-cyber-cyan">2 mins ago</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button variant="ghost" size="icon" className="mb-2">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <div className="text-xs text-muted-foreground">
                  <div>Network: Polygon</div>
                  <div className="text-cyber-green">• Online</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-cyber-green to-cyber-cyan hover:opacity-90 glow-cyber">
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Receive
              </Button>
              <Button className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:opacity-90">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button variant="outline" className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10">
                <ExternalLink className="w-4 h-4 mr-2" />
                Buy VLR
              </Button>
              <Button variant="outline" className="border-cyber-purple/50 text-cyber-purple hover:bg-cyber-purple/10">
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Wallet Connection */}
        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="w-5 h-5 text-cyber-purple" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg glass border border-cyber-green/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">MetaMask</span>
                <Badge variant="secondary" className="bg-cyber-green/20 text-cyber-green">
                  <div className="w-2 h-2 bg-cyber-green rounded-full mr-1 pulse-glow"></div>
                  Connected
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono flex-1">
                  0xa1b2c3d4e5f6789012345678
                </code>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Network:</span>
                  <div className="font-medium">Polygon Mainnet</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Gas Price:</span>
                  <div className="font-medium text-cyber-cyan">23 GWEI</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full border-cyber-purple/50">
                <Settings className="w-4 h-4 mr-2" />
                Wallet Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full border-cyber-cyan/50">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20 glow-cyber">
                <Coins className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                <p className="text-xl font-bold text-cyber-purple">847.2 VLR</p>
                <div className="flex items-center gap-1 text-cyber-green text-xs">
                  <TrendingUp className="w-3 h-3" />
                  +23.4% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20 glow-neon">
                <Lock className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Staked Amount</p>
                <p className="text-xl font-bold text-cyber-cyan">500.0 VLR</p>
                <p className="text-xs text-cyber-cyan">18% APY • 30 days lock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-green/20">
                <Shield className="w-6 h-6 text-cyber-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rewards Pending</p>
                <p className="text-xl font-bold text-cyber-green">47.3 VLR</p>
                <p className="text-xs text-cyber-green">Auto-claim in 2h 15m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-pink/20">
                <TrendingDown className="w-6 h-6 text-cyber-pink" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Spent</p>
                <p className="text-xl font-bold text-cyber-pink">127.4 VLR</p>
                <div className="flex items-center gap-1 text-cyber-green text-xs">
                  <TrendingDown className="w-3 h-3" />
                  -8.7% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content Tabs */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="send">Send/Receive</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Transaction History
                </span>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 p-4 rounded-lg glass hover:bg-muted/10 transition-all hover-lift">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'earned' ? 'bg-cyber-green/20' : 
                    tx.type === 'staking' ? 'bg-cyber-cyan/20' : 'bg-cyber-purple/20'
                  }`}>
                    {getTransactionIcon(tx.type, tx.category)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{tx.description}</p>
                      <Badge variant="secondary" className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{tx.timestamp}</span>
                      <code>{tx.hash.slice(0, 12)}...{tx.hash.slice(-8)}</code>
                      <span>Block #{tx.blockNumber}</span>
                      {tx.nodeId && <span>Node: {tx.nodeId}</span>}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      tx.type === 'earned' || tx.type === 'staking' ? 'text-cyber-green' : 'text-cyber-purple'
                    }`}>
                      {tx.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.usd}</p>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="mt-6">
          <div className="space-y-6">
            {/* Current Staking */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-cyber-cyan" />
                  Current Staking Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg glass border border-cyber-cyan/30">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Staked Amount</p>
                      <p className="text-2xl font-bold text-cyber-cyan">500.0 VLR</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current APY</p>
                      <p className="text-2xl font-bold text-cyber-green">18%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Earned Rewards</p>
                      <p className="text-2xl font-bold text-cyber-purple">47.3 VLR</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unlock Date</p>
                      <p className="text-lg font-bold">Dec 15, 2024</p>
                      <p className="text-xs text-muted-foreground">23 days remaining</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Lock Period Progress</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button className="bg-gradient-to-r from-cyber-green to-cyber-cyan hover:opacity-90">
                      <Coins className="w-4 h-4 mr-2" />
                      Claim Rewards
                    </Button>
                    <Button variant="outline" className="border-cyber-purple/50">
                      Add to Stake
                    </Button>
                    <Button variant="outline" className="border-destructive/50 text-destructive">
                      <Unlock className="w-4 h-4 mr-2" />
                      Emergency Unstake
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Staking Options */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Available Staking Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stakingOptions.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg glass border cursor-pointer transition-all hover-lift ${
                        selectedStaking === index ? `border-${option.color}` : 'border-border'
                      }`}
                      onClick={() => setSelectedStaking(index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{option.duration} Lock</h4>
                          <p className="text-sm text-muted-foreground">Min: {option.minAmount} VLR</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold text-${option.color}`}>{option.apy}</div>
                          <div className="text-xs text-muted-foreground">APY</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`border-${option.color}/30 text-${option.color}`}>
                        {option.risk} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-lg glass border border-cyber-purple/30">
                  <h4 className="font-semibold mb-3">Stake New Amount</h4>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Enter VLR amount..." 
                      className="flex-1"
                    />
                    <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
                      Stake Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="send" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Send Tokens */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-cyber-purple" />
                  Send VLR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                  <Input 
                    placeholder="0x..." 
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount</label>
                  <div className="relative">
                    <Input 
                      placeholder="0.00" 
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      VLR
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Balance: 1,250.45 VLR
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Network Fee:</span>
                    <span>~0.005 MATIC</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span>{sendAmount || '0'} VLR + 0.005 MATIC</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyber-purple to-cyber-pink hover:opacity-90">
                  Send Transaction
                </Button>
              </CardContent>
            </Card>

            {/* Receive Tokens */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownLeft className="w-5 h-5 text-cyber-green" />
                  Receive VLR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-muted/20 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan QR code or copy address below
                  </p>
                  <div className="p-3 rounded-lg bg-muted/20 border">
                    <code className="text-sm break-all">
                      0xa1b2c3d4e5f6789012345678901234567890abcd
                    </code>
                  </div>
                  <Button variant="outline" className="mt-3 w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Address
                  </Button>
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Only send VLR tokens to this address
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Transactions typically confirm in 1-3 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                    <p className="text-muted-foreground">Portfolio analytics coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Rewards</span>
                    <span className="font-medium text-cyber-green">427.3 VLR (50.4%)</span>
                  </div>
                  <Progress value={50.4} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Staking Rewards</span>
                    <span className="font-medium text-cyber-cyan">298.7 VLR (35.3%)</span>
                  </div>
                  <Progress value={35.3} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">File Storage</span>
                    <span className="font-medium text-cyber-purple">121.2 VLR (14.3%)</span>
                  </div>
                  <Progress value={14.3} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedWalletSection;