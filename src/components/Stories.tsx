import Image from "next/image";
import Link from "next/link";
import { formatDate, sourceTone, timeAgo } from "@/lib/format";
import { btnPrimary } from "@/lib/ui";
import type { Article } from "@/lib/types";
import { Logomark } from "./Logo";

export function SourceTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-ink">
      <span
        aria-hidden="true"
        className="size-2.5 rounded-full"
        style={{ background: sourceTone(name) }}
      />
      {name}
    </span>
  );
}

export function Meta({
  article,
  className = "",
}: {
  article: Article;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className}`}
    >
      <SourceTag name={article.news_site} />
      <time
        dateTime={article.published_at}
        title={formatDate(article.published_at)}
        className="text-muted"
      >
        {timeAgo(article.published_at)}
      </time>
    </div>
  );
}

export function Thumb({
  src,
  sizes,
  className = "",
  priority = false,
}: {
  src?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-brand-soft ${className}`}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Logomark className="absolute left-1/2 top-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 text-brand/40" />
      )}
    </div>
  );
}

const titleLink =
  "decoration-brand decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline";

/** The lead story: large image, big headline, one clear action. */
export function HeroStory({ article }: { article: Article }) {
  return (
    <article className="group relative grid gap-6 lg:grid-cols-12 lg:gap-10">
      <Thumb
        src={article.image_url}
        priority
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="aspect-[16/10] rounded-3xl lg:col-span-7"
      />
      <div className="flex flex-col justify-end lg:col-span-5">
        <Meta article={article} />
        <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance sm:text-4xl xl:text-[2.75rem]">
          <Link href={`/article/${article.id}`} className={titleLink}>
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-4 text-lg text-muted text-pretty">
          {article.summary}
        </p>
        <span aria-hidden="true" className={`${btnPrimary} mt-6 w-fit`}>
          Read story
        </span>
      </div>
    </article>
  );
}

/** Mid-weight stories: image on top, no box around them. */
export function FeatureStory({ article }: { article: Article }) {
  return (
    <article className="group relative flex flex-col">
      <Thumb
        src={article.image_url}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] rounded-2xl"
      />
      <Meta article={article} className="mt-4" />
      <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-balance sm:text-[1.4rem]">
        <Link href={`/article/${article.id}`} className={titleLink}>
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-muted text-pretty">
        {article.summary}
      </p>
    </article>
  );
}

/** Compact rows for fast scanning. */
export function ListStory({ article }: { article: Article }) {
  return (
    <article className="group relative flex gap-4 border-t border-line py-5">
      <div className="min-w-0 flex-1">
        <Meta article={article} />
        <h3 className="mt-1.5 line-clamp-3 font-display text-lg font-semibold leading-snug tracking-tight text-balance">
          <Link href={`/article/${article.id}`} className={titleLink}>
            {article.title}
          </Link>
        </h3>
      </div>
      <Thumb
        src={article.image_url}
        sizes="112px"
        className="size-24 shrink-0 rounded-xl sm:size-28"
      />
    </article>
  );
}
