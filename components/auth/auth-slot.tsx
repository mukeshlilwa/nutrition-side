"use client";

import { useEffect, useState } from "react";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { isAuthenticated } from "@/lib/auth/session";

export function AuthSlot({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function sync() {
      setHidden(isAuthenticated());
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);

    return () => {
      window.removeEventListener(SESSION_CHANGE_EVENT, sync);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return children;
}
