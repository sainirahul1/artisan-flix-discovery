import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface DraftProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: File[];
}

export default function Sell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<DraftProduct>({
    name: "",
    description: "",
    price: 0,
    category: "Pottery",
    images: [],
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (form.images.length + files.length > 5) {
      toast({ title: "Too many images", description: "Maximum 5 images allowed", variant: "destructive" });
      return;
    }
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const uploadImages = async (productId: string): Promise<string[]> => {
    const uploadPromises = form.images.map(async (file, index) => {
      const fileName = `${user!.id}/${productId}/${index}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      return publicUrl;
    });
    
    return Promise.all(uploadPromises);
  };

  const saveToLocal = (p: DraftProduct) => {
    const existing = JSON.parse(localStorage.getItem("communityProducts") || "[]");
    const product = {
      id: `c-${Date.now()}`,
      name: p.name,
      price: p.price,
      image: "/placeholder.svg", // Fallback image
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

    if (form.images.length === 0) {
      toast({ title: "Please add images", description: "At least one image is required", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // First create the product record
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: form.name,
          description: form.description,
          price: form.price,
          category: form.category,
          artisan_id: user.id,
          is_new: true,
          is_trending: false,
          featured: false,
          status: "active",
        })
        .select()
        .single();

      if (productError) throw productError;

      // Upload images
      const imageUrls = await uploadImages(product.id);
      
      // Update product with image URLs
      const { error: updateError } = await supabase
        .from("products")
        .update({ images: imageUrls })
        .eq("id", product.id);

      if (updateError) throw updateError;

      toast({ title: "Craft submitted!", description: "Your item is now live." });
      navigate("/");
    } catch (error: any) {
      console.error("Error submitting product:", error);
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
              <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-sm text-orange-200">
                  Please <a href="/auth/signin?type=artisan" className="underline">sign in</a> as an artisan to post your crafts.
                </p>
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-6">
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
              
              <div className="space-y-4">
                <Label>Product Images (up to 5)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {form.images.map((file, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {form.images.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                      <Plus className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  Upload {5 - form.images.length} more image{5 - form.images.length !== 1 ? 's' : ''} (JPEG, PNG, max 10MB each)
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button type="submit" variant="hero" size="xl" disabled={isSubmitting || !user} className="flex-1">
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