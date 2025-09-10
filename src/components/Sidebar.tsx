import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  Cloud, 
  Database, 
  Cpu, 
  Wallet, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Coins,
  Network,
  Shield,
  LogOut,
  User
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "storage", label: "Cloud Storage", icon: Database },
  { id: "compute", label: "Compute Rental", icon: Cpu },
  { id: "marketplace", label: "Node Marketplace", icon: Network },
  { id: "wallet", label: "Wallet & Balance", icon: Wallet },
  { id: "tokens", label: "INDO Tokens", icon: Coins },
  { id: "security", label: "ZK Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "Successfully logged out from IndoBlockCloud",
      });
      navigate('/auth');
    }
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-card/50 backdrop-blur-xl border-r border-border/50 transition-all duration-300 z-50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-cyber-purple" />
            <span className="font-bold text-lg bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
              IndoBlockCloud
            </span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-accent/20"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                isActive && "bg-accent/20 text-accent-foreground border border-accent/30",
                !isActive && "hover:bg-accent/10 hover:text-accent-foreground",
                isCollapsed && "px-2"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Panel & Status */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          {/* User Info */}
          <div className="bg-muted/20 rounded-lg p-3 border border-accent/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-cyber-purple/20">
                <User className="w-4 h-4 text-cyber-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-2 h-8"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </Button>
          </div>
          
          {/* Network Status */}
          <div className="bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 rounded-lg p-3 border border-accent/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Network Status</span>
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30 text-xs">
                Online
              </Badge>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Nodes Connected:</span>
                <span className="text-cyber-cyan">2,847</span>
              </div>
              <div className="flex justify-between">
                <span>INDO Balance:</span>
                <span className="text-cyber-purple">1,250.45</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}