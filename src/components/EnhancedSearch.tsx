import { useState, useEffect } from "react";
import { Search, Filter, SortAsc, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface EnhancedSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  onSort: (sort: string) => void;
  categories: string[];
  priceRange: [number, number];
}

export const EnhancedSearch = ({ onSearch, onFilter, onSort, categories, priceRange }: EnhancedSearchProps) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilter({ category, priceRange: selectedPriceRange });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    onSort(sort);
  };

  const popularSearchTerms = [
    "handmade pottery",
    "silk scarves", 
    "wooden sculptures",
    "silver jewelry",
    "eco-friendly",
    "traditional"
  ];

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="search-enhanced rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for handcrafted treasures..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0"
          />
        </div>
        
        {/* Popular Searches */}
        {!query && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-sm text-gray-400 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearchTerms.map((term) => (
                <Badge
                  key={term}
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent/20 transition-colors"
                  onClick={() => handleSearch(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};