-- Fix RLS policy for users table to allow public signup
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

CREATE POLICY "Users can insert their own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (true);

-- Also add a policy to get user profiles for artisan display
CREATE POLICY "Public can view artisan profiles" 
ON public.users 
FOR SELECT 
USING (user_type = 'artisan');

-- Update products table to include artisan name from users table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS artisan_name TEXT;