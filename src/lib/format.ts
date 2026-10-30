export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));
}

/** "12 minutes ago", "yesterday", or a short date for anything older than a week. */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const date = new Date(iso);
  const diff = (date.getTime() - now) / 1000;
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (abs < 60) return "just now";
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  if (abs < 7 * 86400) return rtf.format(Math.round(diff / 86400), "day");

  const sameYear = date.getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(date);
}

const TONES = [
  "#2b3ff0",
  "#e8590c",
  "#0c8f6b",
  "#c2255c",
  "#7048e8",
  "#1098ad",
];

/** A stable colour per news source, so the same publisher always looks the same. */
export function sourceTone(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return TONES[hash % TONES.length];
}
