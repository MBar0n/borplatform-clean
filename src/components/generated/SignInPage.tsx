import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { SignInCard } from "./SignInCard";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { deriveUserProfile } from "@/lib/auth/user";
import { Footer } from "@/components/shared/Footer";

const navigateTo = (page: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("navigate", {
      detail: { page },
    })
  );
};

const friendlyMessage = (error: unknown) => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: string }).message);
  }
  return "Something went wrong. Please try again.";
};

export const SignInPage = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const profile = deriveUserProfile(user);
  const accountLabel = user?.email ?? user?.displayName ?? profile.name;

  useEffect(() => {
    if (loading) return;

    if (user) {
      setStatus("success");
      setStatusMessage(`Signed in as ${accountLabel}`);
    } else if (status === "success") {
      setStatus("idle");
      setStatusMessage(null);
    }
  }, [accountLabel, loading, status, user]);

  const handleSignIn = async (email: string, password: string) => {
    if (user) {
      setStatus("success");
      setStatusMessage(`Already signed in as ${accountLabel}`);
      return;
    }

    setStatus("idle");
    setStatusMessage(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInEmail = userCredential.user.email ?? email;
      setStatus("success");
      setStatusMessage(`Signed in as ${signedInEmail}`);
    } catch (error) {
      setStatus("error");
      setStatusMessage(friendlyMessage(error));
    }
  };

  const handleForgotPassword = async (email: string) => {
    setStatus("idle");
    setStatusMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
      setStatusMessage(`Password reset link sent to ${email}`);
    } catch (error) {
      setStatus("error");
      setStatusMessage(friendlyMessage(error));
    }
  };

  const handleNavigateToSignUp = () => {
    navigateTo("sign-up");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-4 text-center">
        <h2 className="text-4xl font-semibold text-primary">BOR Platform</h2>
        <p className="text-muted-foreground">
          Manage your revenue operations in one secure workspace.
        </p>
      </div>

      <div className="mt-8 w-full flex flex-col items-center space-y-4">
        {loading && !user ? (
          <div className="w-full max-w-md rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground bg-muted/40">
            Checking account&hellip;
          </div>
        ) : statusMessage ? (
          <div
            className={`w-full max-w-md rounded-lg border px-4 py-3 text-sm ${
              status === "success"
                ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                : "border-destructive/40 bg-destructive/10 text-destructive"
            }`}
          >
            {statusMessage}
          </div>
        ) : null}

        <SignInCard
          onSignIn={handleSignIn}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleNavigateToSignUp}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
