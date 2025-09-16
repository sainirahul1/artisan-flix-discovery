import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisan: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  artisan,
  rating,
  reviews,
  category,
  isNew,
  isTrending,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card relative w-80 h-[480px] rounded-2xl overflow-hidden cursor-pointer group bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          {isNew && (
            <Badge className="bg-accent text-black font-bold shadow-lg">NEW</Badge>
          )}
          {isTrending && (
            <Badge className="bg-primary text-white font-bold animate-glow-pulse shadow-lg">
              TRENDING
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="glass"
          size="icon"
          className="absolute top-6 right-6 opacity-80 hover:opacity-100 w-10 h-10"
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-primary text-primary" : "text-white"
            }`}
          />
        </Button>

        {/* Product Info Overlay */}
        <div
          className={`product-overlay absolute inset-0 flex flex-col justify-end p-8 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
          }`}
        >
          {/* Category */}
          <p className="text-accent text-sm font-medium mb-1">{category}</p>
          
          {/* Product Name */}
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
            {name}
          </h3>
          
          {/* Artisan */}
          <p className="text-gray-300 text-sm mb-2">by {artisan}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-white text-sm font-medium">{rating}</span>
            </div>
            <span className="text-gray-400 text-sm">({reviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-xl font-bold">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-2 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 md:translate-y-0 md:opacity-100"
            }`}
          >
            <Button variant="hero" className="flex-1">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="glass" size="lg">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};