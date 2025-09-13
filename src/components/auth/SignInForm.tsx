import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2, Shield, Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function SignInForm({
  onSubmit,
  onResetPassword,
  isLoading,
  error,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi email sederhana
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    await onSubmit(email, password);
  };

  const handleResetPassword = async () => {
    if (!email) return;
    await onResetPassword(email);
    setResetSent(true);
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-accent/30">
      <CardHeader>
        <CardTitle className="text-center">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                aria-label="Email Icon"
              />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                aria-label="Password Icon"
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" aria-label="Hide Password" />
                ) : (
                  <Eye className="w-4 h-4" aria-label="Show Password" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resetSent && (
            <Alert>
              <AlertDescription>
                Password reset link has been sent to {email}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm"
            onClick={handleResetPassword}
            disabled={isLoading || !email}
          >
            Forgot your password?
          </Button>
        </form>
      </CardContent>
    </Card>
  );
                }
