import Link from "next/link";
import { Suspense } from "react";
import { Logomark } from "@/components/Logo";
import { Masthead } from "@/components/Masthead";
import { Pagination } from "@/components/Pagination";
import { SourceFilter } from "@/components/SourceFilter";
import {
  FeatureStory,
  HeroStory,
  ListStory,
} from "@/components/Stories";
import { getArticles, getNewsSites, getTotalPages } from "@/lib/api";
import { btnPrimary } from "@/lib/ui";

interface SearchParams {
  q?: string;
  site?: string;
  page?: string;
}

function ResultsHeading({
  q,
  site,
  page,
  count,
}: {
  q?: string;
  site?: string;
  page: number;
  count: number;
}) {
  let title = "Older stories";
  if (q && site) title = `“${q}” in ${site}`;
  else if (q) title = `Results for “${q}”`;
  else if (site) title = `Latest from ${site}`;

  return (
    <section className="pb-8 pt-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-muted">
        {count.toLocaleString()} {count === 1 ? "story" : "stories"}
        {page > 1 && !q && !site ? ", newest first" : ""}
        {(q || site) && (
          <Link
            href="/"
            className="ml-4 font-semibold text-brand underline underline-offset-4"
          >
            Clear filters
          </Link>
        )}
      </p>
    </section>
  );
}

function EmptyState({
  q,
  hasStories,
}: {
  q?: string;
  hasStories: boolean;
}) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <Logomark className="mx-auto size-14 text-brand/50" />
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
        {hasStories
          ? "There are no stories on this page"
          : q
            ? `No stories match “${q}”`
            : "No stories to show"}
      </h2>
      <p className="mt-2 text-muted">
        {hasStories
          ? "You may have gone past the oldest story."
          : "Try fewer or different words, or search across all sources."}
      </p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        {hasStories ? "Go to the first page" : "Show latest stories"}
      </Link>
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, site, page: pageParam } = await searchParams;
  const page = Math.max(parseInt(pageParam ?? "1", 10) || 1, 1);

  const [data, sites] = await Promise.all([
    getArticles({ page, search: q, newsSite: site }),
    getNewsSites(),
  ]);

  const totalPages = getTotalPages(data.count);
  const filtered = Boolean(q || site);
  const [lead, ...afterLead] = data.results;
  const features = afterLead.slice(0, 3);
  const list = afterLead.slice(3);

  return (
    <>
      {!filtered && page === 1 ? (
        <Masthead sourceCount={sites.length} newestAt={lead?.published_at} />
      ) : (
        <ResultsHeading q={q} site={site} page={page} count={data.count} />
      )}

      <Suspense fallback={<div className="h-11" />}>
        <SourceFilter sites={sites} />
      </Suspense>

      <div className="mt-10">
        {data.results.length === 0 ? (
          <EmptyState q={q} hasStories={data.count > 0} />
        ) : page === 1 ? (
          <>
            <HeroStory article={lead} />
            {features.length > 0 && (
              <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-3">
                {features.map((article) => (
                  <FeatureStory key={article.id} article={article} />
                ))}
              </div>
            )}
            {list.length > 0 && (
              <section className="mt-16" aria-labelledby="more-stories">
                <h2
                  id="more-stories"
                  className="font-display text-2xl font-bold tracking-tight"
                >
                  More stories
                </h2>
                <div className="mt-4 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((article) => (
                    <ListStory key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((article) => (
              <FeatureStory key={article.id} article={article} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          search={q}
          site={site}
        />
      </div>
    </>
  );
}
