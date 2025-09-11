import { Cloud } from "lucide-react";

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Cloud className="w-10 h-10 text-cyber-purple" />
        <span className="text-2xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
          IndoBlockCloud
        </span>
      </div>
      <p className="text-muted-foreground">
        Access your decentralized cloud infrastructure
      </p>
    </div>
  );
}