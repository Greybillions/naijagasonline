'use client';

import React from 'react';
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

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className='max-w-5xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Your Cart
        </h1>

        {cart.length === 0 ? (
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
                    <div className='flex items-center mt-2'>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className='px-2 py-1 text-sm bg-gray-200 rounded-l hover:bg-gray-300'
                      >
                        -
                      </button>
                      <span className='px-3 py-1 text-sm bg-gray-100 border-t border-b'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className='px-2 py-1 text-sm bg-gray-200 rounded-r hover:bg-gray-300'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-600 hover:underline text-sm'
                >
                  Remove
                </button>
              </div>
            ))}

            <div className='text-right mt-6 bg-gray-50 p-4 rounded-md shadow'>
              <h2 className='text-xl font-semibold mb-4'>
                Total:{' '}
                <span className='text-orange-600'>
                  ₦{total.toLocaleString()}
                </span>
              </h2>
              <button
                onClick={clearCart}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'
              >
                Clear Cart
              </button>
              <Link
                href='/checkout'
                className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover'
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
