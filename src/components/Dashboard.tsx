import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";
import { useNodes } from "@/hooks/useNodes";
import { 
  Database, 
  Cpu, 
  Network, 
  Coins,
  Upload,
  Activity,
  Server,
  Zap,
  ShoppingCart,
  CheckCircle,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-blockchain.jpg";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { analytics, loading } = useDashboardAnalytics();
  const { nodes } = useNodes();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Server className="w-4 h-4 text-cyber-cyan" />;
      case 'file':
        return <Upload className="w-4 h-4 text-cyber-purple" />;
      case 'payment':
        return <Coins className="w-4 h-4 text-success" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };
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
              Welcome to BataraCloud
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
                <p className="text-2xl font-bold">{analytics.totalStorageGB.toFixed(2)} GB</p>
                <p className="text-xs text-success">{analytics.totalFiles} files distributed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20">
                <ShoppingCart className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-2xl font-bold">{analytics.activeBookings}</p>
                <p className="text-xs text-cyber-cyan">{analytics.totalBookings} total bookings</p>
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
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">{analytics.totalSpent.toFixed(2)}</p>
                <p className="text-xs text-success">BTR on services</p>
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
                <p className="text-sm text-muted-foreground">Available Nodes</p>
                <p className="text-2xl font-bold">{nodes.length}</p>
                <p className="text-xs text-cyber-pink">Ready to rent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold">{analytics.pendingBookings}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-3xl font-bold">{analytics.activeBookings}</p>
              </div>
              <Cpu className="w-8 h-8 text-cyber-cyan" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold">{analytics.completedBookings}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
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
            {loading ? (
              <div className="text-center text-muted-foreground py-8">Loading...</div>
            ) : analytics.recentActivity.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No recent activity
              </div>
            ) : (
              analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Network Health */}
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyber-cyan" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Available Nodes</span>
                <Badge variant="secondary" className="bg-success/20 text-success">{nodes.length} Active</Badge>
              </div>
              <Progress value={nodes.length > 0 ? 85 : 0} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Your Active Bookings</span>
                <Badge variant="secondary" className="bg-cyber-cyan/20 text-cyber-cyan">{analytics.activeBookings} Running</Badge>
              </div>
              <Progress value={analytics.activeBookings > 0 ? 75 : 0} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Files Stored</span>
                <span className="text-sm text-success">{analytics.totalFiles} files</span>
              </div>
              <Progress value={analytics.totalFiles > 0 ? 60 : 0} className="h-2" />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-cyber-purple/10 to-cyber-cyan/10 border border-accent/30">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-cyber-purple" />
                <span>
                  {analytics.activeBookings > 0 
                    ? `${analytics.activeBookings} active service${analytics.activeBookings > 1 ? 's' : ''} running`
                    : 'Ready to start using BataraCloud'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}