import { Heart, ShoppingCart } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddAllToCart = () => {
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        artisan: item.artisan,
      });
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center py-16">
            <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 text-lg mb-8">
              Save your favorite handcrafted items for later
            </p>
            <Button variant="hero" size="xl" onClick={() => navigate("/")}>
              Discover Products
            </Button>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Wishlist</h1>
              <p className="text-gray-400">{items.length} items saved</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="hero" onClick={handleAddAllToCart}>
                <ShoppingCart className="h-4 w-4" />
                Add All to Cart
              </Button>
              <Button variant="outline" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-32" />
    </div>
  );
};

export default Wishlist;