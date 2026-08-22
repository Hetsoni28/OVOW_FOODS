import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative w-full shrink-0">
      <input
        type="text"
        placeholder="Search dishes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        suppressHydrationWarning
        className="w-full bg-white border border-primary/10 pl-8 pr-8 py-2.5 text-sm font-medium text-primary focus:outline-none focus:border-[#C9A24A] transition-colors placeholder:text-primary/40 placeholder:font-normal"
      />
      <Search
        size={13}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none"
      />
      {searchQuery && (
        <button suppressHydrationWarning
          onClick={() => setSearchQuery("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
