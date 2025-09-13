<                  <import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Lock, 
  User, 
  Loader2,
  Shield,
  Zap
} from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  onResetPassword?: () => Promise<void>;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  displayName?: string;
}

export default function AuthForm({ 
  mode, 
  onSubmit, 
  isLoading, 
  error, 
  onResetPassword 
}: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [validationError, setValidationError] = useState("");

  // Helper untuk handle input
  const handleInputChange =
    (field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      if (validationError) setValidationError("");
    };

  // Validasi form
  const validateForm = (): string | null => {
    if (!formData.email) return "Email is required";
    if (!formData.password) return "Password is required";

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        return "Passwords don't match";
      }
      if (formData.password.length < 6) {
        return "Password must be at least 6 characters";
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation) {
      setValidationError(validation);
      return;
    }
    await onSubmit(formData);
  };

  const displayError = validationError || error;

  // Reusable InputField
  const InputField = ({
    id,
    label,
    type,
    placeholder,
    value,
    icon: Icon,
    onChange,
    required = false,
  }: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    icon: React.ElementType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10"
          required={required}
        />
      </div>
    </div>
  );

  return (
    <Card className="bg-card/50 backdrop-blur border-accent/30">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <InputField
              id="display-name"
              label="Display Name"
              type="text"
              placeholder="Your Name"
              value={formData.displayName}
              icon={User}
              onChange={handleInputChange("displayName")}
            />
          )}

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            icon={Mail}
            onChange={handleInputChange("email")}
            required
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            icon={Lock}
            onChange={handleInputChange("password")}
            required
          />

          {mode === "signup" && (
            <InputField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              icon={Lock}
              onChange={handleInputChange("confirmPassword")}
              required
            />
          )}

          {displayError && (
            <Alert variant="destructive">
              <AlertDescription>{displayError}</AlertDescription>
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
                {mode === "signin" ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              <>
                {mode === "signin" ? (
                  <Shield className="w-4 h-4 mr-2" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                {mode === "signin" ? "Sign In" : "Create Account"}
              </>
            )}
          </Button>

          {mode === "signin" && onResetPassword && (
            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={onResetPassword}
              disabled={isLoading}
            >
              Forgot your password?
            </Button>
          )}
        </form>

        {mode === "signup" && (
          <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-accent/30">
            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our decentralized cloud terms and join the IndoBlockCloud network.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
        }
