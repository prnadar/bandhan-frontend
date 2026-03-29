import { useState, useEffect } from "react";

export type AuthState = "guest" | "unverified" | "verified";

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>("guest");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("auth_token");
    if (!token) { setState("guest"); return; }

    try {
      const stored = localStorage.getItem("user_profile");
      if (stored) {
        const profile = JSON.parse(stored);
        setState(profile.id_verified ? "verified" : "unverified");
      } else {
        setState("unverified"); // logged in but no profile fetched yet
      }
    } catch {
      setState("unverified");
    }
  }, []);

  return state;
}

/** Returns the right CTA label/href based on auth state */
export function getCTA(state: AuthState): { label: string; href: string; locked: string } {
  if (state === "guest") return {
    label: "Register to View Profiles",
    href: "/auth/register",
    locked: "🔒 Register to view",
  };
  if (state === "unverified") return {
    label: "Please Verify Your ID to View Profiles",
    href: "/profile/me",
    locked: "⚠️ Verify ID to view",
  };
  return {
    label: "Browse Profiles",
    href: "/matches",
    locked: "View Profile",
  };
}
