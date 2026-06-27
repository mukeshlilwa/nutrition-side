"use client";

import { useEffect, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { getStoredUser } from "@/lib/auth/session";

type GetStartedButtonProps = Omit<ButtonProps, "href" | "children"> & {
  loggedOutLabel?: string;
  loggedInLabel?: string;
};

export function GetStartedButton({
  loggedOutLabel = "Get Started",
  loggedInLabel = "Contact Us",
  ...props
}: GetStartedButtonProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync() {
      setLoggedIn(!!getStoredUser());
      setReady(true);
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, sync);
  }, []);

  const href = ready && loggedIn ? "/contact" : "/register";
  const label = ready && loggedIn ? loggedInLabel : loggedOutLabel;

  return (
    <Button href={href} {...props}>
      {label}
    </Button>
  );
}
