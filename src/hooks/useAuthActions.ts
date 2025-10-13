import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const showError = (title: string, description: string) => {
    setError(description);
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showSuccess = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        showError("Login Failed", error.message || JSON.stringify(error));
      } else {
        showSuccess("Welcome back!", "Successfully logged in to BataraCloud");
        navigate("/");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      showError("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, displayName?: string) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signUp(email, password, displayName);
      
      if (error) {
        showError("Registration Failed", error.message || JSON.stringify(error));
      } else {
        showSuccess("Account Created!", "Please check your email to verify your account.");
        
        // optional: auto navigate if session exists
        if (data?.session) {
          navigate("/");
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      showError("Registration Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!email) {
      showError("Reset Failed", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        showError("Reset Failed", error.message || JSON.stringify(error));
      } else {
        showSuccess("Password Reset Sent", "Check your email for reset instructions.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      showError("Reset Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
  };
};
