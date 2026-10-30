import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon, ExternalIcon } from "@/components/Icons";
import { ShareButton } from "@/components/ShareButton";
import { ListStory, Meta, Thumb } from "@/components/Stories";
import { getArticle, getArticles } from "@/lib/api";
import { btnPrimary } from "@/lib/ui";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(Number(id)).catch(() => null);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const article = await getArticle(numericId);
  if (!article) notFound();

  const more = await getArticles({ newsSite: article.news_site, limit: 5 })
    .then((res) => res.results.filter((a) => a.id !== article.id).slice(0, 4))
    .catch(() => []);

  return (
    <article className="mx-auto max-w-4xl pt-8 sm:pt-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink"
      >
        <ChevronLeftIcon className="size-4" />
        Latest stories
      </Link>

      <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <Meta article={article} className="text-base" />
        {article.authors.length > 0 && (
          <span className="text-muted">
            By {article.authors.map((a) => a.name).join(", ")}
          </span>
        )}
      </div>

      {article.image_url && (
        <Thumb
          src={article.image_url}
          priority
          sizes="(min-width: 896px) 896px, 100vw"
          className="mt-8 aspect-[16/9] rounded-3xl"
        />
      )}

      <div className="mt-8 max-w-2xl">
        <p className="text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">
          {article.summary}
        </p>
        <p className="mt-4 text-muted">
          This is a short summary. The full story is on {article.news_site}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className={btnPrimary}
          >
            Read the full story on {article.news_site}
            <ExternalIcon className="size-4" />
          </a>
          <ShareButton title={article.title} />
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-20" aria-labelledby="more-from-source">
          <h2
            id="more-from-source"
            className="font-display text-2xl font-bold tracking-tight"
          >
            More from {article.news_site}
          </h2>
          <div className="mt-4 grid gap-x-10 md:grid-cols-2">
            {more.map((a) => (
              <ListStory key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
