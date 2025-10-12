import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Activity,
  Globe,
} from "lucide-react";
import networkNodes from "@/assets/network-nodes.jpg";

// Node data types
type StorageNode = {
  id: number;
  name: string;
  provider: string;
  location: string;
  storage: string;
  available: string;
  price: string;
  uptime: number;
  rating: number;
  reviews: number;
  speed: string;
  reputation: number;
  type: "storage";
  verified: boolean;
  features: string[];
  lastOnline: string;
  totalEarned: string;
  peakLoad: string;
};

type ComputeNode = {
  id: number;
  name: string;
  provider: string;
  location: string;
  specs: string;
  price: string;
  uptime: number;
  rating: number;
  reviews: number;
  performance: string;
  reputation: number;
  type: "compute";
  verified: boolean;
  features: string[];
  lastOnline: string;
  totalEarned: string;
  peakLoad: string;
};

// Enhanced node data with more realistic details
const storageNodes: StorageNode[] = [
  {
    id: 1,
    name: "Jakarta-Node-Pro",
    provider: "IDN-Storage-Co",
    location: "Jakarta, Indonesia",
    storage: "50 TB",
    available: "47.2 TB",
    price: "0.002 BTR/GB/month",
    uptime: 99.94,
    rating: 4.9,
    reviews: 1247,
    speed: "1 Gbps",
    reputation: 8947,
    type: "storage",
    verified: true,
    features: ["SSD Storage", "Redundancy", "24/7 Support"],
    lastOnline: "Active",
    totalEarned: "12,847 BTR",
    peakLoad: "89%",
  },
  {
    id: 2,
    name: "Singapore-Ultra",
    provider: "APAC-Cloud-Ltd",
    location: "Singapore",
    storage: "100 TB",
    available: "92.8 TB",
    price: "0.003 BTR/GB/month",
    uptime: 99.97,
    rating: 4.8,
    reviews: 2891,
    speed: "10 Gbps",
    reputation: 15243,
    type: "storage",
    verified: true,
    features: ["NVMe SSD", "Geo-Redundancy", "Enterprise"],
    lastOnline: "Active",
    totalEarned: "28,394 BTR",
    peakLoad: "76%",
  },
  {
    id: 3,
    name: "Mumbai-FastStore",
    provider: "India-Decentralized",
    location: "Mumbai, India",
    storage: "25 TB",
    available: "21.1 TB",
    price: "0.0015 BTR/GB/month",
    uptime: 99.89,
    rating: 4.7,
    reviews: 892,
    speed: "500 Mbps",
    reputation: 4832,
    type: "storage",
    verified: true,
    features: ["HDD Storage", "Basic Support"],
    lastOnline: "Active",
    totalEarned: "7,291 BTR",
    peakLoad: "93%",
  },
];

const computeNodes: ComputeNode[] = [
  {
    id: 4,
    name: "GPU-Beast-SG",
    provider: "AI-Compute-Asia",
    location: "Singapore",
    specs: "8x RTX 4090, 128GB RAM, 2TB NVMe",
    price: "2.5 BTR/hour",
    uptime: 99.91,
    rating: 4.9,
    reviews: 1842,
    performance: "95 TFLOPS",
    reputation: 11692,
    type: "compute",
    verified: true,
    features: ["CUDA 12.0", "Docker Support", "Jupyter"],
    lastOnline: "Active",
    totalEarned: "47,283 BTR",
    peakLoad: "87%",
  },
  {
    id: 5,
    name: "AI-Cluster-ID",
    provider: "Indonesia-GPU-Farm",
    location: "Surabaya, Indonesia",
    specs: "16x A100 80GB, 512GB RAM, 4TB NVMe",
    price: "4.2 BTR/hour",
    uptime: 99.95,
    rating: 5.0,
    reviews: 3247,
    performance: "156 TFLOPS",
    reputation: 21891,
    type: "compute",
    verified: true,
    features: ["Multi-GPU", "InfiniBand", "MLOps"],
    lastOnline: "Active",
    totalEarned: "89,472 BTR",
    peakLoad: "92%",
  },
  {
    id: 6,
    name: "Tokyo-ML-Engine",
    provider: "Japan-AI-Network",
    location: "Tokyo, Japan",
    specs: "4x H100, 256GB RAM, 1TB NVMe",
    price: "6.8 BTR/hour",
    uptime: 99.98,
    rating: 4.9,
    reviews: 1394,
    performance: "200 TFLOPS",
    reputation: 18749,
    type: "compute",
    verified: true,
    features: ["Latest H100", "FP8 Training", "Scale-out"],
    lastOnline: "Active",
    totalEarned: "124,837 BTR",
    peakLoad: "78%",
  },
];

