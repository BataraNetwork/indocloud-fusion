import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyber-purple" aria-hidden="true" />
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-2xl font-bold mb-2">Access Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access IndoBlockCloud</p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
            aria-label="Navigate to sign in page"
          >
            {t('login')}
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
          <div className="flex items-center justify-center h-64" role="status">
            <p className="text-muted-foreground">{t('indoTokens')} management coming soon...</p>
          </div>
        );
      case "security":
        return (
          <div className="flex items-center justify-center h-64" role="status">
            <p className="text-muted-foreground">ZK Security features coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-64" role="status">
            <p className="text-muted-foreground">{t('settings')} panel coming soon...</p>
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
      
      <main 
        id="main-content"
        className={cn(
          "transition-all duration-300 min-h-screen",
          "ml-0 pl-64 lg:pl-64 md:pl-16 sm:pl-16", // Responsive sidebar spacing
          "p-4 sm:p-6" // Responsive padding
        )}
        role="main"
        aria-label="Main application content"
      >
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;