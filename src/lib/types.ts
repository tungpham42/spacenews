export interface Author {
  name: string;
  socials: Record<string, string> | null;
}

export interface Launch {
  launch_id: string;
  provider: string;
}

export interface EventRef {
  event_id: number;
  provider: string;
}

export interface Article {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: EventRef[];
}

export interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

export interface InfoResponse {
  version: string;
  news_sites: string[];
}
