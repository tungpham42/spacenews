"use client";

import { useSearchParams } from "next/navigation";
import { SearchIcon } from "./Icons";

export function HeaderSearch() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const site = params.get("site");

  return (
    <form
      action="/"
      method="get"
      role="search"
      className="relative order-last w-full sm:order-none sm:ml-auto sm:max-w-md sm:flex-1"
    >
      <label htmlFor="site-search" className="sr-only">
        Search stories
      </label>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
      <input
        id="site-search"
        key={q}
        type="search"
        name="q"
        defaultValue={q}
        placeholder="Search launches, missions, rockets"
        enterKeyHint="search"
        autoComplete="off"
        className="h-11 w-full rounded-full border border-line bg-surface pl-12 pr-4 text-base outline-none placeholder:text-muted focus:border-brand focus-visible:ring-4 focus-visible:ring-brand/20"
      />
      {site && <input type="hidden" name="site" value={site} />}
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
}
