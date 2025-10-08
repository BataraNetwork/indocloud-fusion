import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserData } from "@/hooks/useUserData";
import { 
  TrendingUp, 
  Database, 
  Cpu, 
  Network, 
  Coins,
  Upload,
  Download,
  Activity,
  Users,
  Server,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-blockchain.jpg";

export default function Dashboard() {
  const { balance, files, loading } = useUserData();
  
  // Calculate stats from real data
  const totalStorage = files.reduce((acc, file) => acc + file.size_bytes, 0);
  const totalStorageGB = (totalStorage / (1024 * 1024 * 1024)).toFixed(1);
  const activeFiles = files.filter(f => f.status === 'distributed').length;
  const indoBalance = balance?.indo_balance || 0;
  const totalEarned = balance?.total_earned || 0;
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 border border-accent/30">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Blockchain Hero" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative p-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
              Welcome to VeloraCloud
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Your decentralized cloud infrastructure powered by blockchain technology. 
              Store, compute, and scale with complete ownership and zero vendor lock-in.
            </p>
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 transition-opacity">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
              <Button variant="outline" className="border-accent/50 hover:bg-accent/10">
                <Network className="w-4 h-4 mr-2" />
                Browse Nodes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20">
                <Database className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Storage</p>
                <p className="text-2xl font-bold">{totalStorageGB} GB</p>
                <p className="text-xs text-success">{activeFiles} files distributed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20">
                <Cpu className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compute Hours</p>
                <p className="text-2xl font-bold">847</p>
                <p className="text-xs text-cyber-cyan">24 active jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/20">
                <Coins className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">VLR Balance</p>
                <p className="text-2xl font-bold">{indoBalance.toFixed(2)}</p>
                <p className="text-xs text-success">${(indoBalance * 2.28).toFixed(2)} USD</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-pink/20">
                <Network className="w-6 h-6 text-cyber-pink" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">{totalEarned.toFixed(1)}</p>
                <p className="text-xs text-cyber-pink">All-time rewards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyber-purple" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Upload className="w-4 h-4 text-cyber-cyan" />
              <div className="flex-1">
                <p className="text-sm font-medium">File uploaded to IPFS</p>
                <p className="text-xs text-muted-foreground">document.pdf • 2.3 MB • 5 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Server className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium">Compute job completed</p>
                <p className="text-xs text-muted-foreground">ML Model Training • 2.4 VLR earned • 1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Coins className="w-4 h-4 text-cyber-purple" />
              <div className="flex-1">
                <p className="text-sm font-medium">Node reward received</p>
                <p className="text-xs text-muted-foreground">Storage provision • 15.7 VLR • 3 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Health */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyber-cyan" />
              Network Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage Nodes</span>
                <Badge variant="secondary" className="bg-success/20 text-success">2,847 Active</Badge>
              </div>
              <Progress value={94} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Compute Nodes</span>
                <Badge variant="secondary" className="bg-cyber-cyan/20 text-cyber-cyan">1,523 Active</Badge>
              </div>
              <Progress value={87} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Network Latency</span>
                <span className="text-sm text-success">12ms avg</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-cyber-purple/10 to-cyber-cyan/10 border border-accent/30">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-cyber-purple" />
                <span>Network operating at optimal performance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}