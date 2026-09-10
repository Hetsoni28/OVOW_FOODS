export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">

        {/* Header Skeleton */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="h-4 w-28 bg-[#C9A24A]/20 animate-pulse mb-4 rounded-sm" />
          <div className="h-9 w-72 md:w-[420px] bg-primary/10 animate-pulse mb-5 rounded-sm" />
          {/* Search bar skeleton */}
          <div className="h-11 w-full max-w-md bg-white border border-primary/10 shadow-sm animate-pulse flex items-center px-4 gap-3">
            <div className="w-4 h-4 rounded-full bg-primary/15 shrink-0" />
            <div className="h-3 w-36 bg-primary/10 rounded-sm" />
          </div>
        </div>

        {/* Category Pills Skeleton */}
        <div className="mb-8 flex gap-2 overflow-x-hidden pb-2">
          {[120, 90, 110, 80, 100, 75].map((w, i) => (
            <div
              key={i}
              className="h-9 shrink-0 bg-primary/10 animate-pulse rounded-none"
              style={{ width: `${w}px`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} delay={i * 60} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="bg-white border border-primary/5 overflow-hidden flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Video area skeleton */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/8 via-primary/5 to-[#C9A24A]/5 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />

        {/* Badge placeholder top-left */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <div className="h-5 w-16 bg-white/30 animate-pulse rounded-sm" />
        </div>

        {/* Veg dot top-right */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-white/40 animate-pulse rounded-sm" />
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col flex-1 p-3 md:p-5 gap-2 md:gap-3">
        {/* Category label */}
        <div className="h-2.5 w-16 bg-primary/10 animate-pulse rounded-sm" style={{ animationDelay: `${delay + 50}ms` }} />

        {/* Product name */}
        <div className="h-4 md:h-5 w-5/6 bg-primary/15 animate-pulse rounded-sm" style={{ animationDelay: `${delay + 80}ms` }} />

        {/* Description — hidden on mobile */}
        <div className="hidden md:flex flex-col gap-1.5">
          <div className="h-3 w-full bg-primary/8 animate-pulse rounded-sm" style={{ animationDelay: `${delay + 100}ms` }} />
          <div className="h-3 w-4/5 bg-primary/8 animate-pulse rounded-sm" style={{ animationDelay: `${delay + 120}ms` }} />
        </div>

        {/* Price + Button row */}
        <div className="flex items-center justify-between mt-auto pt-2 md:pt-3 border-t border-primary/5">
          <div className="flex flex-col gap-1">
            <div className="h-2 w-12 bg-primary/8 animate-pulse rounded-sm" />
            <div className="h-4 md:h-5 w-14 bg-[#C9A24A]/25 animate-pulse rounded-sm" style={{ animationDelay: `${delay + 140}ms` }} />
          </div>
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: `${delay + 160}ms` }} />
        </div>
      </div>
    </div>
  );
}
