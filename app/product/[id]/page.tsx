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

  if (loading) return <div className='p-6'>Loading...</div>;
  if (error) return <div className='p-6 text-red-500'>{error}</div>;
  if (!product) return <div className='p-6'>Product not found</div>;

  return (
    <div>
      <Header />
      <div className='flex flex-col max-w-4xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
        {product.image && (
          <Image
            src={product.image}
            alt={product.title || 'Product image'}
            width={250}
            height={250}
            className='mt-6 rounded-lg object-contain'
          />
        )}
        <h2 className='text-xl font-semibold mb-2'>Description:</h2>
        <p className='text-gray-700 mb-2'>{product.description}</p>
        <p className='text-lg font-semibold text-orange-600'>
          ₦{product.price.toLocaleString()}
        </p>
        <p className='text-base text-gray-500 font-semibold'>
          Location: {product.city}, {product.state}
        </p>
        <p className='text-base text-gray-500 font-semibold'>
          Weight: {product.kg} kg
        </p>
        <p className='text-base text-gray-500 font-semibold'>
          Seller: {product.seller_name}
        </p>
        <p className='text-base text-gray-500 font-semibold'>
          Contact: {product.phone}
        </p>

        {/* Buy Now Button */}
        <Link
          href={`tel:${product.phone}`}
          className='mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold text-center hover:bg-orange-700 transition'
        >
          Contact Seller
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
