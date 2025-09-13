import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, User, Loader2, Zap } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (email: string, password: string, displayName: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function SignUpForm({ onSubmit, isLoading, error }: SignUpFormProps) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [validationError, setValidationError] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      return "Passwords don't match";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationMsg = validateForm();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }
    setValidationError("");
    await onSubmit(form.email, form.password, form.displayName);
  };

  const displayError = validationError || error;

  return (
    <Card className="bg-card/50 backdrop-blur border-accent/30">
      <CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display Name */}
          <FormField
            id="display-name"
            label="Display Name"
            type="text"
            icon={<User aria-hidden="true" />}
            value={form.displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
            placeholder="Your Name"
          />

          {/* Email */}
          <FormField
            id="signup-email"
            label="Email"
            type="email"
            icon={<Mail aria-hidden="true" />}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your.email@example.com"
            required
            autoComplete="email"
          />

          {/* Password */}
          <FormField
            id="signup-password"
            label="Password"
            type="password"
            icon={<Lock aria-hidden="true" />}
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <FormField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            icon={<Lock aria-hidden="true" />}
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          {/* Error Alert */}
          {displayError && (
            <Alert variant="destructive">
              <AlertDescription>{displayError}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>

        {/* Terms */}
        <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-accent/30">
          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our decentralized cloud terms and join the IndoBlockCloud network.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/** 🔹 Reusable FormField Component */
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: React.ReactNode;
}

function FormField({ id, label, icon, className, ...props }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input id={id} className={`pl-10 ${className || ""}`} {...props} />
      </div>
    </div>
  );
          }
