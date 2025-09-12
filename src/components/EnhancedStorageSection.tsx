import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Download, 
  File, 
  Search,
  MoreVertical,
  Share,
  Trash2,
  Eye,
  HardDrive,
  Cloud,
  Lock,
  Key,
  Globe,
  Shield,
  Zap,
  Copy,
  RefreshCw
} from "lucide-react";

// Enhanced file structure with IPFS data
const files = [
  { 
    id: 1, 
    name: "ML_Dataset_2024.csv", 
    size: "2.3 GB", 
    type: "CSV", 
    uploaded: "2 hours ago",
    ipfsHash: "QmX7d9f2kE8vN1qY3mR4oP5sT6wU7zA2bC9xF1eH8kL3nM",
    replicas: 15,
    status: "distributed",
    encryption: "AES-256",
    accessCount: 247,
    bandwidth: "1.2 GB",
    nodes: ["Jakarta-Node-Pro", "Singapore-Ultra", "Tokyo-Edge"]
  },
  { 
    id: 2, 
    name: "Project_Proposal.pdf", 
    size: "4.7 MB", 
    type: "PDF", 
    uploaded: "1 day ago",
    ipfsHash: "QmY8e1a3jK5lN6oQ7rS8tV9wX0zA1bC2dF4eG7hI9mP2oR",
    replicas: 8,
    status: "distributed",
    encryption: "AES-256",
    accessCount: 89,
    bandwidth: "124 MB",
    nodes: ["Mumbai-Fast", "Dubai-Secure", "Seoul-Pro"]
  },
  { 
    id: 3, 
    name: "Website_Backup.zip", 
    size: "127 MB", 
    type: "ZIP", 
    uploaded: "3 days ago",
    ipfsHash: "QmZ9f2b4kL6mO8pR1sT3vW5xY7zA8bC4dF6eH9iK2nP5qS",
    replicas: 12,
    status: "replicating",
    encryption: "AES-256",
    accessCount: 34,
    bandwidth: "890 MB",
    nodes: ["Bangkok-Storage", "Manila-Edge", "Kuala-Lumpur-Node"]
  },
];

const EnhancedStorageSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'distributed': return 'bg-cyber-green/20 text-cyber-green';
      case 'replicating': return 'bg-cyber-cyan/20 text-cyber-cyan';
      case 'uploading': return 'bg-cyber-orange/20 text-cyber-orange';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20 glow-cyber">
                <HardDrive className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Used Storage</p>
                <p className="text-2xl font-bold gradient-text">2.4 TB</p>
                <Progress value={65} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20 glow-neon">
                <Cloud className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distributed Files</p>
                <p className="text-2xl font-bold text-cyber-cyan">1,847</p>
                <p className="text-xs text-cyber-cyan">Across 2,847 nodes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-green/20">
                <Lock className="w-6 h-6 text-cyber-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Encrypted Files</p>
                <p className="text-2xl font-bold text-cyber-green">100%</p>
                <p className="text-xs text-cyber-green">AES-256 + ZK</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-pink/20">
                <Globe className="w-6 h-6 text-cyber-pink" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Global Access</p>
                <p className="text-2xl font-bold text-cyber-pink">24/7</p>
                <p className="text-xs text-cyber-pink">12ms avg latency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Upload Area */}
      <Card className="glass-card animated-border">
        <CardContent className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              isDragging 
                ? "border-cyber-purple bg-cyber-purple/10 glow-cyber" 
                : "border-border hover:border-cyber-purple/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              // Handle file drop
            }}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20">
                  <Cloud className="w-16 h-16 text-cyber-purple" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">
                  Upload to Decentralized Storage
                </h3>
                <p className="text-muted-foreground mb-6">
                  Files are automatically encrypted with AES-256, distributed across the network, 
                  and secured with zero-knowledge proofs for maximum privacy.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 glow-cyber">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
                <Button variant="outline" className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10">
                  <Key className="w-4 h-4 mr-2" />
                  Upload with Custom Key
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2 text-cyber-green">
                  <Shield className="w-4 h-4" />
                  End-to-end encryption
                </div>
                <div className="flex items-center gap-2 text-cyber-cyan">
                  <Globe className="w-4 h-4" />
                  Global distribution
                </div>
                <div className="flex items-center gap-2 text-cyber-purple">
                  <Zap className="w-4 h-4" />
                  Instant access
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced File Management */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <File className="w-5 h-5 text-cyber-purple" />
              My Files
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="glass-card hover-lift glow-cyber">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-cyber-purple/20">
                        <File className="w-6 h-6 text-cyber-purple" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h4 className="font-medium truncate mb-1">{file.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{file.size} • {file.uploaded}</p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span>IPFS Hash:</span>
                        <div className="flex items-center gap-1">
                          <code className="text-cyber-cyan">{file.ipfsHash.slice(0, 8)}...</code>
                          <Button variant="ghost" size="icon" className="h-4 w-4">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {file.replicas} replicas
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Access count:</span>
                        <span className="text-cyber-green">{file.accessCount}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyber-purple/50 text-cyber-purple hover:bg-cyber-purple/10">
                        <Share className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 rounded-lg glass hover:bg-muted/10 transition-all hover-lift">
                    <File className="w-8 h-8 text-cyber-purple" />
                    <div className="flex-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{file.size} • {file.uploaded}</span>
                        <code className="text-cyber-cyan">IPFS: {file.ipfsHash}</code>
                        <span className="text-cyber-green">{file.accessCount} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getStatusColor(file.status)}>
                        {file.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.replicas} replicas</span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-cyber-cyan hover:bg-cyber-cyan/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-cyber-green hover:bg-cyber-green/10">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-cyber-purple hover:bg-cyber-purple/10">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Storage Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total bandwidth used:</span>
                      <span className="font-bold text-cyber-cyan">12.4 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Most accessed file:</span>
                      <span className="font-bold text-cyber-purple">ML_Dataset_2024.csv</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average replication:</span>
                      <span className="font-bold text-cyber-green">11.7 nodes</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Global Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Asia Pacific</span>
                        <span className="text-cyber-purple">47%</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>North America</span>
                        <span className="text-cyber-cyan">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Europe</span>
                        <span className="text-cyber-green">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStorageSection;