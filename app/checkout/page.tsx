'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const CheckoutPage = () => {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          Checkout
        </h1>

        {loading ? (
          <div className='flex flex-col justify-center items-center mt-20'>
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
            <p className='text-gray-700 text-lg'>Loading order details...</p>
          </div>
        ) : (
          <>
            {cart.length === 0 ? (
              <p className='text-center text-gray-600'>
                Your cart is empty.
                <Link href='/' className='text-primary font-semibold'>
                  Go back to shopping
                </Link>
              </p>
            ) : (
              <div className='space-y-6'>
                {/* Cart Summary */}
                <div className='bg-white p-6 rounded-lg shadow'>
                  <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>

                  <div className='divide-y divide-gray-200'>
                    {cart.map((item, index) => (
                      <div
                        key={item.id}
                        className='flex justify-between items-center py-4'
                      >
                        <div className='flex items-start gap-2'>
                          <span className='text-lg font-bold text-gray-700'>
                            {index + 1}.
                          </span>
                          <div className='flex flex-col'>
                            <span className='font-medium text-gray-800'>
                              {item.title} x {item.quantity}
                            </span>
                            <span className='text-sm text-gray-500'>
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className='flex justify-between mt-6 pt-4 border-t'>
                    <span className='font-semibold text-gray-700'>Total</span>
                    <span className='font-bold text-green-600 text-xl'>
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment Section */}
                <div className='bg-white p-6 rounded-lg shadow'>
                  <h2 className='text-2xl font-semibold mb-4'>Payment</h2>
                  <p className='text-gray-600 mb-4'>
                    Select payment method at delivery.
                  </p>

                  <button className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition'>
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
