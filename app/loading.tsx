import { ChefHat } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9F6F0]">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 flex items-center justify-center bg-[#C9A24A]/10 rounded-full mb-4">
          <ChefHat size={32} className="text-[#C9A24A] animate-pulse" />
          <div className="absolute inset-0 border-2 border-[#C9A24A]/20 border-t-[#C9A24A] rounded-full animate-spin"></div>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60">
          Loading...
        </p>
      </div>
    </div>
  );
}
