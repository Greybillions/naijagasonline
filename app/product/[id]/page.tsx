'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/config/supabaseClient.config';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext'; // Cart Context

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
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart, cart } = useCart(); // Get cart array

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

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      ...product,
      quantity: 1,
    };

    addToCart(cartItem);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const alreadyInCart = cart.some((item) => item.id === product.id); // 👈 Check

    if (!alreadyInCart) {
      const cartItem = {
        ...product,
        quantity: 1,
      };
      addToCart(cartItem);
    }

    router.push('/cart');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='flex flex-col items-center'>
          <svg
            className='animate-spin h-12 w-12 text-green-500 mb-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            ></path>
          </svg>
          <p className='text-black text-lg'>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) return <div className='p-6 text-center text-red-500'>{error}</div>;
  if (!product) return <div className='p-6 text-center'>Product not found</div>;

  return (
    <div className='relative bg-white'>
      <Header />

      {/* Popup */}
      {showPopup && (
        <div className='fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-all'>
          🛒 Added to Cart!
        </div>
      )}

      <section className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
        <div className='grid md:grid-cols-2 gap-12 items-start'>
          {/* Product Image */}
          <div className='relative w-full'>
            {product.image && (
              <>
                <Image
                  src={product.image}
                  alt={product.title || 'Product image'}
                  width={600}
                  height={600}
                  className='rounded-2xl object-contain w-full max-h-[450px] shadow-lg'
                />

                {/* Watermark */}
                <div className='absolute bottom-4 right-4 bg-white/40 text-black text-lg sm:text-2xl font-extrabold px-4 py-2 rounded-md'>
                  GasOnline
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className='flex flex-col gap-5'>
            <h1 className='text-4xl font-bold text-gray-900'>
              {product.title}
            </h1>

            <p className='text-lg text-gray-700 leading-relaxed'>
              {product.description}
            </p>

            <p className='text-3xl font-extrabold text-orange-600'>
              ₦{product.price.toLocaleString()}
            </p>

            <div className='flex flex-wrap gap-3 mt-2'>
              <span className='bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-full'>
                📍 {product.city}, {product.state}
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-full'>
                🧪 {product.kg} kg
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-full'>
                👤 {product.seller_name}
              </span>
              <span className='bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-full'>
                ☎ {product.phone}
              </span>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 mt-8'>
              <button
                onClick={handleAddToCart}
                className='flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition'
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className='flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition'
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
