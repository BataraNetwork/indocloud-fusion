import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  MapPin, 
  Star,
  Search,
  Filter,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";
import networkNodes from "@/assets/network-nodes.jpg";

// Mock data for nodes
const storageNodes = [
  {
    id: 1,
    name: "Jakarta-Node-Pro",
    location: "Jakarta, Indonesia",
    storage: "50 TB",
    price: "0.002 INDO/GB/month",
    uptime: 99.9,
    rating: 4.9,
    speed: "1 Gbps",
    reputation: 847,
    type: "storage"
  },
  {
    id: 2,
    name: "Singapore-Ultra",
    location: "Singapore",
    storage: "100 TB", 
    price: "0.003 INDO/GB/month",
    uptime: 99.95,
    rating: 4.8,
    speed: "10 Gbps",
    reputation: 1243,
    type: "storage"
  }
];

const computeNodes = [
  {
    id: 3,
    name: "GPU-Beast-SG",
    location: "Singapore",
    specs: "8x RTX 4090, 128GB RAM",
    price: "2.5 INDO/hour",
    uptime: 99.8,
    rating: 4.9,
    performance: "95 TFLOPS",
    reputation: 692,
    type: "compute"
  },
  {
    id: 4,
    name: "AI-Cluster-ID",
    location: "Surabaya, Indonesia", 
    specs: "16x A100, 256GB RAM",
    price: "4.2 INDO/hour",
    uptime: 99.9,
    rating: 5.0,
    performance: "156 TFLOPS",
    reputation: 1891,
    type: "compute"
  }
];

export default function NodeMarketplace() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 border border-accent/30">
        <div className="absolute inset-0">
          <img 
            src={networkNodes} 
            alt="Network Nodes" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative p-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
            Node Marketplace
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Discover and rent high-performance nodes for storage and compute. All nodes are verified, monitored, and secured by our network.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-success">Verified Nodes: 2,847</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-cyber-cyan" />
              <span className="text-cyber-cyan">Avg Uptime: 99.7%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-cyber-purple" />
              <span className="text-cyber-purple">Active Jobs: 1,523</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="bg-card/50 backdrop-blur border-accent/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search nodes by location, specs, or provider..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="border-accent/50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Node Categories */}
      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            Storage Nodes
          </TabsTrigger>
          <TabsTrigger value="compute" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Compute Nodes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {storageNodes.map((node) => (
              <Card key={node.id} className="bg-card/50 backdrop-blur border-accent/30 hover:bg-card/70 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Node Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{node.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {node.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{node.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Storage</p>
                          <p className="font-medium">{node.storage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Speed</p>
                          <p className="font-medium">{node.speed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Uptime</p>
                          <p className="font-medium text-success">{node.uptime}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Reputation</p>
                          <p className="font-medium">{node.reputation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="lg:text-right">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-bold text-cyber-purple">{node.price}</p>
                      </div>
                      <div className="flex lg:flex-col gap-2">
                        <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
                          Rent Storage
                        </Button>
                        <Button variant="outline" className="border-accent/50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compute" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {computeNodes.map((node) => (
              <Card key={node.id} className="bg-card/50 backdrop-blur border-accent/30 hover:bg-card/70 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Node Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{node.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {node.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{node.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Specs</p>
                          <p className="font-medium">{node.specs}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Performance</p>
                          <p className="font-medium">{node.performance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Uptime</p>
                          <p className="font-medium text-success">{node.uptime}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Reputation</p>
                          <p className="font-medium">{node.reputation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="lg:text-right">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-bold text-cyber-cyan">{node.price}</p>
                      </div>
                      <div className="flex lg:flex-col gap-2">
                        <Button className="bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:opacity-90">
                          Rent Compute
                        </Button>
                        <Button variant="outline" className="border-accent/50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stats Footer */}
      <Card className="bg-gradient-to-r from-cyber-purple/10 to-cyber-cyan/10 border-accent/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Server className="w-8 h-8 text-cyber-purple mx-auto mb-2" />
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Active Nodes</p>
            </div>
            <div>
              <HardDrive className="w-8 h-8 text-cyber-cyan mx-auto mb-2" />
              <p className="text-2xl font-bold">847 PB</p>
              <p className="text-sm text-muted-foreground">Total Storage</p>
            </div>
            <div>
              <Cpu className="w-8 h-8 text-cyber-pink mx-auto mb-2" />
              <p className="text-2xl font-bold">12.4k</p>
              <p className="text-sm text-muted-foreground">Compute Hours</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">99.7%</p>
              <p className="text-sm text-muted-foreground">Network Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}