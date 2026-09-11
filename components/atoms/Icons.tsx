/**
 * OVOW FOODS — Hand-Crafted SVG Icon Library
 * All icons drawn by hand. No external icon library used.
 * Each icon accepts standard SVG props + optional className and size.
 */

import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

const defaults = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconShoppingBag({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export function IconPlus({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconMinus({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconCheck({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconCheckCircle({ size = 20, className, ...p }: IconProps) {
  return (
    // Premium leaf/check — organic feel for a food brand
    <svg {...defaults(size)} className={className} {...p}>
      {/* Outer square rotated 45° = diamond */}
      <path d="M12 2 L22 12 L12 22 L2 12 Z" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Clean checkmark inside */}
      <path d="M8.5 12l2.5 2.5 4.5-4.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChili({ size = 20, className, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...p}>
      {/* Curved green stem */}
      <path
        d="M12 4C12 4 12 2.5 13.5 2C14.5 1.5 15.5 2 15.5 2"
        stroke="#16a34a"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Green calyx / cap at base of stem */}
      <path
        d="M10.5 6.5C10.5 6.5 11.5 5 13 5C13.8 5 14.5 5.5 14.5 5.5"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Red chili body - elongated curved pepper shape pointing down-right */}
      <path
        d="M13 6C13.5 6 14.5 6.5 15 7.5C16 9.5 16 12 15 14.5C14 17 12.5 19 11 20C9.5 21 8 21 7.5 20C7 19 7.5 17.5 9 16C10.5 14.5 11.5 12.5 11.5 10.5C11.5 8.5 11 7 11 7C11 7 12 6 13 6Z"
        fill="#dc2626"
        stroke="#b91c1c"
        strokeWidth="0.5"
      />
      {/* Highlight line for realism */}
      <path
        d="M12.5 8C12.5 8 13.5 9.5 13.5 12"
        stroke="#ef4444"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

export function IconX({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconArrowRight({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconArrowLeft({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function IconChevronRight({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function IconChevronDown({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function IconChevronUp({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export function IconChevronLeft({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function IconStar({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function IconMapPin({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconPhone({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

export function IconMail({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function IconClock({ size = 20, className, ...p }: IconProps) {
  return (
    // Elegant hourglass — premium metaphor for prep time
    <svg {...defaults(size)} className={className} {...p}>
      {/* Top & bottom bars */}
      <path d="M6 3h12" strokeLinecap="round" />
      <path d="M6 21h12" strokeLinecap="round" />
      {/* Hourglass body */}
      <path d="M6 3c0 5 6 7 6 9s-6 4-6 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 3c0 5-6 7-6 9s6 4 6 9" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sand dot in middle */}
      <circle cx="12" cy="12" r="1" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

export function IconCalendar({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function IconTruck({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

export function IconUser({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function IconSearch({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconMenu({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IconSquareMenu({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  );
}

export function IconPlay({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function IconVolume2({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  );
}

export function IconVolumeX({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function IconFlame({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.507.333-2.78.5-4a2 2 0 001.5 1.5z" />
    </svg>
  );
}

export function IconLeaf({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M11 20A7 7 0 015 9.9C3.3 7.8 3 6 3 6s2.8.3 5 2.4A7 7 0 0111 20z" />
      <path d="M11 20c0-5.523 3-9 9-11 0 0 .5 7-4 11" />
      <line x1="11" y1="20" x2="11" y2="12" />
    </svg>
  );
}

export function IconShieldCheck({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function IconPackage({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function IconCopy({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function IconNavigation({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

export function IconExternalLink({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function IconAlertCircle({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function IconAlertTriangle({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconLoader({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={`animate-spin ${className ?? ""}`} {...p}>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

export function IconQrCode({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
      <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDownload({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function IconShare({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function IconSmartphone({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function IconBanknote({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

export function IconReceipt({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

export function IconReceiptText({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

export function IconMessageSquare({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

export function IconScale({ size = 20, className, ...p }: IconProps) {
  return (
    // Classic balance scale — universally recognised for portion/weight
    <svg {...defaults(size)} className={className} {...p}>
      {/* Central pole */}
      <line x1="12" y1="3" x2="12" y2="20" strokeLinecap="round" />
      {/* Horizontal beam */}
      <line x1="3" y1="8" x2="21" y2="8" strokeLinecap="round" />
      {/* Left pan rope + arc */}
      <line x1="5" y1="8" x2="5" y2="13" strokeLinecap="round" />
      <path d="M2 13h6" strokeLinecap="round" />
      {/* Right pan rope + arc */}
      <line x1="19" y1="8" x2="19" y2="13" strokeLinecap="round" />
      <path d="M16 13h6" strokeLinecap="round" />
      {/* Base */}
      <path d="M9 20h6" strokeLinecap="round" />
    </svg>
  );
}

export function IconSlidersHorizontal({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <line x1="21" y1="4" x2="14" y2="4" />
      <line x1="10" y1="4" x2="3" y2="4" />
      <line x1="21" y1="12" x2="12" y2="12" />
      <line x1="8" y1="12" x2="3" y2="12" />
      <line x1="21" y1="20" x2="16" y2="20" />
      <line x1="12" y1="20" x2="3" y2="20" />
      <line x1="14" y1="2" x2="14" y2="6" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="16" y1="18" x2="16" y2="22" />
    </svg>
  );
}

export function IconChefHat({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 0111.18 0A4 4 0 0118 13.87V21H6z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

export function IconUtensilsCrossed({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M3 3l18 18M12.67 6.67L14 8l-2 2 6 6a2 2 0 010 2.83A2 2 0 0115.17 19L9 12.83 7 15l-1.33-1.33L9 10 3 4" />
      <path d="M21 3L11 13M9 3v4l2 2-4 4-5-5 4-4 2 2V3" />
    </svg>
  );
}

export function IconImages({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export function IconInstagram({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function IconFacebook({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

export function IconHome({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconBellOff({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M13.73 21a2 2 0 01-3.46 0M18.63 13A17.89 17.89 0 0118 8M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14M18 8a6 6 0 00-9.33-5" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function IconTrash({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

export function IconSparkles({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
      <path d="M19 3l.6 1.8L21.4 5.4l-1.8.6L19 8l-.6-1.8L16.6 5.4l1.8-.6L19 3z" />
    </svg>
  );
}

export function IconBell({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

export function IconCamera({ size = 20, className, ...p }: IconProps) {
  return (
    <svg {...defaults(size)} className={className} {...p}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

// ── Availability Status Icons ────────────────────────────────────────────────

/** 🟢 Available — filled green circle with animated outer ping ring */
export function IconStatusAvailable({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* Ping animation ring */}
      <span
        className="absolute inline-flex rounded-full bg-[#2E7D4F] opacity-50 animate-ping"
        style={{ width: size, height: size }}
      />
      {/* Solid filled circle */}
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className="relative z-10">
        <circle cx="6" cy="6" r="5.5" fill="#2E7D4F" />
        {/* White check mark */}
        <polyline
          points="3.5,6.2 5.2,8 8.5,4"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

/** 🟠 Limited — amber circle with exclamation mark */
export function IconStatusLimited({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={`shrink-0 ${className ?? ""}`}>
      {/* Outer filled amber circle */}
      <circle cx="6" cy="6" r="5.5" fill="#F59E0B" />
      {/* Exclamation mark stem */}
      <line x1="6" y1="3.5" x2="6" y2="6.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Exclamation mark dot */}
      <circle cx="6" cy="8.5" r="0.75" fill="white" />
    </svg>
  );
}

/** 🔴 Sold Out — red circle with X mark */
export function IconStatusSoldOut({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={`shrink-0 ${className ?? ""}`}>
      {/* Outer filled red circle */}
      <circle cx="6" cy="6" r="5.5" fill="#DC2626" />
      {/* X strokes */}
      <line x1="4" y1="4" x2="8" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="4" x2="4" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Swaminarayan Icon ─────────────────────────────────────────────────────────

/**
 * Redesigned Swaminarayan icon — bold 8-point mandala outer ring, fat 6-petal
 * lotus, curved Urdhvapundra tilak stripes, saffron chandlo with specular
 * highlight. Reads clearly at any size ≥ 24 px.
 */
export function IconSwaminarayan({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>

      {/* ── Deep-green background disc ── */}
      <circle cx="12" cy="12" r="12" fill="#0B2118" />

      {/* ── Bold outer gold ring ── */}
      <circle cx="12" cy="12" r="11.1" stroke="#C9A24A" strokeWidth="1.2" fill="none" />

      {/* ── 8 mandala accent dots on the ring (cardinal + diagonal) ── */}
      {/* Top */}
      <circle cx="12"   cy="2.5"  r="0.75" fill="#C9A24A" />
      {/* Top-right */}
      <circle cx="18.7" cy="5.3"  r="0.75" fill="#C9A24A" />
      {/* Right */}
      <circle cx="21.5" cy="12"   r="0.75" fill="#C9A24A" />
      {/* Bottom-right */}
      <circle cx="18.7" cy="18.7" r="0.75" fill="#C9A24A" />
      {/* Bottom */}
      <circle cx="12"   cy="21.5" r="0.75" fill="#C9A24A" />
      {/* Bottom-left */}
      <circle cx="5.3"  cy="18.7" r="0.75" fill="#C9A24A" />
      {/* Left */}
      <circle cx="2.5"  cy="12"   r="0.75" fill="#C9A24A" />
      {/* Top-left */}
      <circle cx="5.3"  cy="5.3"  r="0.75" fill="#C9A24A" />

      {/* ── Inner ring ── */}
      <circle cx="12" cy="12" r="9.3" stroke="#C9A24A" strokeWidth="0.35" fill="none" />

      {/* ── 6 bold lotus petals ── */}
      {/* Top petal */}
      <path d="M10.6 10 Q11.3 5 12 4.2 Q12.7 5 13.4 10 Z"
        fill="#C9A24A" fillOpacity="0.82" />
      {/* Top-right petal */}
      <path d="M13.3 10.5 Q17.5 7 18.4 7.5 Q18.2 8.8 14.6 11.8 Z"
        fill="#C9A24A" fillOpacity="0.82" />
      {/* Bottom-right petal */}
      <path d="M13.8 13.8 Q17.5 17.2 17.5 18.2 Q16.2 18.6 12.8 15.4 Z"
        fill="#C9A24A" fillOpacity="0.82" />
      {/* Bottom petal */}
      <path d="M10.6 14 Q11.3 19 12 19.8 Q12.7 19 13.4 14 Z"
        fill="#C9A24A" fillOpacity="0.82" />
      {/* Bottom-left petal */}
      <path d="M10.2 13.8 Q6.5 17.2 6.5 18.2 Q7.8 18.6 11.2 15.4 Z"
        fill="#C9A24A" fillOpacity="0.82" />
      {/* Top-left petal */}
      <path d="M10.7 10.5 Q6.5 7 5.6 7.5 Q5.8 8.8 9.4 11.8 Z"
        fill="#C9A24A" fillOpacity="0.82" />

      {/* ── Centre mask — hides raw petal bases for clean layering ── */}
      <circle cx="12" cy="12" r="6.2" fill="#0B2118" />

      {/* ── Inner ornamental ring ── */}
      <circle cx="12" cy="12" r="5.7" stroke="#C9A24A" strokeWidth="0.5" fill="none" />

      {/* ── Tilak left stripe — curved path (not a plain rectangle) ── */}
      <path
        d="M10.1 9.6 C 9.7 11.5 9.7 14 10.1 16.4
           C 10.3 17 11.1 17 11.4 16.4
           C 11.8 14 11.8 11.5 11.5 9.6
           C 11.3 8.9 10.3 8.9 10.1 9.6 Z"
        fill="#C9A24A"
      />

      {/* ── Tilak right stripe ── */}
      <path
        d="M12.5 9.6 C 12.2 11.5 12.2 14 12.5 16.4
           C 12.8 17 13.6 17 13.8 16.4
           C 14.2 14 14.3 11.5 13.9 9.6
           C 13.7 8.9 12.7 8.9 12.5 9.6 Z"
        fill="#C9A24A"
      />

      {/* ── Saffron chandlo (sacred dot) above tilak ── */}
      <circle cx="12" cy="8" r="2.2" fill="#F97316" />
      {/* Specular highlight for 3-D feel */}
      <circle cx="11.2" cy="7.3" r="0.75" fill="white" fillOpacity="0.4" />

    </svg>
  );
}

// ── Extra Paneer Icon — stylised cube with texture lines ──────────────────────
export function IconPaneer({ size = 24, className, ...p }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} {...p}
    >
      {/* Main block face (front) */}
      <path d="M3 8 L12 5 L21 8 L21 17 L12 20 L3 17 Z" />
      {/* Top face */}
      <path d="M3 8 L12 11 L21 8" />
      {/* Vertical spine */}
      <line x1="12" y1="11" x2="12" y2="20" />
      {/* Texture cut lines on front-left face */}
      <line x1="5" y1="11.5" x2="11" y2="13.5" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="5" y1="14" x2="11" y2="16" strokeWidth="0.9" strokeOpacity="0.6" />
      {/* Texture cut lines on front-right face */}
      <line x1="13" y1="13.5" x2="19" y2="11.5" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="13" y1="16" x2="19" y2="14" strokeWidth="0.9" strokeOpacity="0.6" />
    </svg>
  );
}

// ── Extra Cheese Icon — classic wedge with holes ──────────────────────────────
export function IconCheese({ size = 24, className, ...p }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} {...p}
    >
      {/* Cheese wedge outline */}
      <path d="M2 17 L12 4 L22 17 Z" />
      {/* Base line */}
      <line x1="2" y1="17" x2="22" y2="17" />
      {/* Cheese holes */}
      <circle cx="12" cy="14" r="1.3" />
      <circle cx="8.5" cy="13" r="0.9" />
      <circle cx="15.5" cy="13" r="0.9" />
    </svg>
  );
}

// ── Extra Raita Icon — bowl with yogurt ripple + garnish dot ─────────────────
export function IconRaita({ size = 24, className, ...p }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
      className={className} {...p}
    >
      {/* Bowl body */}
      <path d="M4 9 Q4 19 12 19 Q20 19 20 9 Z" />
      {/* Bowl rim */}
      <path d="M3 9 Q3 7 12 7 Q21 7 21 9" />
      {/* Yogurt surface ripple */}
      <path d="M8 11 Q10 9.5 12 11 Q14 12.5 16 11" strokeWidth="1.2" strokeOpacity="0.7" />
      {/* Garnish dot (jeera / masala) */}
      <circle cx="12" cy="14" r="1" fill="currentColor" strokeWidth="0" />
      {/* Two small garnish dots */}
      <circle cx="9" cy="13.5" r="0.6" fill="currentColor" strokeWidth="0" />
      <circle cx="15" cy="13.5" r="0.6" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}
