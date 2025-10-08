import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Globe, 
  Server, 
  Zap, 
  TrendingUp,
  Wifi,
  Database,
  Shield,
  Clock,
  Users
} from "lucide-react";

// Real-time network statistics
const NetworkStats = () => {
  const [stats, setStats] = useState({
    totalNodes: 2847,
    activeNodes: 2731,
    networkUptime: 99.94,
    avgLatency: 12,
    totalStorage: 847.2,
    dataTransferred: 1247.8,
    activeUsers: 15247,
    txPerSecond: 847,
    blockHeight: 2847291,
    networkLoad: 67
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeNodes: prev.totalNodes - Math.floor(Math.random() * 20),
        avgLatency: 8 + Math.floor(Math.random() * 12),
        txPerSecond: 800 + Math.floor(Math.random() * 100),
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3),
        networkLoad: 60 + Math.floor(Math.random() * 20),
        dataTransferred: prev.dataTransferred + (Math.random() * 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Network Statistics</h2>
            <p className="text-muted-foreground">Real-time VeloraCloud network metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyber-green rounded-full pulse-glow"></div>
            <span className="text-sm text-cyber-green font-medium">Live</span>
          </div>
        </div>
        
        {/* Network Health Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-green">{stats.networkUptime}%</div>
            <div className="text-xs text-muted-foreground">Network Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-cyan">{stats.avgLatency}ms</div>
            <div className="text-xs text-muted-foreground">Avg Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-purple">{stats.txPerSecond}</div>
            <div className="text-xs text-muted-foreground">TPS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-pink">{stats.blockHeight.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Block Height</div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Node Status */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server className="w-5 h-5 text-cyber-purple" />
              Node Network
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Nodes</span>
              <div className="text-right">
                <div className="font-bold text-cyber-purple">{stats.activeNodes}</div>
                <div className="text-xs text-muted-foreground">of {stats.totalNodes}</div>
              </div>
            </div>
            <Progress 
              value={(stats.activeNodes / stats.totalNodes) * 100} 
              className="h-2"
            />
            <div className="flex justify-between text-xs">
              <span className="text-cyber-green">●{Math.floor(stats.activeNodes * 0.8)} Storage</span>
              <span className="text-cyber-cyan">●{Math.floor(stats.activeNodes * 0.2)} Compute</span>
            </div>
          </CardContent>
        </Card>

        {/* Storage Metrics */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="w-5 h-5 text-cyber-cyan" />
              Storage Network
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Capacity</span>
              <span className="font-bold text-cyber-cyan">{stats.totalStorage} PB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Data Transferred</span>
              <span className="font-bold text-cyber-green">{stats.dataTransferred.toFixed(1)} TB</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Network Load</span>
                <span>{stats.networkLoad}%</span>
              </div>
              <Progress value={stats.networkLoad} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-cyber-green" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ZK Proofs</span>
              <Badge variant="secondary" className="bg-cyber-green/20 text-cyber-green">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Encryption</span>
              <Badge variant="secondary" className="bg-cyber-purple/20 text-cyber-purple">
                256-bit AES
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Consensus</span>
              <Badge variant="secondary" className="bg-cyber-cyan/20 text-cyber-cyan">
                PoS + PoS
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Network Activity */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-cyber-pink" />
              Network Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-bold text-cyber-pink">{stats.activeUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Transactions/sec</span>
              <span className="font-bold text-cyber-cyan">{stats.txPerSecond}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-green">
              <TrendingUp className="w-3 h-3" />
              <span>+12.4% from last hour</span>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5 text-cyber-cyan" />
              Global Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Asia Pacific</span>
                <span className="text-cyber-purple">47%</span>
              </div>
              <Progress value={47} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>North America</span>
                <span className="text-cyber-cyan">28%</span>
              </div>
              <Progress value={28} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Europe</span>
                <span className="text-cyber-green">25%</span>
              </div>
              <Progress value={25} className="h-1" />
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-cyber-orange" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Response</span>
              <span className="font-bold text-cyber-orange">{stats.avgLatency}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Throughput</span>
              <span className="font-bold text-cyber-green">847 MB/s</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyber-green">
              <Clock className="w-3 h-3" />
              <span>99.94% uptime (30 days)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts Placeholder */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-purple" />
            Network Performance Charts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Real-time performance charts coming soon</p>
              <p className="text-xs text-muted-foreground mt-2">
                Latency trends • Throughput analysis • Node distribution maps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkStats;