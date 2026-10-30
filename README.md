# Space Daily

A spaceflight news site built with Next.js (App Router), TypeScript and Tailwind CSS v4.
Data comes from the free, open source [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/) (no API key needed).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/lib/api.ts` – API client (list, detail, news sites, ISR caching via `fetch` revalidate)
- `src/app/page.tsx` – home: featured story, grid, search, source filter, pagination (URL-driven)
- `src/app/article/[id]/page.tsx` – article detail with metadata and link to the original
- `src/components/` – ArticleCard, SearchBar, Pagination
