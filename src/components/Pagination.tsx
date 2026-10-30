import Link from "next/link";
import { btnQuiet } from "@/lib/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface Props {
  page: number;
  totalPages: number;
  search?: string;
  site?: string;
}

export function pageHref(page: number, search?: string, site?: string) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (site) params.set("site", site);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export function Pagination({ page, totalPages, search, site }: Props) {
  if (totalPages <= 1) return null;
  const disabled =
    "inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-semibold text-muted/60";

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-8"
    >
      {page > 1 ? (
        <Link href={pageHref(page - 1, search, site)} className={btnQuiet}>
          <ChevronLeftIcon className="size-4" />
          Newer
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          <ChevronLeftIcon className="size-4" />
          Newer
        </span>
      )}
      <p className="text-sm text-muted">
        Page <span className="font-semibold text-ink">{page}</span> of{" "}
        {totalPages.toLocaleString()}
      </p>
      {page < totalPages ? (
        <Link href={pageHref(page + 1, search, site)} className={btnQuiet}>
          Older
          <ChevronRightIcon className="size-4" />
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          Older
          <ChevronRightIcon className="size-4" />
        </span>
      )}
    </nav>
  );
}