function filterPrice<T extends { price: string; type: string }>(
  nodes: T[],
  priceFilter: string
) {
  if (priceFilter === "all" || !priceFilter) return nodes;
  // Only supports simple logic for demo data
  if (nodes.length > 0 && nodes[0].type === "storage") {
    switch (priceFilter) {
      case "low":
        // < 0.002 INDO/GB/month
        return nodes.filter(
          (n) => parseFloat(n.price) < 0.002
        );
      case "medium":
        // 0.002 - 0.005 INDO/GB/month
        return nodes.filter(
          (n) => parseFloat(n.price) >= 0.002 && parseFloat(n.price) <= 0.005
        );
      case "high":
        // > 0.005 INDO/GB/month
        return nodes.filter(
          (n) => parseFloat(n.price) > 0.005
        );
      default:
        return nodes;
    }
  } else {
    // compute: price in INDO/hour
    switch (priceFilter) {
      case "low":
        return nodes.filter(
          (n) => parseFloat(n.price) < 1
        );
      case "medium":
        return nodes.filter(
          (n) => parseFloat(n.price) >= 1 && parseFloat(n.price) <= 5
        );
      case "high":
        return nodes.filter(
          (n) => parseFloat(n.price) > 5
        );
      default:
        return nodes;
    }
  }
}

function filterLocation<T extends { location: string }>(
  nodes: T[],
  locationFilter: string
) {
  if (locationFilter === "all" || !locationFilter) return nodes;
  return nodes.filter((node) =>
    node.location.toLowerCase().includes(locationFilter)
  );
}

function filterSearch<T extends { name: string; provider: string; location: string; features?: string[]; specs?: string }>(
  nodes: T[],
  query: string
) {
  if (!query) return nodes;
  const q = query.toLowerCase();
  return nodes.filter(
    (node) =>
      node.name.toLowerCase().includes(q) ||
      node.provider.toLowerCase().includes(q) ||
      node.location.toLowerCase().includes(q) ||
      (node.features && node.features.some((f) => f.toLowerCase().includes(q))) ||
      (node.specs && node.specs.toLowerCase().includes(q))
  );
}

function sortNodes<T extends { reputation: number; price: string; rating: number; uptime: number }>(
  nodes: T[],
  sortBy: string
) {
  switch (sortBy) {
    case "reputation":
      return [...nodes].sort((a, b) => b.reputation - a.reputation);
    case "price":
      return [...nodes].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case "rating":
      return [...nodes].sort((a, b) => b.rating - a.rating);
    case "uptime":
      return [...nodes].sort((a, b) => b.uptime - a.uptime);
    default:
      return nodes;
  }
}

const EnhancedNodeMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("reputation");

  // Filtered and sorted nodes
  const filteredStorageNodes = useMemo(() => {
    let nodes = storageNodes;
    nodes = filterLocation(nodes, locationFilter);
    nodes = filterPrice(nodes, priceFilter);
    nodes = filterSearch(nodes, searchQuery);
    nodes = sortNodes(nodes, sortBy);
    return nodes;
  }, [searchQuery, locationFilter, priceFilter, sortBy]);

  const filteredComputeNodes = useMemo(() => {
    let nodes = computeNodes;
    nodes = filterLocation(nodes, locationFilter);
    nodes = filterPrice(nodes, priceFilter);
    nodes = filterSearch(nodes, searchQuery);
    nodes = sortNodes(nodes, sortBy);
    return nodes;
  }, [searchQuery, locationFilter, priceFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl glass-card animated-border">
        <div className="absolute inset-0">
          <img
            src={networkNodes}
            alt="Network Nodes"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative p-8">
          <h1 className="text-4xl font-bold mb-4 gradient-cosmic">
            Node Marketplace
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
            Discover and rent high-performance nodes for storage and compute. All nodes are verified,
            monitored 24/7, and secured by our decentralized network with automated SLA enforcement.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-cyber-green pulse-glow" />
              <span className="text-cyber-green font-medium">
                2,847 Verified Nodes
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-cyber-cyan" />
              <span className="text-cyber-cyan font-medium">
                99.7% Avg Uptime
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-cyber-purple" />
              <span className="text-cyber-purple font-medium">
                1,523 Active Jobs
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-cyber-pink" />
              <span className="text-cyber-pink font-medium">
                47 Countries
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search & Filters */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={locationFilter}
              onValueChange={setLocationFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priceFilter}
              onValueChange={setPriceFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">&lt; 1 BTR</SelectItem>
                <SelectItem value="medium">1-5 BTR</SelectItem>
                <SelectItem value="high">&gt; 5 BTR</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reputation">Reputation</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="uptime">Uptime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Node Categories */}
      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            Storage Nodes ({filteredStorageNodes.length})
          </TabsTrigger>
          <TabsTrigger value="compute" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Compute Nodes ({filteredComputeNodes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="space-y-4 mt-6">
          <div className="grid gap-6">
            {filteredStorageNodes.map((node) => (
              <Card
                key={node.id}
                className="glass-card hover-lift glow-cyber"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Enhanced Node Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold gradient-text">
                              {node.name}
                            </h3>
                            {node.verified && (
                              <Badge
                                variant="secondary"
                                className="bg-cyber-green/20 text-cyber-green"
                              >
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {node.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Server className="w-4 h-4" />
                              {node.provider}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {node.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({node.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyber-purple">
                            {node.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per GB/month
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Total Storage
                          </p>
                          <p className="font-medium text-cyber-cyan">
                            {node.storage}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Available
                          </p>
                          <p className="font-medium text-cyber-green">
                            {node.available}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Speed
                          </p>
                          <p className="font-medium">{node.speed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Uptime
                          </p>
                          <p className="font-medium text-cyber-green">
                            {node.uptime}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Reputation
                          </p>
                          <p className="font-medium text-cyber-purple">
                            {node.reputation.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {node.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-cyber-cyan/30 text-cyber-cyan"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Total Earned:{" "}
                          <span className="text-cyber-green font-medium">
                            {node.totalEarned}
                          </span>
                        </span>
                        <span>
                          Peak Load:{" "}
                          <span className="text-cyber-orange font-medium">
                            {node.peakLoad}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-cyber-green rounded-full pulse-glow"></div>
                          {node.lastOnline}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="lg:text-right space-y-3">
                      <div className="flex lg:flex-col gap-2">
                        <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 glow-cyber flex-1">
                          <HardDrive className="w-4 h-4 mr-2" />
                          Rent Storage
                        </Button>
                        <Button
                          variant="outline"
                          className="border-cyber-purple/50 text-cyber-purple hover:bg-cyber-purple/10"
                        >
                          View Details
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-cyber-cyan hover:bg-cyber-cyan/10"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Live Metrics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compute" className="space-y-4 mt-6">
          <div className="grid gap-6">
            {filteredComputeNodes.map((node) => (
              <Card
                key={node.id}
                className="glass-card hover-lift glow-neon"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Enhanced Node Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold gradient-text">
                              {node.name}
                            </h3>
                            {node.verified && (
                              <Badge
                                variant="secondary"
                                className="bg-cyber-green/20 text-cyber-green"
                              >
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className="bg-cyber-purple/20 text-cyber-purple"
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {node.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Server className="w-4 h-4" />
                              {node.provider}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {node.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({node.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyber-cyan">
                            {node.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per hour
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Hardware Specs
                          </p>
                          <p className="font-medium text-cyber-cyan">
                            {node.specs}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Performance
                            </p>
                            <p className="font-medium">{node.performance}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Uptime
                            </p>
                            <p className="font-medium text-cyber-green">
                              {node.uptime}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Reputation
                            </p>
                            <p className="font-medium text-cyber-purple">
                              {node.reputation.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {node.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-cyber-cyan/30 text-cyber-cyan"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Total Earned:{" "}
                          <span className="text-cyber-green font-medium">
                            {node.totalEarned}
                          </span>
                        </span>
                        <span>
                          Peak Load:{" "}
                          <span className="text-cyber-orange font-medium">
                            {node.peakLoad}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-cyber-green rounded-full pulse-glow"></div>
                          {node.lastOnline}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Actions */}
                    <div className="lg:text-right space-y-3">
                      <div className="flex lg:flex-col gap-2">
                        <Button className="bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:opacity-90 glow-neon flex-1">
                          <Cpu className="w-4 h-4 mr-2" />
                          Rent Compute
                        </Button>
                        <Button
                          variant="outline"
                          className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10"
                        >
                          View Details
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-cyber-purple hover:bg-cyber-purple/10"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Live Metrics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Stats Footer */}
      <Card className="glass-card animated-border">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Server className="w-12 h-12 text-cyber-purple mx-auto pulse-glow" />
              <p className="text-3xl font-bold gradient-text">2,847</p>
              <p className="text-sm text-muted-foreground">Active Nodes</p>
              <p className="text-xs text-cyber-green">+127 this week</p>
            </div>
            <div className="space-y-2">
              <HardDrive className="w-12 h-12 text-cyber-cyan mx-auto" />
              <p className="text-3xl font-bold text-cyber-cyan">847 PB</p>
              <p className="text-sm text-muted-foreground">Total Storage</p>
              <p className="text-xs text-cyber-cyan">67% utilized</p>
            </div>
            <div className="space-y-2">
              <Cpu className="w-12 h-12 text-cyber-pink mx-auto" />
              <p className="text-3xl font-bold text-cyber-pink">124k</p>
              <p className="text-sm text-muted-foreground">Compute Hours</p>
              <p className="text-xs text-cyber-pink">This month</p>
            </div>
            <div className="space-y-2">
              <Zap className="w-12 h-12 text-cyber-green mx-auto" />
              <p className="text-3xl font-bold text-cyber-green">99.7%</p>
              <p className="text-sm text-muted-foreground">Network Uptime</p>
              <p className="text-xs text-cyber-green">30-day average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedNodeMarketplace;
