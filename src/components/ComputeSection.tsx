import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Zap, 
  Clock, 
  Play,
  Square,
  BarChart3,
  Code,
  Brain,
  Database,
  Monitor
} from "lucide-react";

// Mock active jobs
const activeJobs = [
  {
    id: 1,
    name: "ML Model Training",
    type: "AI/ML",
    node: "GPU-Beast-SG",
    progress: 67,
    timeLeft: "2h 14m",
    cost: "12.4 VLR",
    status: "running"
  },
  {
    id: 2,
    name: "Video Rendering",
    type: "Compute",
    node: "Render-Farm-ID",
    progress: 23,
    timeLeft: "5h 42m", 
    cost: "8.7 VLR",
    status: "running"
  }
];

export default function ComputeSection() {
  const [selectedWorkloadType, setSelectedWorkloadType] = useState("");

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-purple/20">
                <Cpu className="w-6 h-6 text-cyber-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-cyan/20">
                <Zap className="w-6 h-6 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compute Hours</p>
                <p className="text-2xl font-bold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/20">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Queue Time</p>
                <p className="text-2xl font-bold">47s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyber-pink/20">
                <BarChart3 className="w-6 h-6 text-cyber-pink" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">99.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Submission & Management */}
      <Tabs defaultValue="submit" className="w-full">
        <TabsList>
          <TabsTrigger value="submit">Submit Job</TabsTrigger>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="history">Job History</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-6 mt-6">
          <Card className="bg-card/50 backdrop-blur border-accent/30">
            <CardHeader>
              <CardTitle>Submit Compute Job</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workload Type Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "ai-ml", label: "AI/ML Training", icon: Brain },
                  { id: "rendering", label: "3D Rendering", icon: Monitor },
                  { id: "data", label: "Data Processing", icon: Database },
                  { id: "custom", label: "Custom Code", icon: Code }
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        selectedWorkloadType === type.id 
                          ? 'bg-cyber-purple/20 border-cyber-purple' 
                          : 'bg-muted/20 hover:bg-muted/30'
                      }`}
                      onClick={() => setSelectedWorkloadType(type.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-cyber-purple" />
                        <p className="text-sm font-medium">{type.label}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Job Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Job Name</label>
                    <Input placeholder="My ML Training Job" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Resource Requirements</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compute tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (2 CPU, 4GB RAM)</SelectItem>
                        <SelectItem value="standard">Standard (4 CPU, 8GB RAM)</SelectItem>
                        <SelectItem value="gpu-small">GPU Small (1x RTX 4090)</SelectItem>
                        <SelectItem value="gpu-large">GPU Large (8x RTX 4090)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Runtime (hours)</label>
                    <Input type="number" placeholder="24" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Budget (VLR)</label>
                    <Input type="number" placeholder="50.0" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Docker Image</label>
                    <Input placeholder="tensorflow/tensorflow:latest-gpu" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Job Script</label>
                    <Textarea 
                      placeholder="#!/bin/bash&#10;python train_model.py --epochs 100" 
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Environment Variables</label>
                    <Textarea placeholder="CUDA_VISIBLE_DEVICES=0&#10;PYTHONPATH=/workspace" />
                  </div>
                </div>
              </div>

              {/* Submit Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Estimated cost: <span className="text-cyber-purple font-medium">~12.5 VLR</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90">
                    <Play className="w-4 h-4 mr-2" />
                    Submit Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeJobs.map((job) => (
            <Card key={job.id} className="bg-card/50 backdrop-blur border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{job.name}</h3>
                    <p className="text-sm text-muted-foreground">Running on {job.node}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      {job.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress:</span>
                    <span>{job.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyber-purple to-cyber-cyan h-2 rounded-full transition-all"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time Left: {job.timeLeft}</span>
                    <span className="text-muted-foreground">Cost: {job.cost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="bg-card/50 backdrop-blur border-accent/30">
            <CardContent className="p-8 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Job History</h3>
              <p className="text-muted-foreground">
                Your completed compute jobs will appear here with detailed logs and performance metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}