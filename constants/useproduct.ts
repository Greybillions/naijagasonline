'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabaseClient.config';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  phone: string;
  state: string;
  city: string;
  kg: string;
  seller_name: string;
  // Add other fields from your 'products' table
};

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');

        if (error) {
          setError(error.message);
          console.error('Supabase fetch error:', error.message);
        } else {
          setProducts(data as Product[]);
          setError(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error('Unexpected error fetching products:', message);
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
}
