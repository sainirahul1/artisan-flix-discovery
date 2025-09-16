import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Shield, Truck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCarousel } from "@/components/ProductCarousel";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { trendingProducts, becauseYouLikedProducts } from "@/data/mockData";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product from all available products
  const allProducts = [...trendingProducts, ...becauseYouLikedProducts];
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
            <Button variant="hero" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      artisan: product.artisan,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            variant="glass"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-accent"
                        : "border-transparent hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <Badge className="bg-accent text-black font-bold">NEW</Badge>
                )}
                {product.isTrending && (
                  <Badge className="bg-primary text-white font-bold">TRENDING</Badge>
                )}
              </div>

              {/* Title & Category */}
              <div>
                <p className="text-accent text-sm font-medium mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
                <p className="text-gray-300 text-lg">by {product.artisan}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-white text-lg font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-white text-3xl font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-xl line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                This exquisite {product.name.toLowerCase()} represents the finest in traditional 
                craftsmanship. Each piece is meticulously handcrafted by skilled artisan {product.artisan}, 
                using time-honored techniques passed down through generations.
              </p>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Shield className="h-5 w-5 text-accent" />
                  <span>Authenticity guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Truck className="h-5 w-5 text-accent" />
                  <span>Free shipping on orders over ₹2,000</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant={isInWishlist(product.id) ? "gold" : "glass"}
                  size="xl"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </Button>
                <Button variant="glass" size="xl">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <ProductCarousel
            title="You Might Also Like"
            subtitle="Similar products from our collection"
            products={becauseYouLikedProducts.filter(p => p.id !== product.id)}
          />
        </div>
      </div>
      
      <div className="h-32" />
    </div>
  );
};

export default ProductDetail;