import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Pottery", href: "/pottery" },
    { label: "Textiles", href: "/textiles" },
    { label: "Jewelry", href: "/jewelry" },
    { label: "Woodcraft", href: "/woodcraft" },
    { label: "Artisans", href: "/artisans" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white text-xl font-bold text-netflix">
              ArtisanFlix
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Button variant="glass" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Wishlist */}
            <Button variant="glass" size="icon" className="relative">
              <Heart className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-primary text-xs">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button variant="glass" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-primary text-xs">
                5
              </Badge>
            </Button>

            {/* Profile */}
            <Button variant="glass" size="icon">
              <User className="h-4 w-4" />
            </Button>

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
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Search */}
              <div className="px-4 pt-4 border-t border-glass-border mt-4">
                <Button variant="glass" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};