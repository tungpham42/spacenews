"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Publishers most readers know; shown first when the API lists them.
const PREFERRED = [
  "NASA",
  "SpaceNews",
  "Space.com",
  "Spaceflight Now",
  "NASASpaceflight",
  "European Spaceflight",
  "Arstechnica",
  "ESA",
  "SpaceX",
  "Blue Origin",
];

const QUICK_COUNT = 8;

function pickQuick(sites: string[], active: string): string[] {
  const preferred = PREFERRED.map((name) =>
    sites.find((s) => s.toLowerCase() === name.toLowerCase()),
  ).filter((s): s is string => Boolean(s));
  const rest = sites.filter((s) => !preferred.includes(s));
  let quick = [...preferred, ...rest].slice(0, QUICK_COUNT);
  if (active && !quick.includes(active)) {
    quick = [active, ...quick.slice(0, QUICK_COUNT - 1)];
  }
  return quick;
}

export function SourceFilter({ sites }: { sites: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const active = params.get("site") ?? "";

  if (sites.length === 0) return null;

  const hrefFor = (site: string) => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (site) next.set("site", site);
    const qs = next.toString();
    return qs ? `/?${qs}` : "/";
  };

  const quick = pickQuick(sites, active);
  const more = sites.filter((s) => !quick.includes(s));

  const chip = (isActive: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? "border-ink bg-ink text-paper"
        : "border-line bg-surface text-ink hover:border-brand"
    }`;

  return (
    <nav
      aria-label="Filter by news source"
      className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none]"
    >
      <Link
        href={hrefFor("")}
        aria-current={active === "" ? "page" : undefined}
        className={chip(active === "")}
      >
        All sources
      </Link>
      {quick.map((site) => (
        <Link
          key={site}
          href={hrefFor(site)}
          aria-current={active === site ? "page" : undefined}
          className={chip(active === site)}
        >
          {site}
        </Link>
      ))}
      {more.length > 0 && (
        <select
          aria-label="More sources"
          value=""
          onChange={(e) => {
            if (e.target.value) router.push(hrefFor(e.target.value));
          }}
          className="shrink-0 cursor-pointer rounded-full border border-dashed border-line bg-transparent px-4 py-2 text-sm font-semibold text-muted hover:border-brand hover:text-ink"
        >
          <option value="">More sources</option>
          {more.map((site) => (
            <option key={site} value={site}>
              {site}
            </option>
          ))}
        </select>
      )}
    </nav>
  );
}
