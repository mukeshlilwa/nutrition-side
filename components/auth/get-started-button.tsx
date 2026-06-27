"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button, type ButtonProps } from "@/components/ui/button";

type GetStartedButtonProps = Omit<ButtonProps, "href" | "children"> & {
  loggedOutLabel?: string;
  loggedInLabel?: string;
};

export function GetStartedButton({
  loggedOutLabel = "Get Started",
  loggedInLabel = "Contact Us",
  ...props
}: GetStartedButtonProps) {
  const { ready, isLoggedIn } = useAuth();

  const href = ready && isLoggedIn ? "/contact" : "/register";
  const label = ready && isLoggedIn ? loggedInLabel : loggedOutLabel;

  return (
    <Button href={href} {...props}>
      {label}
    </Button>
  );
}
