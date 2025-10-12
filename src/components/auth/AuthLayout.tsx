import { Cloud } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title = "BataraCloud",
  subtitle = "Access your decentralized cloud infrastructure",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="w-10 h-10 text-cyber-purple" aria-hidden="true" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </header>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
