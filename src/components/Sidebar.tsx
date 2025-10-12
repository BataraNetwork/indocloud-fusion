import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
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

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: t("dashboard"), icon: BarChart3 },
    { id: "storage", label: t("storage"), icon: Database },
    { id: "compute", label: t("compute"), icon: Cpu },
    { id: "marketplace", label: t("marketplace"), icon: Network },
    { id: "wallet", label: t("wallet"), icon: Wallet },
    { id: "tokens", label: t("bataraTokens"), icon: Coins },
    { id: "security", label: "ZK Security", icon: Shield },
    { id: "settings", label: t("settings"), icon: Settings },
  ];

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t("success"),
        description: "Successfully logged out from BataraCloud",
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
              BataraCloud
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <>
              <ThemeToggle />
              <LanguageSelector />
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-accent/20"
            aria-label={t('menuButton')}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" role="navigation" aria-label="Main navigation">
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
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
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
              aria-label={t('logout')}
            >
              <LogOut className="w-3 h-3" aria-hidden="true" />
              {t('logout')}
            </Button>
          </div>
          
          {/* Network Status */}
          <div className="bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 rounded-lg p-3 border border-accent/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{t('networkStats')}</span>
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30 text-xs">
                Online
              </Badge>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>{t('totalNodes')}:</span>
                <span className="text-cyber-cyan">2,847</span>
              </div>
              <div className="flex justify-between">
                <span>{t('balance')}:</span>
                <span className="text-cyber-purple">1,250.45</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}