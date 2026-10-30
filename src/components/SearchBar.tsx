interface Props {
  search?: string;
  site?: string;
  sites: string[];
}

// Plain GET form: works without client-side JavaScript.
export function SearchBar({ search, site, sites }: Props) {
  return (
    <form
      action="/"
      method="get"
      className="mb-8 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="search"
        name="q"
        defaultValue={search}
        placeholder="Search space news…"
        aria-label="Search articles"
        className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2 outline-none focus:border-indigo-500 dark:border-stone-700 dark:bg-stone-900"
      />
      {sites.length > 0 && (
        <select
          name="site"
          defaultValue={site ?? ""}
          aria-label="Filter by news site"
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">All sources</option>
          {sites.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-500"
      >
        Search
      </button>
    </form>
  );
}
