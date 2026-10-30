import Link from "next/link";
import { Suspense } from "react";
import { HeaderSearch } from "./HeaderSearch";
import { Logomark } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight"
        >
          <Logomark className="size-8 text-brand" />
          Space Daily
        </Link>
        <Suspense
          fallback={
            <div className="order-last h-11 w-full sm:order-none sm:ml-auto sm:max-w-md sm:flex-1" />
          }
        >
          <HeaderSearch />
        </Suspense>
      </div>
    </header>
  );
}
