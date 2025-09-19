import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/contexts/AuthContext"; // Disabled until Supabase setup
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface DraftProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // URL for now
}

export default function Sell() {
  // const { user } = useAuth(); // Disabled until Supabase setup
  const user = null; // Temporary fallback
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<DraftProduct>({
    name: "",
    description: "",
    price: 0,
    category: "Pottery",
    image: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const saveToLocal = (p: DraftProduct) => {
    const existing = JSON.parse(localStorage.getItem("communityProducts") || "[]");
    const product = {
      id: `c-${Date.now()}`,
      name: p.name,
      price: p.price,
      image: p.image,
      artisan: user?.full_name || "Community Artisan",
      rating: 5.0,
      reviews: 0,
      category: p.category,
      isNew: true,
      description: p.description,
    };
    localStorage.setItem("communityProducts", JSON.stringify([product, ...existing]));
    return product;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in", description: "You need an account to post.", variant: "destructive" });
      navigate("/auth/signin?type=artisan");
      return;
    }

    setIsSubmitting(true);
    try {
      // Try Supabase first (if table exists)
      const { error } = await supabase
        .from("products")
        .insert({
          name: form.name,
          description: form.description,
          price: form.price,
          category: form.category,
          images: [form.image],
          artisan_id: user.id,
          is_new: true,
          is_trending: false,
          featured: false,
          status: "active",
        });

      if (error) throw error;

      toast({ title: "Craft submitted!", description: "Your item is now live." });
      navigate("/");
    } catch (_) {
      // Fallback to localStorage
      const product = saveToLocal(form);
      toast({ title: "Craft saved locally", description: "We couldn't reach the database. Showing it on the homepage." });
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Post Your Craft</CardTitle>
          </CardHeader>
          <CardContent>
            {!user && (
              <div className="mb-6 text-sm text-muted-foreground">
                Tip: For selling, create an artisan account during signup.
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item name</Label>
                <Input id="name" name="name" value={form.name} onChange={onChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={form.description} onChange={onChange} rows={4} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" name="price" type="number" min={0} value={form.price} onChange={onChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={form.category} onChange={onChange} placeholder="Pottery, Textiles, etc" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={form.image} onChange={onChange} placeholder="https://..." required />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Publish Craft"}
                </Button>
                <Button type="button" variant="cinematic" onClick={() => navigate("/")}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
