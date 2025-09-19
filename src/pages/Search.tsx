import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { EnhancedSearch } from "@/components/EnhancedSearch";
import { 
  trendingProducts, 
  nearYouProducts, 
  ecoFriendlyProducts, 
  becauseYouLikedProducts 
} from "@/data/mockData";
import { useCommunityProducts } from "@/hooks/useCommunityProducts";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ category: "all", priceRange: "all" });

  const { products: communityProducts } = useCommunityProducts();

  const allProducts = [
    ...communityProducts,
    ...trendingProducts,
    ...nearYouProducts,
    ...ecoFriendlyProducts,
    ...becauseYouLikedProducts,
  ];

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    setIsLoading(true);
    
    // Enhanced search implementation
    setTimeout(() => {
      let results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.artisan.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      // Apply filters
      if (filters.category !== "all") {
        results = results.filter(product => 
          product.category.toLowerCase() === filters.category
        );
      }

      // Sort results
      const sortedResults = [...results].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return a.isNew ? -1 : 1;
          case "popular":
            return b.reviews - a.reviews;
          default:
            return 0;
        }
      });

      setFilteredProducts(sortedResults);
      setIsLoading(false);
    }, 300);
  }, [query, sortBy, filters]);

  if (!query) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center py-16">
            <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Search Products</h1>
            <p className="text-gray-400 text-lg mb-8">
              Find your perfect handcrafted treasure
            </p>
            <SearchBar autoFocus />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-400 mb-6">
              {filteredProducts.length} products found
            </p>
            
            <SearchBar />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="glass">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-border rounded-lg px-4 py-2 text-white"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">No products found</h2>
              <p className="text-gray-400 mb-8">
                Try adjusting your search terms or browse our categories
              </p>
              <Button variant="hero" onClick={() => navigate("/")}>
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-32" />
    </div>
  );
};

export default SearchResults;