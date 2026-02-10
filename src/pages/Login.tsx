import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, Store, LogIn, Chrome } from "lucide-react";
import gearImage from "/gear.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handler for Google login
  const handleGoogleSuccess = async () => {
    setError(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Sign in error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Google. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={gearImage}
              alt="StockKenya"
              className="h-12 w-12 rounded-full object-cover border-2 border-primary"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground leading-none">
                StockKenya
              </span>
              <span className="text-sm text-muted-foreground">
                Inventory Management
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <div className="space-y-4">
            {loading || isSigningIn ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <Button
                onClick={handleGoogleSuccess}
                variant="outline"
                className="w-full h-12 text-base font-normal"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Demo Login */}
            <Button
              variant="ghost"
              className="w-full h-12 text-base"
              onClick={() => navigate("/dashboard")}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Continue as Guest (Demo)
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span className="text-primary font-medium">
              Just continue with Google
            </span>
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>500+ Shops</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 p-8">
        <div className="max-w-lg text-center space-y-6">
          <img
            src="/hero.jpeg"
            alt="StockKenya Dashboard"
            className="rounded-2xl shadow-2xl w-full"
          />

          <h2 className="text-2xl font-bold text-foreground">
            Manage your shop with confidence
          </h2>

          <p className="text-muted-foreground">
            Join hundreds of Kenyan shop owners who trust StockKenya to manage
            inventory, track sales, and grow their business.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>WhatsApp support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

