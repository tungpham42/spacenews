import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/api";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
      <Link href={`/article/${article.id}`} className="block">
        <div className="relative aspect-video bg-stone-200 dark:bg-stone-800">
          {article.image_url && (
            <Image
              src={article.image_url}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition group-hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {article.news_site}
          </span>
          <time dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
        </div>
        <h2 className="text-lg font-bold leading-snug">
          <Link
            href={`/article/${article.id}`}
            className="hover:text-indigo-500"
          >
            {article.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm text-stone-600 dark:text-stone-400">
          {article.summary}
        </p>
      </div>
    </article>
  );
}

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-stone-200 bg-white md:grid-cols-2 dark:border-stone-800 dark:bg-stone-900">
      <Link
        href={`/article/${article.id}`}
        className="relative block min-h-64 bg-stone-200 dark:bg-stone-800"
      >
        {article.image_url && (
          <Image
            src={article.image_url}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </Link>
      <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span className="rounded-full bg-indigo-500 px-2 py-0.5 font-semibold text-white">
            Latest
          </span>
          <span>{article.news_site}</span>
          <time dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
        </div>
        <h2 className="text-2xl font-black leading-tight md:text-3xl">
          <Link
            href={`/article/${article.id}`}
            className="hover:text-indigo-500"
          >
            {article.title}
          </Link>
        </h2>
        <p className="line-clamp-4 text-stone-600 dark:text-stone-400">
          {article.summary}
        </p>
      </div>
    </article>
  );
}
