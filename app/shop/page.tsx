'use client';

import React, { useState } from 'react';
import { gasOptions, NigerianCities } from '@/constants';
import Products from '@/components/Product';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { supabase } from '@/config/supabaseClient.config';
import Link from 'next/link';

const ShopPage = () => {
  const [kg, setKg] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleKgChange = (value: string) => {
    setKg(value);
    const selected = gasOptions.find((opt) => opt.label === value);
    setPrice(selected?.price ?? null);
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 11) setPhone(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kg || !fullName || !phone || !state || !city || !deliveryOption) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from('orders').insert({
      kg,
      price,
      full_name: fullName,
      phone,
      state,
      city,
      address, // optional
      delivery_option: deliveryOption,
    });

    if (error) {
      console.error('Order submission error:', error.message);
      alert('Something went wrong. Please try again.');
    } else {
      setSuccess(true);
      resetForm();
    }

    setSubmitting(false);
  };

  const resetForm = () => {
    setKg('');
    setPrice(null);
    setFullName('');
    setPhone('');
    setState('');
    setCity('');
    setAddress('');
    setDeliveryOption('');
  };

  const cities = NigerianCities[state?.toLowerCase()] || [];

  return (
    <section className='w-full bg-gray-100'>
      <Header />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2'>
          <HiOutlineLocationMarker className='w-6 h-6 text-primary' />
          Buy Gas Online
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow mb-10'
        >
          {/* Gas Size */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Gas Size (KG)
            </label>
            <select
              value={kg}
              onChange={(e) => handleKgChange(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              required
            >
              <option value=''>Select KG</option>
              {gasOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label} - ₦{option.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Price
            </label>
            <input
              type='text'
              value={price ? `₦${price.toLocaleString()}` : ''}
              readOnly
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed'
              placeholder='Auto-selected'
            />
          </div>

          {/* Full Name */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              placeholder='Enter your name'
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              placeholder='Enter your phone number'
              required
            />
          </div>

          {/* State */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              State
            </label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity('');
              }}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              required
            >
              <option value=''>Select State</option>
              {Object.keys(NigerianCities).map((stateKey) => (
                <option key={stateKey} value={stateKey}>
                  {stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              required
              disabled={!state}
            >
              <option value=''>Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Address (Optional) */}
          <div className='sm:col-span-2'>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Address (optional)
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              placeholder='Street address, landmark, etc.'
            />
          </div>

          {/* Delivery Option */}
          <div className='sm:col-span-2'>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Delivery Option
            </label>
            <select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              required
            >
              <option value=''>Select Delivery Option</option>
              <option value='Replace Cylinder'>Replace Cylinder</option>
              <option value='Pick and Drop my cylinder'>
                Pick and Drop my cylinder
              </option>
            </select>
            <p className='text-xs text-orange-600 mt-1'>
              ⚠ Delivery fees vary by location.
            </p>
          </div>

          {/* Submit Button */}
          <div className='sm:col-span-2 flex justify-center mt-4'>
            <button
              type='submit'
              disabled={submitting}
              className='bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {submitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>

        {/* Modal on success */}
        {success && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
            <div className='relative bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center'>
              {/* Close Button */}
              <button
                onClick={() => setSuccess(false)}
                className='absolute top-2 right-2 text-red-500 hover:text-gray-700 text-2xl font-bold'
                aria-label='Close modal'
              >
                &times;
              </button>

              <h2 className='text-xl font-bold mb-4 text-green-700'>
                Thank you for choosing Naija Gas Online
              </h2>
              <p className='text-base mb-6 text-gray-700'>
                Our Customer Care shall contact you shortly.
              </p>
              <Link
                href='/about/press'
                className='inline-block bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-md text-sm font-medium transition'
              >
                Go to Blog Page
              </Link>
            </div>
          </div>
        )}

        <Products />
      </div>

      <Footer />
    </section>
  );
};

export default ShopPage;
