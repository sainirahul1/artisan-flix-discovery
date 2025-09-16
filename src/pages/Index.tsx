import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { 
  trendingProducts, 
  nearYouProducts, 
  ecoFriendlyProducts, 
  becauseYouLikedProducts 
} from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Product Carousels */}
      <div className="relative z-10 -mt-32">
        {/* Trending Now */}
        <ProductCarousel
          title="🔥 Trending Now"
          subtitle="Most loved by our community"
          products={trendingProducts}
          priority
        />
        
        {/* Near You */}
        <ProductCarousel
          title="📍 Near You in Hyderabad"
          subtitle="Local artisans creating magic"
          products={nearYouProducts}
        />
        
        {/* Because You Liked */}
        <ProductCarousel
          title="🎯 Because You Liked Pottery"
          subtitle="More beautiful ceramics just for you"
          products={becauseYouLikedProducts}
        />
        
        {/* Eco-Friendly */}
        <ProductCarousel
          title="🌱 Eco-Friendly Picks"
          subtitle="Sustainable craftsmanship"
          products={ecoFriendlyProducts}
        />
      </div>
      
      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
};

export default Index;
