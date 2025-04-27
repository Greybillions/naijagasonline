'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [loading, setLoading] = useState(true);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />

      <div className='max-w-5xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Your Cart
        </h1>

        {/* 👇 Only loading for the cart contents */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <svg
              className='animate-spin h-12 w-12 text-green-500'
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
            <p className='ml-4 text-gray-600 text-lg'>Loading your cart...</p>
          </div>
        ) : cart.length === 0 ? (
          <p className='text-gray-600 text-center'>Your cart is empty.</p>
        ) : (
          <div className='space-y-6'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md shadow-sm bg-white'
              >
                <div className='flex items-center gap-4'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className='rounded-md object-cover border'
                    />
                  )}
                  <div>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      {item.title}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      ₦{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center mt-3 bg-gray-100 rounded-full overflow-hidden w-max border-[1px] border-gray-300'>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className='w-10 h-10 flex items-center justify-center text-lg font-bold bg-gray-200 hover:bg-gray-300 transition'
                      >
                        -
                      </button>

                      <div className='px-5 text-base font-semibold text-gray-800 flex items-center justify-center'>
                        {item.quantity}
                      </div>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className='w-10 h-10 flex items-center justify-center text-lg font-bold bg-gray-200 hover:bg-gray-300 transition'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-600 hover:underline text-sm font-semibold'
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Section */}
            <div className='text-right mt-6 bg-gray-50 p-6 rounded-md shadow'>
              <h2 className='text-2xl font-bold mb-4'>
                Total:{' '}
                <span className='text-green-600'>
                  ₦{total.toLocaleString()}
                </span>
              </h2>
              <div className='flex flex-col sm:flex-row gap-4 justify-end'>
                <Link
                  href='/checkout'
                  className='bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold text-center'
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold'
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
