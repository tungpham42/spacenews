type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
    </svg>
  );
}
