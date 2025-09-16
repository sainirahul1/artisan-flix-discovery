import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import potteryImg from "@/assets/pottery-collection.jpg";
import textilesImg from "@/assets/textiles-collection.jpg";
import woodcraftImg from "@/assets/woodcraft-collection.jpg";
import jewelryImg from "@/assets/jewelry-collection.jpg";

const categories = [
  {
    id: 1,
    name: "Pottery & Ceramics",
    description: "Handcrafted bowls, vases & decorative pieces",
    image: potteryImg,
    count: "1,200+ items",
    trend: "+15% this week",
    link: "/category/pottery",
  },
  {
    id: 2,
    name: "Textiles & Fabrics",
    description: "Traditional weaves & modern designs",
    image: textilesImg,
    count: "800+ items",
    trend: "+8% this week",
    link: "/category/textiles",
  },
  {
    id: 3,
    name: "Woodcraft & Furniture",
    description: "Carved sculptures & functional art",
    image: woodcraftImg,
    count: "600+ items",
    trend: "+12% this week",
    link: "/category/woodcraft",
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    description: "Handmade silver, gold & beaded pieces",
    image: jewelryImg,
    count: "900+ items",
    trend: "+20% this week",
    link: "/category/jewelry",
  },
];

export const CategoryGrid = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-accent font-medium">Explore Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-netflix">
            Shop by Craft
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover authentic handmade treasures organized by traditional crafts and modern artistry
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(category.link)}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Trend Badge */}
                <div className="mb-3">
                  <span className="inline-block bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full border border-accent/30">
                    {category.trend}
                  </span>
                </div>

                {/* Category Info */}
                <div className="mb-4">
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {category.count}
                  </p>
                </div>

                {/* Action Button */}
                <Button 
                  variant="glass" 
                  size="sm" 
                  className="w-full group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-300"
                >
                  Explore Collection
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-accent/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};