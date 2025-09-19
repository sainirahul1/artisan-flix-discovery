import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface CommunityProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export const useCommunityProducts = () => {
  const [products, setProducts] = useState<CommunityProductCard[]>([]);

  useEffect(() => {
    const load = async () => {
      // Local first
      const local = JSON.parse(localStorage.getItem("communityProducts") || "[]");
      let merged: CommunityProductCard[] = local;

      // Try Supabase
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, price, images, category, is_new, is_trending, created_at, artisan_id")
          .order("created_at", { ascending: false })
          .limit(24);
        if (!error && data) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: Array.isArray(p.images) ? p.images[0] : p.images,
            artisan: "Community Artisan",
            rating: 5,
            reviews: 0,
            category: p.category || "Crafts",
            isNew: !!p.is_new,
            isTrending: !!p.is_trending,
          }));
          merged = [...mapped, ...merged];
        }
      } catch (_) {
        // ignore
      }

      // Ensure unique by id
      const seen = new Set<string>();
      const unique = merged.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
      setProducts(unique);
    };

    load();
  }, []);

  return { products };
};
