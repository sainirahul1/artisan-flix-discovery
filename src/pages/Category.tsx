import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ProductCarousel } from "@/components/ProductCarousel";
import { 
  trendingProducts, 
  nearYouProducts, 
  ecoFriendlyProducts 
} from "@/data/mockData";

const categoryData = {
  pottery: {
    title: "Pottery & Ceramics",
    description: "Handcrafted bowls, vases & decorative pieces from master potters",
    products: trendingProducts.filter(p => p.category === "Pottery"),
  },
  textiles: {
    title: "Textiles & Fabrics", 
    description: "Traditional weaves & modern textile designs",
    products: trendingProducts.filter(p => p.category === "Textiles"),
  },
  woodcraft: {
    title: "Woodcraft & Furniture",
    description: "Carved sculptures & functional wooden art",
    products: trendingProducts.filter(p => p.category === "Woodcraft"),
  },
  jewelry: {
    title: "Jewelry & Accessories",
    description: "Handmade silver, gold & beaded pieces",
    products: trendingProducts.filter(p => p.category === "Jewelry"),
  },
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categoryInfo = categoryData[category as keyof typeof categoryData];

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
            <p className="text-gray-400">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-netflix">
              {categoryInfo.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="space-y-8">
        <ProductCarousel
          title={`Featured ${categoryInfo.title}`}
          subtitle="Handpicked by our curators"
          products={categoryInfo.products}
        />
        
        <ProductCarousel
          title="Trending in This Category"
          subtitle="Most loved this week"
          products={trendingProducts}
        />
        
        <ProductCarousel
          title="Near You"
          subtitle="Local artisans in your area"
          products={nearYouProducts}
        />
        
        <ProductCarousel
          title="Eco-Friendly Options"
          subtitle="Sustainable craftsmanship"
          products={ecoFriendlyProducts}
        />
      </div>
      
      <div className="h-32" />
    </div>
  );
};

export default Category;