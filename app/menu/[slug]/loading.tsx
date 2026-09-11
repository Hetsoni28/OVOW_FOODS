export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Back button skeleton */}
        <div className="h-4 w-28 bg-primary/10 animate-pulse rounded-sm mb-8" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Video skeleton */}
          <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/8 via-primary/5 to-[#C9A24A]/5 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
            {/* Badge placeholders */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <div className="h-7 w-24 bg-white/20 animate-pulse rounded-sm" />
            </div>
            {/* Veg dot */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/30 animate-pulse rounded-md" />
          </div>

          {/* Right: Product details skeleton */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Category */}
            <div className="h-3 w-20 bg-primary/10 animate-pulse rounded-sm" />

            {/* Product name */}
            <div className="flex flex-col gap-2">
              <div className="h-9 w-4/5 bg-primary/15 animate-pulse rounded-sm" style={{ animationDelay: "50ms" }} />
              <div className="h-9 w-3/5 bg-primary/10 animate-pulse rounded-sm" style={{ animationDelay: "80ms" }} />
            </div>

            {/* Price */}
            <div className="h-8 w-28 bg-[#C9A24A]/20 animate-pulse rounded-sm" style={{ animationDelay: "100ms" }} />

            {/* Divider */}
            <div className="h-px w-full bg-primary/8" />

            {/* Description lines */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full bg-primary/8 animate-pulse rounded-sm" style={{ animationDelay: "120ms" }} />
              <div className="h-3 w-full bg-primary/8 animate-pulse rounded-sm" style={{ animationDelay: "140ms" }} />
              <div className="h-3 w-4/5 bg-primary/8 animate-pulse rounded-sm" style={{ animationDelay: "160ms" }} />
            </div>

            {/* Info badges row */}
            <div className="flex gap-3 flex-wrap">
              {[60, 80, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-8 bg-primary/5 border border-primary/8 animate-pulse rounded-sm"
                  style={{ width: `${w}px`, animationDelay: `${180 + i * 30}ms` }}
                />
              ))}
            </div>

            {/* Add-on skeleton */}
            <div className="h-16 w-full border border-primary/10 bg-white/60 animate-pulse rounded-sm" style={{ animationDelay: "260ms" }} />

            {/* Qty + Add button skeleton */}
            <div className="flex gap-4 mt-4">
              <div className="h-14 w-36 border border-primary/10 animate-pulse rounded-sm" />
              <div className="flex-1 h-14 bg-[#C9A24A]/20 animate-pulse rounded-sm" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="mt-20">
          <div className="h-5 w-40 bg-primary/10 animate-pulse rounded-sm mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-primary/5 overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/8 via-primary/5 to-[#C9A24A]/5 overflow-hidden">
                  <div className="absolute inset-0 skeleton-shimmer" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-2.5 w-16 bg-primary/10 animate-pulse rounded-sm" />
                  <div className="h-4 w-4/5 bg-primary/15 animate-pulse rounded-sm" />
                  <div className="h-4 w-14 bg-[#C9A24A]/20 animate-pulse rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
