import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { SignUpCard } from "./SignUpCard";
import app, { auth } from "@/lib/firebase";
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
  return "Unable to create account. Please try again.";
};

export const SignUpPage = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const profile = deriveUserProfile(user);
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      const label = user.email ?? user.displayName ?? profile.name;
      setStatus("success");
      setStatusMessage(
        `You're already signed in as ${label}. Sign out before creating a new account.`,
      );
    }
  }, [profile.name, user]);

  const handleSignUp = async (fullName: string, email: string, password: string) => {
    if (user) {
      const label = user.email ?? user.displayName ?? profile.name;
      setStatus("error");
      setStatusMessage(
        `You're already signed in as ${label}. Please sign out to create another account.`,
      );
      return;
    }

    setStatus("idle");
    setStatusMessage(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = fullName.trim();

      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }

      await setDoc(
        doc(db, "users", credential.user.uid),
        {
          displayName: displayName || null,
          email: credential.user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      await sendEmailVerification(credential.user).catch(() => void 0);

      setStatus("success");
      setStatusMessage(
        "Account created successfully. Please check your inbox to verify your email.",
      );
    } catch (error) {
      setStatus("error");
      setStatusMessage(friendlyMessage(error));
    }
  };

  const handleNavigateToSignIn = () => {
    navigateTo("sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-4 text-center">
        <h2 className="text-4xl font-semibold text-primary">Create your BOR account</h2>
        <p className="text-muted-foreground">
          Spin up your workspace to start building prospecting systems.
        </p>
      </div>

      <div className="mt-8 w-full flex flex-col items-center space-y-4">
        {statusMessage ? (
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

        <SignUpCard
          onSignUp={handleSignUp}
          onSignIn={handleNavigateToSignIn}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
