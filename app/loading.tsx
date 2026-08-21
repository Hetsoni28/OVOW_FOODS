import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9F6F0]">
      <Loader2 className="h-12 w-12 animate-spin text-[#2E7D4F]" />
      <p className="mt-4 font-serif text-xl text-[#2E7D4F] animate-pulse">
        Preparing your experience...
      </p>
    </div>
  );
}
