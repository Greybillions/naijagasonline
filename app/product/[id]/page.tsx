'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  phone: string;
  state: string;
  city: string;
  kg: string;
  seller_name: string;
};

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setProduct(data as Product);
        }
      } catch {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className='p-6 text-center'>Loading...</div>;
  if (error) return <div className='p-6 text-center text-red-500'>{error}</div>;
  if (!product) return <div className='p-6 text-center'>Product not found</div>;

  return (
    <div>
      <Header />

      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
        <div className='grid md:grid-cols-2 gap-10 items-start'>
          {/* Image */}
          {product.image && (
            <div className='w-full'>
              <Image
                src={product.image}
                alt={product.title || 'Product image'}
                width={500}
                height={500}
                className='rounded-xl shadow-md object-contain w-full max-h-[400px]'
              />
            </div>
          )}

          {/* Product Info */}
          <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold text-gray-900'>
              {product.title}
            </h1>

            <p className='text-lg text-gray-700 leading-relaxed'>
              {product.description}
            </p>

            <p className='text-2xl font-bold text-orange-600'>
              ₦{product.price.toLocaleString()}
            </p>

            <div className='flex flex-wrap gap-3 mt-4'>
              <span className='bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full'>
                📍 {product.city}, {product.state}
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full'>
                🧪 {product.kg} kg
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full'>
                👤 {product.seller_name}
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full'>
                ☎ {product.phone}
              </span>
            </div>

            {/* CTA Button */}
            <Link
              href={`tel:${product.phone}`}
              className='mt-6 inline-block bg-primary hover:bg-orange-600 text-white text-lg font-semibold px-6 py-3 rounded-lg transition'
            >
              Contact Seller
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
