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

  const {
    isLoading,
    error,
    handleSignIn,
    handleSignUp,
    handleResetPassword,
  } = useAuthActions();

  // Redirect jika user sudah login
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <AuthLayout>
      <Tabs defaultValue="signin" className="w-full" aria-label="Authentication Tabs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* Sign In */}
        <TabsContent value="signin">
          <SignInForm
            onSubmit={handleSignIn}
            onResetPassword={handleResetPassword}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>

        {/* Sign Up */}
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
