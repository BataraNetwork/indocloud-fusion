import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm, { type AuthFormData } from "@/components/auth/AuthForm";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn, signUp, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (data: AuthFormData) => {
    setIsLoading(true);
    setError("");

    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to IndoBlockCloud",
      });
      navigate('/');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (data: AuthFormData) => {
    setIsLoading(true);
    setError("");

    const { data: authData, error } = await signUp(data.email, data.password, data.displayName);
    
    if (error) {
      setError(error.message);
      toast({
        title: "Registration Failed", 
        description: error.message,
        variant: "destructive",
      });
    } else {
      const message = authData?.user?.email_confirmed_at 
        ? "Account created successfully! You can now sign in."
        : "Account created! Please check your email to verify your account.";
        
      toast({
        title: "Account Created!",
        description: message,
      });
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setError("");
    
    // For password reset, we'll use a simple prompt for now
    const email = window.prompt("Enter your email address:");
    if (!email) {
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Reset Sent",
        description: "Check your email for reset instructions.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <AuthForm
              mode="signin"
              onSubmit={handleSignIn}
              isLoading={isLoading}
              error={error}
              onResetPassword={handleResetPassword}
            />
          </TabsContent>

          <TabsContent value="signup">
            <AuthForm
              mode="signup"
              onSubmit={handleSignUp}
              isLoading={isLoading}
              error={error}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}