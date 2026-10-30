"use client";

import { Logomark } from "@/components/Logo";
import { btnPrimary } from "@/lib/ui";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-md py-28 text-center">
      <Logomark className="mx-auto size-14 text-brand/50" />
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
        Stories didn&apos;t load
      </h2>
      <p className="mt-2 text-muted">
        The news service isn&apos;t responding. Check your connection, then try
        again.
      </p>
      <button type="button" onClick={reset} className={`${btnPrimary} mt-6`}>
        Try again
      </button>
    </div>
  );
}
