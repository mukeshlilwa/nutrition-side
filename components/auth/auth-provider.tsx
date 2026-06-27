"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import {
  getStoredUser,
  hasValidSession,
  isAuthenticated,
} from "@/lib/auth/session";
import type { UserResponse } from "@/types/api";

type AuthContextValue = {
  ready: boolean;
  user: UserResponse | null;
  isAuthed: boolean;
  isLoggedIn: boolean;
  hasToken: boolean;
};

const defaultValue: AuthContextValue = {
  ready: false,
  user: null,
  isAuthed: false,
  isLoggedIn: false,
  hasToken: false,
};

const AuthContext = createContext<AuthContextValue>(defaultValue);

function readAuthState(): AuthContextValue {
  const user = getStoredUser();

  return {
    ready: true,
    user,
    isAuthed: hasValidSession(),
    isLoggedIn: Boolean(user),
    hasToken: isAuthenticated(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthContextValue>(defaultValue);

  useLayoutEffect(() => {
    function sync() {
      setAuth(readAuthState());
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, sync);
  }, []);

  const value = useMemo(() => auth, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
