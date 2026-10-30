import { timeAgo } from "@/lib/format";

const ARC = "M 40 270 C 160 40, 520 -10, 610 120";

/** Home page intro. The orbit arc is the site's one signature animation. */
export function Masthead({
  sourceCount,
  newestAt,
}: {
  sourceCount: number;
  newestAt?: string;
}) {
  const sources =
    sourceCount > 0 ? `${sourceCount} space news sites` : "space news sites";

  return (
    <section className="relative isolate pb-10 pt-12 sm:pt-16">
      <svg
        aria-hidden="true"
        viewBox="0 0 640 320"
        className="pointer-events-none absolute right-0 top-0 -z-10 hidden w-[min(560px,48%)] sm:block"
      >
        <path
          d={ARC}
          fill="none"
          stroke="var(--line)"
          strokeWidth="2"
          strokeDasharray="3 8"
          strokeLinecap="round"
        />
        <path
          d={ARC}
          pathLength="1"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
          className="orbit-arc"
        />
        <g className="orbit-dot">
          <circle cx="610" cy="120" r="22" fill="var(--sun)" opacity="0.28" />
          <circle cx="610" cy="120" r="11" fill="var(--sun)" />
        </g>
      </svg>

      <h1 className="max-w-xl font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-balance">
        Today in spaceflight
      </h1>
      <p className="mt-5 max-w-lg text-lg text-muted text-pretty sm:text-xl">
        Launches, missions and discoveries from {sources}, refreshed every few
        minutes.
      </p>
      {newestAt && (
        <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-sun ring-4 ring-sun/30"
          />
          Newest story {timeAgo(newestAt)}
        </p>
      )}
    </section>
  );
}
