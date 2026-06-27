import { cn } from "@/lib/utils";

type FormAlertProps = {
  variant?: "error" | "success";
  children: React.ReactNode;
  className?: string;
};

export function FormAlert({
  variant = "error",
  children,
  className,
}: FormAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-[13px] leading-relaxed",
        variant === "error" &&
          "border-chocolate-cosmos-200 bg-chocolate-cosmos-50 text-chocolate-cosmos-600",
        variant === "success" &&
          "border-logo-green-200 bg-logo-green-50 text-logo-green-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

type FieldErrorProps = {
  message?: string;
};

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return <p className="text-[12px] text-chocolate-cosmos-500">{message}</p>;
}
