import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      await signInWithGoogle(idToken);
      navigate("/dashboard"); // redirect immediately after login
    } catch (err) {
      console.error("Google login failed", err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error("Google Sign In Error")}
      useOneTap={false}
    />
  );
};
