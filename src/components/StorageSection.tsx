import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  File, 
  Folder, 
  Search,
  MoreVertical,
  Share,
  Trash2,
  Eye,
  HardDrive,
  Cloud,
  Lock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for files
const files = [
  { 
    id: 1, 
    name: "ML_Dataset_2024.csv", 
    size: "2.3 GB", 
    type: "CSV", 
    uploaded: "2 hours ago",
    ipfsHash: "QmX7d9f2k...",
    replicas: 5,
    status: "distributed"
  },
  { 
    id: 2, 
    name: "Project_Proposal.pdf", 
    size: "4.7 MB", 
    type: "PDF", 
    uploaded: "1 day ago",
    ipfsHash: "QmY8e1a3j...",
    replicas: 3,
    status: "distributed"
  },
  { 
    id: 3, 
    name: "Website_Backup.zip", 
    size: "127 MB", 
    type: "ZIP", 
    uploaded: "3 days ago",
    ipfsHash: "QmZ9f2b4k...",
    replicas: 4,
    status: "replicating"
  },
];

export default function StorageSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20">
                <HardDrive className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Used Storage</p>
                <p className="text-2xl font-bold">2.4 TB</p>
                <Progress value={65} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20">
                <Cloud className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distributed Files</p>
                <p className="text-2xl font-bold">1,847</p>
                <p className="text-xs text-cyber-cyan">Across 2,847 nodes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/20">
                <Lock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Encrypted Files</p>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-success">ZK-proof secured</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card className="bg-card/50 backdrop-blur border-accent/30">
        <CardContent className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging 
                ? "border-cyber-purple bg-cyber-purple/10" 
                : "border-border hover:border-accent"
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
            <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload to Decentralized Storage</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here or click to browse. Files are automatically encrypted and distributed across the network.
            </p>
            <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Management */}
      <Card className="bg-card/50 backdrop-blur border-accent/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <File className="w-5 h-5" />
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="bg-muted/20 border-accent/30 hover:bg-muted/30 transition-colors">
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
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          file.status === 'distributed' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-cyber-cyan/20 text-cyber-cyan'
                        }`}
                      >
                        {file.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {file.replicas} replicas
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <File className="w-8 h-8 text-cyber-purple" />
                    <div className="flex-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.uploaded} • IPFS: {file.ipfsHash}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        file.status === 'distributed' 
                          ? 'bg-success/20 text-success' 
                          : 'bg-cyber-cyan/20 text-cyber-cyan'
                      }`}
                    >
                      {file.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}