import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-artisan.jpg";
import potteryImg from "@/assets/pottery-collection.jpg";
import textilesImg from "@/assets/textiles-collection.jpg";
import woodcraftImg from "@/assets/woodcraft-collection.jpg";

const heroSlides = [
  {
    id: 1,
    title: "Discover Handcrafted",
    subtitle: "Stories",
    description: "Immerse yourself in authentic craftsmanship from local artisans",
    image: heroImage,
    cta: "Explore Collection",
    ctaLink: "/",
    secondaryCta: "Watch Stories",
    featured: "2,500+ Local Artisans",
  },
  {
    id: 2,
    title: "Traditional",
    subtitle: "Pottery",
    description: "Handcrafted ceramics that tell stories of generations",
    image: potteryImg,
    cta: "Shop Pottery",
    ctaLink: "/category/pottery",
    secondaryCta: "Meet Artisans",
    featured: "500+ Unique Pieces",
  },
  {
    id: 3,
    title: "Luxury",
    subtitle: "Textiles",
    description: "Premium handwoven fabrics with intricate patterns",
    image: textilesImg,
    cta: "View Textiles",
    ctaLink: "/category/textiles",
    secondaryCta: "Learn Techniques",
    featured: "Heritage Weaving",
  },
  {
    id: 4,
    title: "Artisan",
    subtitle: "Woodcraft",
    description: "Masterfully carved pieces that blend tradition with modern design",
    image: woodcraftImg,
    cta: "Discover Wood Art",
    ctaLink: "/category/woodcraft",
    secondaryCta: "Craftsman Stories",
    featured: "Sustainable Materials",
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slideItem, index) => (
        <div
          key={slideItem.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slideItem.image}
            alt={slideItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 animate-fade-in">
              <Badge className="bg-accent/20 text-accent border-accent/30 text-sm px-4 py-1">
                {slide.featured}
              </Badge>
            </div>

            {/* Title */}
            <div className="mb-6 animate-slide-up">
              <h1 className="text-6xl md:text-7xl font-black text-white leading-none mb-2">
                {slide.title}
              </h1>
              <h2 className="text-6xl md:text-7xl font-black text-accent leading-none text-glow">
                {slide.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-200 mb-8 leading-relaxed animate-slide-up max-w-lg" style={{ animationDelay: "0.2s" }}>
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                variant="hero" 
                size="xl" 
                className="text-lg"
                onClick={() => navigate(slide.ctaLink || "/")}
              >
                {slide.cta}
              </Button>
              <Button variant="glass" size="xl" className="text-lg">
                <Play className="h-5 w-5" />
                {slide.secondaryCta}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Heart className="h-4 w-4 text-primary" />
                <span>50K+ Loved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="glass"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="glass"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white" 
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div 
          className="h-full bg-accent transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};