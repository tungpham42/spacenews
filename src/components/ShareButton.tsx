"use client";

import { useState } from "react";
import { btnQuiet } from "@/lib/ui";
import { ShareIcon } from "./Icons";

type State = "idle" | "copied" | "failed";

export function ShareButton({ title }: { title: string }) {
  const [state, setState] = useState<State>("idle");

  function flash(next: State) {
    setState(next);
    setTimeout(() => setState("idle"), 2200);
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      flash("failed");
    }
  }

  return (
    <button type="button" onClick={share} className={btnQuiet}>
      <ShareIcon className="size-4" />
      <span aria-live="polite">
        {state === "copied"
          ? "Link copied"
          : state === "failed"
            ? "Couldn't copy link"
            : "Share"}
      </span>
    </button>
  );
}
