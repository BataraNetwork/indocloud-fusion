import { useState } from "react";
import { useProviderNodes } from "@/hooks/useNodes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Server, 
  Plus, 
  Trash2, 
  Edit, 
  DollarSign,
  MapPin,
  Cpu,
  HardDrive,
  Star,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProviderDashboard() {
  const { providerNodes, loading, createNode, deleteNode } = useProviderNodes();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'compute' as 'storage' | 'compute',
    price_per_hour: '',
    location: '',
    cpu: '',
    gpu: '',
    storage: '',
    ram: '',
    network_speed: '',
    features: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const features = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      await createNode({
        price_per_hour: parseFloat(formData.price_per_hour),
        location: formData.location,
        cpu: formData.cpu,
        gpu: formData.gpu || 'N/A',
        metadata: {
          name: formData.name,
          storage: formData.storage || undefined,
          ram: formData.ram,
          network_speed: formData.network_speed,
          features,
          type: formData.type,
        },
      });

      toast({
        title: "Node Created",
        description: "Your node has been successfully listed on the marketplace",
      });

      setIsDialogOpen(false);
      setFormData({
        name: '',
        type: 'compute',
        price_per_hour: '',
        location: '',
        cpu: '',
        gpu: '',
        storage: '',
        ram: '',
        network_speed: '',
        features: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create node",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (nodeId: string) => {
    try {
      await deleteNode(nodeId);
      toast({
        title: "Node Deleted",
        description: "Your node has been removed from the marketplace",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete node",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-cyber-purple" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Server className="w-6 h-6 text-cyber-purple" />
                My Nodes
              </CardTitle>
              <CardDescription>Manage your compute and storage nodes</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Node
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Node</DialogTitle>
                  <DialogDescription>
                    List your compute or storage node on the marketplace
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Node Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: 'storage' | 'compute') =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compute">Compute</SelectItem>
                          <SelectItem value="storage">Storage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Hour (BTR)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price_per_hour}
                        onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpu">CPU</Label>
                      <Input
                        id="cpu"
                        placeholder="e.g., 16-core AMD EPYC"
                        value={formData.cpu}
                        onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpu">GPU (optional)</Label>
                      <Input
                        id="gpu"
                        placeholder="e.g., 8x RTX 4090"
                        value={formData.gpu}
                        onChange={(e) => setFormData({ ...formData, gpu: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ram">RAM</Label>
                      <Input
                        id="ram"
                        placeholder="e.g., 128GB"
                        value={formData.ram}
                        onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                        required
                      />
                    </div>
                    {formData.type === 'storage' && (
                      <div className="space-y-2">
                        <Label htmlFor="storage">Storage</Label>
                        <Input
                          id="storage"
                          placeholder="e.g., 50TB NVMe"
                          value={formData.storage}
                          onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="network_speed">Network Speed</Label>
                    <Input
                      id="network_speed"
                      placeholder="e.g., 10 Gbps"
                      value={formData.network_speed}
                      onChange={(e) => setFormData({ ...formData, network_speed: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Features (comma-separated)</Label>
                    <Textarea
                      id="features"
                      placeholder="e.g., Docker Support, Kubernetes, 24/7 Support"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Node'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {providerNodes.length === 0 ? (
            <div className="text-center py-12">
              <Server className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No nodes yet</h3>
              <p className="text-muted-foreground mb-4">
                Start earning by listing your compute or storage resources
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Node
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {providerNodes.map((node) => (
                <Card key={node.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {node.metadata?.name || 'Unnamed Node'}
                          </h3>
                          <Badge variant="secondary">
                            {node.metadata?.type || 'compute'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{node.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-muted-foreground" />
                            <span>{node.cpu}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span>{node.price_per_hour} BTR/hr</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>Reputation: {node.reputation}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(node.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
