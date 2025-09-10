import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import StorageSection from "@/components/StorageSection";
import NodeMarketplace from "@/components/NodeMarketplace";
import WalletSection from "@/components/WalletSection";
import ComputeSection from "@/components/ComputeSection";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "storage":
        return <StorageSection />;
      case "marketplace":
        return <NodeMarketplace />;
      case "wallet":
        return <WalletSection />;
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