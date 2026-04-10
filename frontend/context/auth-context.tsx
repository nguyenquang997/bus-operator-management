"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ApiError } from "@/services/api-client";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/storage";
import type { AuthUser, LoginRequest } from "@/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
  reloadMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const reloadMe = async () => {
    try {
      const me = await authService.me();
      setUser(me);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearAccessToken();
      }
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = getAccessToken();
      if (!token) {
        setIsReady(true);
        return;
      }

      try {
        await reloadMe();
      } catch {
        clearAccessToken();
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  const login = async (payload: LoginRequest) => {
    const response = await authService.login(payload);
    setAccessToken(response.accessToken);
    await reloadMe();
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
    router.push("/login");
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: !!user,
      login,
      logout,
      reloadMe
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
