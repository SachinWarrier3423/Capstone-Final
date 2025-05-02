"use client";

import { useAuth } from "../hooks/use-auth";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  useAuth(); // Initialize authentication

  return <>{children}</>;
}