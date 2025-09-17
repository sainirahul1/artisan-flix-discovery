import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database Types
export interface User {
  id: string;
  email: string;
  user_type: 'customer' | 'artisan';
  full_name: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Artisan {
  id: string;
  user_id: string;
  business_name: string;
  description?: string;
  specialties: string[];
  experience_years?: number;
  location: string;
  verified: boolean;
  rating: number;
  total_sales: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock_quantity: number;
  materials: string[];
  dimensions?: string;
  weight?: number;
  is_trending: boolean;
  is_new: boolean;
  featured: boolean;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  added_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_amount: number;
  tax_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  shipping_address: object;
  billing_address: object;
  tracking_number?: string;
  estimated_delivery?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  added_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  images?: string[];
  helpful_count: number;
  verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}