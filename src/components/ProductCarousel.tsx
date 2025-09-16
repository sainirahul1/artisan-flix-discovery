import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

interface Product {
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

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  priority?: boolean;
}

export const ProductCarousel = ({ title, subtitle, products, priority }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of one card + gap
      const newScrollPosition =
        scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-netflix">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-2">
          <Button
            variant="glass"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <div
        ref={scrollRef}
        className="carousel-row flex gap-4 px-6 pb-4 overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard
              {...product}
              key={`${product.id}-${index}`}
            />
          </div>
        ))}
      </div>

      {/* Fade edges for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};