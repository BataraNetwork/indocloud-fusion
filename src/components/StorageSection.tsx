import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Cloud, 
  Database, 
  Download, 
  Grid, 
  HardDrive, 
  List, 
  Lock, 
  RefreshCw, 
  Search, 
  Share2, 
  Upload,
  Trash2,
  File,
  Link2,
  Copy
} from "lucide-react";
import { useState, useRef } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useFileSharing } from "@/hooks/useFileSharing";
import { StorageFile } from "@/hooks/useStorage";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function StorageSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const [shareExpiry, setShareExpiry] = useState("24");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    files, 
    loading, 
    uploading, 
    storageUsed, 
    uploadFile, 
    downloadFile, 
    deleteFile,
    refreshFiles 
  } = useStorage();

  const { createShare, loading: sharingLoading } = useFileSharing();

  const handleShare = (file: StorageFile) => {
    setSelectedFile(file);
    setShareDialogOpen(true);
  };

  const handleCreateShare = async () => {
    if (!selectedFile) return;

    await createShare(selectedFile.id, {
      expiresInHours: parseInt(shareExpiry),
    });

    setShareDialogOpen(false);
    setSelectedFile(null);
  };

  const storageLimit = 10 * 1024 * 1024 * 1024; // 10GB
  const storagePercentage = (storageUsed / storageLimit) * 100;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    for (const file of droppedFiles) {
      await uploadFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      await uploadFile(selectedFiles[i]);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(storageUsed)}</div>
            <p className="text-xs text-muted-foreground">of 10GB</p>
            <Progress value={storagePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">Stored securely</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Encrypted Files</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">End-to-end encrypted</p>
          </CardContent>
        </Card>
      </div>

      {/* File Upload */}
      <Card>
        <CardContent className="pt-6">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload Files</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop files here or click to browse
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Cloud className="mr-2 h-4 w-4" />
              {uploading ? 'Uploading...' : 'Select Files'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Management */}
      <Card>
        <CardHeader>
          <CardTitle>My Files</CardTitle>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={refreshFiles}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full">
            <TabsList>
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading files...
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No files found' : 'No files uploaded yet'}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFiles.map((file) => (
                    <Card key={file.id}>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4" />
                          <CardTitle className="text-sm truncate">{file.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span>{formatFileSize(file.size)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{file.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uploaded:</span>
                            <span>{formatDate(file.uploaded)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => downloadFile(file)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleShare(file)}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteFile(file)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading files...
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No files found' : 'No files uploaded yet'}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                              <span>{formatFileSize(file.size)}</span>
                              <span>{file.type}</span>
                              <span>{formatDate(file.uploaded)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleShare(file)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteFile(file)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Create a secure link to share {selectedFile?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Link expires in</Label>
              <select
                id="expiry"
                value={shareExpiry}
                onChange={(e) => setShareExpiry(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="1">1 hour</option>
                <option value="24">24 hours</option>
                <option value="168">7 days</option>
                <option value="720">30 days</option>
              </select>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Link will be copied to clipboard
              </span>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShareDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateShare}
                disabled={sharingLoading}
              >
                <Copy className="h-4 w-4 mr-2" />
                Create Share Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
