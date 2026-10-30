import Link from "next/link";
import { Logomark } from "@/components/Logo";
import { btnPrimary } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-28 text-center">
      <Logomark className="mx-auto size-14 text-brand/50" />
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
        This story isn&apos;t here
      </h2>
      <p className="mt-2 text-muted">
        The link may be wrong, or the publisher removed the story.
      </p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        Show latest stories
      </Link>
    </div>
  );
}
