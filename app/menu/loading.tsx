import { Loader2 } from "lucide-react";

export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">
        {/* Header Skeleton */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="h-6 w-32 bg-[#C9A24A]/20 rounded-md animate-pulse mb-4" />
          <div className="h-10 w-64 md:w-96 bg-primary/10 rounded-md animate-pulse mb-6" />
          <div className="h-12 w-full max-w-md bg-white border border-primary/10 rounded-none shadow-sm animate-pulse flex items-center px-4">
            <div className="h-4 w-4 bg-primary/20 rounded-full mr-3" />
            <div className="h-4 w-32 bg-primary/10 rounded-md" />
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="mb-10 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 min-w-[100px] shrink-0 bg-primary/10 rounded-none animate-pulse" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white border border-primary/10 p-5 shadow-sm">
              <div className="h-4 w-12 bg-[#C9A24A]/20 rounded-md animate-pulse mb-3" />
              <div className="h-6 w-3/4 bg-primary/10 rounded-md animate-pulse mb-2" />
              <div className="h-4 w-full bg-primary/5 rounded-md animate-pulse mb-1" />
              <div className="h-4 w-2/3 bg-primary/5 rounded-md animate-pulse mb-6" />
              <div className="flex justify-between items-end">
                <div className="h-6 w-16 bg-[#C9A24A]/20 rounded-md animate-pulse" />
                <div className="h-10 w-24 bg-primary/10 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
