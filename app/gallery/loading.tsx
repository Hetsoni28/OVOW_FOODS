import { Loader2 } from "lucide-react";

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">
        {/* Header Skeleton */}
        <div className="mb-12 max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="h-6 w-32 bg-[#C9A24A]/20 rounded-md animate-pulse mb-4" />
          <div className="h-10 md:h-12 w-64 md:w-96 bg-primary/10 rounded-md animate-pulse mb-6" />
          <div className="h-4 w-full bg-primary/5 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-4/5 bg-primary/5 rounded-md animate-pulse" />
        </div>

        {/* Masonry Grid Skeleton */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {/* Create varying heights to simulate masonry */}
          {[200, 300, 250, 400, 200, 350, 250, 300, 400, 200, 300, 250].map((height, i) => (
            <div 
              key={i} 
              className="bg-primary/5 rounded-none animate-pulse w-full break-inside-avoid shadow-sm"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
