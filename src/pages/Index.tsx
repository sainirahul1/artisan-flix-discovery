import { Navigation } from "@/components/Navigation";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BecomePartSection } from "@/components/BecomePartSection";
import { 
  trendingProducts, 
  nearYouProducts, 
  ecoFriendlyProducts, 
  becauseYouLikedProducts 
} from "@/data/mockData";
import { useCommunityProducts } from "@/hooks/useCommunityProducts";

const Index = () => {
  const { products: communityProducts } = useCommunityProducts();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Product Carousels */}
      <div className="space-y-8">
        {/* Community New */}
        {communityProducts.length > 0 && (
          <ProductCarousel
            title="🆕 Fresh from Artisans"
            subtitle="Newly posted crafts from our community"
            products={communityProducts}
          />
        )}
        
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
          title="🎯 Top Pottery Collection"
          subtitle="Exquisite ceramics and beautiful pottery pieces"
          products={becauseYouLikedProducts}
        />
        
        {/* Eco-Friendly */}
        <ProductCarousel
          title="🌱 Premium Textiles"
          subtitle="Luxury jewelry and handwoven fabrics"
          products={ecoFriendlyProducts}
        />
      </div>

      {/* Become Part Section */}
      <BecomePartSection />
      
      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
};

export default Index;
