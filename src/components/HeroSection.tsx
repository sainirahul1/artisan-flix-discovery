import { useState, useEffect } from "react";
import { Play, Search, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-artisan.jpg";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Artisan Crafts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Headline */}
        <div className="animate-fade-in">
          <h1 className="text-hero text-white mb-6 font-black tracking-tight">
            Discover Handmade
            <span className="block text-accent text-glow">Stories</span>
            <span className="block text-lg font-normal text-gray-300 mt-4">
              Curated Just For You
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Immerse yourself in a world of authentic craftsmanship. From traditional pottery to modern textiles, 
          discover unique pieces created by local artisans near you.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass rounded-2xl p-2 border border-glass-border">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-3">
                <Search className="h-5 w-5 text-muted-foreground ml-4" />
                <Input
                  type="text"
                  placeholder="Search for handmade pottery, textiles, jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-white placeholder:text-gray-400 h-12 focus-visible:ring-0"
                />
              </div>
              <Button variant="hero" size="lg" className="mr-2">
                Explore
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button variant="hero" size="xl" className="min-w-48">
            <Play className="h-5 w-5" />
            Watch Artisan Stories
          </Button>
          <Button variant="glass" size="xl" className="min-w-48">
            Browse Collections
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="glass rounded-lg p-4 min-w-32">
            <div className="text-2xl font-bold text-accent">2,500+</div>
            <div className="text-sm text-gray-300">Local Artisans</div>
          </div>
          <div className="glass rounded-lg p-4 min-w-32">
            <div className="text-2xl font-bold text-accent">15,000+</div>
            <div className="text-sm text-gray-300">Unique Products</div>
          </div>
          <div className="glass rounded-lg p-4 min-w-32">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-accent">
              <Star className="h-5 w-5 fill-accent" />
              4.9
            </div>
            <div className="text-sm text-gray-300">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-60">
        <div className="w-16 h-16 bg-accent/20 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float opacity-40" style={{ animationDelay: "1s" }}>
        <div className="w-12 h-12 bg-primary/30 rounded-full blur-lg" />
      </div>
      <div className="absolute top-1/3 right-8 animate-float opacity-50" style={{ animationDelay: "2s" }}>
        <div className="w-8 h-8 bg-accent/40 rounded-full blur-md" />
      </div>
    </div>
  );
};