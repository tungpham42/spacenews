function Block({ className }: { className: string }) {
  return <div className={`bg-line motion-safe:animate-pulse ${className}`} />;
}

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading stories" className="pt-16">
      <Block className="h-14 w-3/4 max-w-xl rounded-2xl sm:h-20" />
      <Block className="mt-5 h-6 w-full max-w-md rounded-lg" />
      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Block className="aspect-[16/10] rounded-3xl lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5 lg:self-end">
          <Block className="h-5 w-40 rounded-lg" />
          <Block className="h-24 w-full rounded-2xl" />
          <Block className="h-20 w-full rounded-2xl" />
        </div>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Block className="aspect-[16/10] rounded-2xl" />
            <Block className="h-5 w-32 rounded-lg" />
            <Block className="h-14 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
