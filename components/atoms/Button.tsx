"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion";

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
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Pull 30% towards mouse
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors rounded-none relative";

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
          ref={ref as any}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.92 }} 
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
        ref={ref as any}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        href={href}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.92 }} 
        className={combinedStyles}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button 
      ref={ref as any}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.92 }} 
      onClick={onClick} 
      className={combinedStyles} 
      suppressHydrationWarning 
      {...rest}
    >
      {children}
    </motion.button>
  );
}
