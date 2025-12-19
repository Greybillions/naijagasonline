'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { supabase } from '@/config/supabaseClient.config';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const placeOrder = async () => {
    if (!name || !address || !phone || !deliveryMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);

    const products = cart.map((item) => ({
      name: item.title,
      kg: item.kg ?? '',
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    const txRef = `NG-COD-${Date.now()}`;

    const { error } = await supabase.from('cart_order').insert([
      {
        name,
        phonenumber: phone,
        address,
        product: products,
        tx_ref: txRef,
        delivery_method: deliveryMethod,
        payment_mode: 'payment_on_delivery',
        status: 'pending',
      },
    ]);

    if (error) {
      console.error(error);
      toast.error('Failed to place order. Please try again.');
      setSubmitting(false);
      return;
    }

    toast.success('✅ Order placed successfully!');
    clearCart();

    setSubmitting(false);
  };

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
          Checkout
        </h1>

        {loading ? (
          <div className='flex flex-col items-center mt-20'>
            <div className='h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mb-4' />
            <p className='text-gray-700'>Loading order details…</p>
          </div>
        ) : cart.length === 0 ? (
          <p className='text-center text-gray-600'>
            Your cart is empty.{' '}
            <Link href='/' className='text-orange-600 font-semibold'>
              Go back to shopping
            </Link>
          </p>
        ) : (
          <div className='space-y-6'>
            {/* Order Summary */}
            <div className='bg-white p-6 rounded-lg shadow'>
              <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>

              <div className='divide-y'>
                {cart.map((item, index) => (
                  <div key={item.id} className='flex justify-between py-4'>
                    <div>
                      <p className='font-medium'>
                        {index + 1}. {item.title} × {item.quantity}
                      </p>
                      <p className='text-sm text-gray-500'>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-between mt-6 pt-4 border-t'>
                <span className='font-semibold'>Total</span>
                <span className='text-xl font-bold text-orange-600'>
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className='bg-white p-6 rounded-lg shadow'>
              <h2 className='text-2xl font-semibold mb-4'>
                Customer Information
              </h2>

              <div className='grid gap-4'>
                <input
                  placeholder='Full Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border rounded p-3'
                />

                <textarea
                  placeholder='Delivery Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='border rounded p-3'
                />

                <input
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='border rounded p-3'
                />

                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className='border rounded p-3'
                >
                  <option value=''>Select Delivery Option</option>
                  <option value='door_delivery'>Door Delivery</option>
                  <option value='pickup'>Pickup</option>
                </select>

                {/* Payment Mode (locked) */}
                <div className='rounded-lg border bg-gray-50 p-3 text-sm text-gray-700'>
                  💵 Payment Method:{' '}
                  <span className='font-medium'>Payment on Delivery</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={submitting}
                className='mt-6 w-full rounded-xl bg-orange-600 px-6 py-3 text-white font-medium hover:bg-orange-700 disabled:opacity-60'
              >
                {submitting ? 'Placing Order…' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
