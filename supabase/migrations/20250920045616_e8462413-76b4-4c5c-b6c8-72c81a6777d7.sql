-- Create profiles/users table for app
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  user_type TEXT CHECK (user_type IN ('customer','artisan')) DEFAULT 'customer',
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view their own profile"
ON public.users FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.users FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE TO authenticated
USING (auth.uid() = id);

-- Timestamp trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for users
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  category TEXT,
  images TEXT[] DEFAULT '{}',
  is_new BOOLEAN DEFAULT FALSE,
  is_trending BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','out_of_stock')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
-- Public can read active products
CREATE POLICY "Anyone can view active products"
ON public.products FOR SELECT
USING (status = 'active');

-- Authenticated users can insert their own products
CREATE POLICY "Users can insert their products"
ON public.products FOR INSERT TO authenticated
WITH CHECK (artisan_id = auth.uid());

-- Owners can update/delete their products
CREATE POLICY "Owners can update their products"
ON public.products FOR UPDATE TO authenticated
USING (artisan_id = auth.uid());

CREATE POLICY "Owners can delete their products"
ON public.products FOR DELETE TO authenticated
USING (artisan_id = auth.uid());

-- Trigger for products timestamps
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- Public can view images in product-images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Authenticated users can upload/update their own images namespaced by their user id
CREATE POLICY "Users can upload their product images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their product images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their product images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);