import { IconStar } from "@/components/atoms/Icons";

export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 text-tertiary">
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} size={17} fill="currentColor" />
      ))}
    </div>
  );
}
