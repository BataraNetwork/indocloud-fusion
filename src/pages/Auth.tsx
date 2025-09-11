import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useAuthActions } from "@/hooks/useAuthActions";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, handleSignIn, handleSignUp, handleResetPassword } = useAuthActions();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <AuthLayout>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <SignInForm 
            onSubmit={handleSignIn}
            onResetPassword={handleResetPassword}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        <TabsContent value="signup">
          <SignUpForm 
            onSubmit={handleSignUp}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}