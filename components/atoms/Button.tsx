"use client";

import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDragStart" | "onDragEnd" | "onDrag"> {
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
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors rounded-none";

  const variants = {
    primary: "bg-tertiary text-white hover:bg-[#0B2118] hover:text-white",
    secondary: "bg-white text-primary hover:bg-[#E8E1D5]",
    inverted: "bg-neutral text-white hover:bg-black",
    outlined: "border border-primary text-primary hover:bg-primary/5",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("#")) {
      return (
        <motion.a 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          href={href} 
          className={combinedStyles}
        >
          {children}
        </motion.a>
      );
    }
    
    // Support framer-motion with Next.js Link without legacyBehavior
    const MotionLink = motion.create ? motion.create(Link) : (motion as any)(Link);
    
    return (
      <MotionLink 
        href={href}
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }} 
        className={combinedStyles}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }} 
      whileTap={{ scale: 0.98 }} 
      onClick={onClick} 
      className={combinedStyles} 
      suppressHydrationWarning 
      {...rest}
    >
      {children}
    </motion.button>
  );
}
