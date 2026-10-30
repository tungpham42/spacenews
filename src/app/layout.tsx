import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Figtree } from "next/font/google";=
import "./globals.css";
import { Logomark } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";

const bicolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: {
    default: "Space Daily: spaceflight news",
    template: "%s | Space Daily",
  },
  description:
    "Launches, missions and discoveries from 40+ space news sites, refreshed every few minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    title: {
      default: "Space Daily: spaceflight news",
      template: "%s | Space Daily",
    },
    description:
      "Launches, missions and discoveries from 40+ space news sites, refreshed every few minutes.",
    images: [
      {
        url: "/1200x630.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${bicolageGrotesque.variable} ${figtree.variable}`}
    >
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <>
            <Script
              id="adsense-script"
              async
              strategy="afterInteractive"
              crossOrigin="anonymous"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            />
          </>
        )}
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-8 sm:px-8">
          {children}
        </main>
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight">
              <Logomark className="size-7 text-brand" />
              Space Daily
            </p>
            <p className="max-w-md text-sm text-muted">
              Stories come from the open source{" "}
              <a
                className="font-medium text-ink underline underline-offset-4 hover:text-brand"
                href="https://api.spaceflightnewsapi.net/v4/docs/"
                target="_blank"
                rel="noreferrer"
              >
                Spaceflight News API
              </a>
              . Headlines and images belong to their publishers.
            </p>
          </div>
        </footer>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
