'use client';

import React, { useState } from 'react';
import { NigerianCities } from '@/constants';
import Products from '@/components/Product';
import { gasOptions } from '@/constants';
import Footer from '@/components/Footer';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Header from '@/components/Header';
import { supabase } from '@/config/supabaseClient.config';
import Link from 'next/link';

type ValidState = keyof typeof NigerianCities;

const ShopPage = () => {
  const [state, setState] = useState<ValidState | ''>('');
  const [city, setCity] = useState('');
  const [kg, setKg] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [full_name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state || !city || !kg || !full_name || !phone) {
      alert('Please fill out all fields.');
      return;
    }

    const { error } = await supabase.from('orders').insert({
      state,
      city,
      kg,
      price,
      full_name,
      phone,
    });

    if (error) {
      console.error('Order submission error:', error.message);
      alert('Something went wrong. Please try again.');
    } else {
      setSuccess(true);
      setState('');
      setCity('');
      setKg('');
      setPrice(null);
      setFullName('');
      setPhone('');
    }
  };

  const handleKgChange = (value: string) => {
    setKg(value);
    const selected = gasOptions.find((opt) => opt.label === value);
    setPrice(selected ? selected.price : null);
  };

  return (
    <section className='w-full bg-gray-100'>
      <Header />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2'>
          <HiOutlineLocationMarker className='w-6 h-6 text-orange-500' />
          Where is your location?
        </h1>

        <form
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow mb-10'
          onSubmit={handleSubmit}
        >
          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              State
            </label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value as ValidState);
                setCity('');
              }}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
            >
              <option value=''>Select a state</option>
              <option value='lagos'>Lagos</option>
              <option value='abuja'>Abuja</option>
              <option value='rivers'>Rivers</option>
            </select>
          </div>

          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              disabled={!state}
            >
              <option value=''>Select a city</option>
              {state &&
                NigerianCities[state]?.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              Gas Size (KG)
            </label>
            <select
              value={kg}
              onChange={(e) => handleKgChange(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
            >
              <option value=''>Select KG</option>
              {gasOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} - ₦{opt.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              Price
            </label>
            <input
              type='text'
              value={price !== null ? `₦${price.toLocaleString()}` : ''}
              readOnly
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed'
              placeholder='Auto-selected'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              placeholder='Enter your name'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium text-sm text-gray-700'>
              Phone Number
            </label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              placeholder='Enter your phone number'
            />
          </div>

          <div className='sm:col-span-2 flex justify-center mt-4'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition'
            >
              Submit Order
            </button>
          </div>
        </form>

        {success && (
          <div className='bg-green-100 text-green-800 px-6 py-4 rounded-md shadow text-center mb-8'>
            <p className='font-semibold text-lg'>
              Order submitted successfully!
            </p>
            <Link
              href='/'
              className='underline text-orange-600 font-medium mt-2 inline-block'
            >
              Go back to home
            </Link>
          </div>
        )}

        <Products />
      </div>
      <Footer />
    </section>
  );
};

export default ShopPage;
