export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="6.5" fill="currentColor" />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="6"
        transform="rotate(-25 16 16)"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="28.7" cy="10.1" r="2.7" fill="var(--sun)" />
    </svg>
  );
}
