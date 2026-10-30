import { cleanText } from "./text";
import type { Article, ArticlesResponse, InfoResponse } from "./types";

// Spaceflight News API (SNAPI): free, open source, no API key required.
// Docs: https://api.spaceflightnewsapi.net/v4/docs/
const BASE_URL = "https://api.spaceflightnewsapi.net/v4";

// Page 1 shows 13 items (1 lead story + 12 more); later pages show 12.
export const FIRST_PAGE_SIZE = 13;
export const PAGE_SIZE = 12;

export function getTotalPages(count: number): number {
  if (count <= FIRST_PAGE_SIZE) return 1;
  return 1 + Math.ceil((count - FIRST_PAGE_SIZE) / PAGE_SIZE);
}

interface ListParams {
  page?: number;
  search?: string;
  newsSite?: string;
  /** Fixed page size, used for small lists such as "more from this source". */
  limit?: number;
}

/** Cleans every text field once, so components never see `&nbsp;` or non-breaking spaces. */
function normalizeArticle(article: Article): Article {
  return {
    ...article,
    title: cleanText(article.title),
    summary: cleanText(article.summary),
    news_site: cleanText(article.news_site),
    authors: article.authors.map((author) => ({
      ...author,
      name: cleanText(author.name),
    })),
  };
}

async function request<T>(path: string, revalidate = 300): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`News API request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function getArticles({
  page = 1,
  search,
  newsSite,
  limit,
}: ListParams = {}): Promise<ArticlesResponse> {
  const current = Math.max(page, 1);
  let pageLimit: number;
  let offset: number;
  if (limit) {
    pageLimit = limit;
    offset = (current - 1) * limit;
  } else if (current === 1) {
    pageLimit = FIRST_PAGE_SIZE;
    offset = 0;
  } else {
    pageLimit = PAGE_SIZE;
    offset = FIRST_PAGE_SIZE + (current - 2) * PAGE_SIZE;
  }

  const params = new URLSearchParams({
    limit: String(pageLimit),
    offset: String(offset),
    ordering: "-published_at",
  });
  if (search) params.set("search", search);
  if (newsSite) params.set("news_site", newsSite);
  const data = await request<ArticlesResponse>(
    `/articles/?${params.toString()}`,
  );
  return { ...data, results: data.results.map(normalizeArticle) };
}

export async function getArticle(id: number): Promise<Article | null> {
  const res = await fetch(`${BASE_URL}/articles/${id}/`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`News API request failed (${res.status})`);
  return normalizeArticle((await res.json()) as Article);
}

export async function getNewsSites(): Promise<string[]> {
  try {
    const info = await request<InfoResponse>("/info/", 86400);
    return [...info.news_sites].sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}
