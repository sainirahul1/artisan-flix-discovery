import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/SearchBar";
import { JoinSellerModal } from "@/components/JoinSellerModal";
import { AuthStatus } from "@/components/AuthStatus";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const { state } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = state.totalItems;
  const wishlistCount = wishlistItems.length;

  const categories = [
    { label: "Pottery", href: "/category/pottery" },
    { label: "Textiles", href: "/category/textiles" },
    { label: "Jewelry", href: "/category/jewelry" },
    { label: "Woodcraft", href: "/category/woodcraft" },
    { label: "Metalwork", href: "/category/metalwork" },
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "#", dropdown: categories },
  ];

  if (isSearchOpen) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <SearchBar onClose={() => setIsSearchOpen(false)} autoFocus />
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white text-xl font-bold text-netflix">
              CraftVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="text-gray-300 hover:text-white transition-colors duration-200 font-medium flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-glass-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Button 
              variant="cinematic" 
              onClick={() => setIsSellerModalOpen(true)}
              className="text-sm"
            >
              Join as Seller
            </Button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Button 
              variant="glass" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="glass" 
              size="icon" 
              className="relative"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-4 w-4" />
              {wishlistItems.length > 0 && (
                <span className="cart-badge">
                  {wishlistItems.length}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Button 
              variant="glass" 
              size="icon" 
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="cart-badge">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Profile / Auth */}
            <div className="flex items-center gap-2">
              <AuthStatus />
              {user ? (
                <Button 
                  variant="glass" 
                  size="icon" 
                  onClick={() => navigate("/profile")}
                  title={`Signed in as ${user.full_name}`}
                > 
                  <User className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="glass" size="icon" onClick={() => navigate("/auth/signin")}> 
                  <User className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="glass"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-glass-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <div className="px-4 py-2 text-gray-300 font-medium">
                        {item.label}
                      </div>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-8 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="px-4 pt-2">
                <Button 
                  variant="cinematic" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSellerModalOpen(true);
                  }}
                >
                  Join as Seller
                </Button>
              </div>
              
              {/* Mobile Search */}
              <div className="px-4 pt-4 border-t border-glass-border mt-4">
                <Button 
                  variant="glass" 
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <JoinSellerModal 
          isOpen={isSellerModalOpen} 
          onClose={() => setIsSellerModalOpen(false)} 
        />
      </div>
    </nav>
  );
};