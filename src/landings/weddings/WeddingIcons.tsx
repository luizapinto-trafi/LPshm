import type { SVGProps } from "react";

type IconProps = { className?: string; "aria-hidden"?: boolean };

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

export const MenuIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah })} focusable="false">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SearchIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah })}>
    <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="2" />
    <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UserIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah })}>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.5 19c.8-2.2 2.5-3.5 5.5-3.5s4.7 1.3 5.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const HeartIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah })}>
    <path
      d="M12 20s-5.5-3.2-7.5-6.2C3 11.5 3 8.2 5.2 6.4 6.3 5.5 7.6 5.1 8.8 5.2c.9.1 1.7.4 2.2 1l1 1.1 1-1.1c.5-.5 1.3-.9 2.2-1 1.2-.1 2.4.2 3.3 1.1C20 6.1 20 9.4 17.3 12.1 16 13.3 12 20 12 20z"
      fill="currentColor"
    />
  </svg>
);

export const CheckIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah, width: 20, height: 20, viewBox: "0 0 20 20" })}>
    <path
      d="M16.2 5.2 8.4 14 3.8 9.4l1.1-1.1 3.4 3.3 6.6-7.2 1.2 1.1z"
      fill="currentColor"
    />
  </svg>
);

export const XMarkIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah, width: 20, height: 20, viewBox: "0 0 20 20" })}>
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <svg {...base({ className, "aria-hidden": ah, width: 10, height: 10, viewBox: "0 0 10 10" })} width="10" height="10">
    <path d="M2.5 3.5L5 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarRow = ({ className, "aria-hidden": ah = true }: IconProps) => (
  <div className={`flex gap-0.5 text-gold-500 text-xl ${className ?? ""}`} aria-hidden={ah}>
    {"★★★★★".split("").map((s, i) => (
      <span key={i} className="leading-none">
        {s}
      </span>
    ))}
  </div>
);
