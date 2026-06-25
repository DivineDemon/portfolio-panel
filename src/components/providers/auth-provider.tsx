import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { AuthError, fetchSession, login as loginRequest, logout as logoutRequest } from "@/lib/auth";

interface AuthContextValue {
  isAuthenticated: boolean | null;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const session = await fetchSession();
      setIsAuthenticated(session.authenticated);
      return session.authenticated;
    } catch {
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (password: string) => {
    try {
      const session = await loginRequest(password);
      setIsAuthenticated(session.authenticated);
    } catch (error) {
      setIsAuthenticated(false);

      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError("Unable to sign in", 500);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setIsAuthenticated(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      refreshSession,
    }),
    [isAuthenticated, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
