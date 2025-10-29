import type { User } from "firebase/auth";

const FALLBACK_NAME = "Sign in";
const FALLBACK_SUBTITLE = "Tap to continue";

const buildInitials = (name: string) => {
  const cleanName = name.trim();
  if (!cleanName) return "SI";

  const parts = cleanName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) return "SI";

  const initials = parts
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "SI";
};

export const deriveUserProfile = (user: User | null) => {
  if (!user) {
    return {
      name: FALLBACK_NAME,
      subtitle: FALLBACK_SUBTITLE,
      initials: "SI",
      isAuthenticated: false,
    };
  }

  const displayName =
    user.displayName?.trim() ||
    user.email?.split("@")[0]?.replace(/\W+/g, " ").trim() ||
    "Account";

  const subtitle = user.email ?? FALLBACK_SUBTITLE;

  return {
    name: displayName,
    subtitle,
    initials: buildInitials(displayName),
    isAuthenticated: true,
  };
};

