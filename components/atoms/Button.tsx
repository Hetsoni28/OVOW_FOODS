import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverted" | "outlined";
  className?: string;
}

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all rounded-none";

  const variants = {
    primary: "bg-tertiary text-white hover:bg-primary hover:text-white",
    secondary: "bg-white text-primary hover:bg-surfaceDark",
    inverted: "bg-neutral text-white hover:bg-black",
    outlined: "border border-primary text-primary hover:bg-primary/5",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={combinedStyles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} suppressHydrationWarning {...rest}>
      {children}
    </button>
  );
}
