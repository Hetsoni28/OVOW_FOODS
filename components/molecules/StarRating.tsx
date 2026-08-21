import { Star } from "lucide-react";

export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 text-tertiary">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={17} fill="currentColor" />
      ))}
    </div>
  );
}
