import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export const GoogleLoginButton = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard"); // redirect immediately after login
    } catch (err) {
      console.error("Google login failed", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="outline"
      className="w-full h-12 text-base font-normal"
    >
      <Chrome className="h-5 w-5 mr-2" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;

