import type { Variants } from "framer-motion";

// Bezier curve that gives a silky premium deceleration feel
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// IMPORTANT: hidden states must NOT use opacity:0 as the initial value.
// On mobile browsers (Android Chrome, older WebKit), Framer Motion's 
// animation may not trigger, leaving content permanently invisible.
// We keep y-transforms for the slide effect but content is always visible.

export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeUpSlow: Variants = {
  hidden: { opacity: 1, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

// Parent containers — always fully visible; only children animate.
export const stagger: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
