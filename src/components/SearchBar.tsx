import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export const SearchBar = ({ onClose, autoFocus = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  const popularSearches = [
    "handmade pottery",
    "silk scarves",
    "wooden sculptures",
    "silver jewelry",
    "traditional textiles",
    "ceramic bowls",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="search-enhanced rounded-2xl p-2">
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-muted-foreground ml-4" />
            <Input
              type="text"
              placeholder="Search for handmade pottery, textiles, jewelry..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-gray-400 h-12 focus-visible:ring-0"
              autoFocus={autoFocus}
            />
            {onClose && (
              <Button
                variant="glass"
                size="icon"
                onClick={onClose}
                className="mr-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button variant="hero" size="lg" className="mr-2" type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Popular Searches */}
      {!query && (
        <div className="mt-4 px-4">
          <p className="text-sm text-gray-400 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-sm text-accent hover:text-white transition-colors bg-accent/10 hover:bg-accent/20 px-3 py-1 rounded-full border border-accent/20"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};