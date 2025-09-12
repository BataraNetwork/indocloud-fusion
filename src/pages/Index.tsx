import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import NetworkStats from "@/components/NetworkStats";
import EnhancedStorageSection from "@/components/EnhancedStorageSection";
import EnhancedNodeMarketplace from "@/components/EnhancedNodeMarketplace";
import EnhancedWalletSection from "@/components/EnhancedWalletSection";
import ComputeSection from "@/components/ComputeSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyber-purple" />
          <p className="text-muted-foreground">Loading IndoBlockCloud...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Access Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access IndoBlockCloud</p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "network":
        return <NetworkStats />;
      case "storage":
        return <EnhancedStorageSection />;
      case "marketplace":
        return <EnhancedNodeMarketplace />;
      case "wallet":
        return <EnhancedWalletSection />;
      case "compute":
        return <ComputeSection />;
      case "tokens":
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">INDO Token management coming soon...</p>
          </div>
        );
      case "security":
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">ZK Security features coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className={cn(
        "transition-all duration-300 pl-64 p-6",
        "ml-0 pl-64" // Always account for sidebar width
      )}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;