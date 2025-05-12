'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/config/supabaseClient.config';
import Link from 'next/link';
import { NigerianCities } from '@/constants';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    role: '',
    state: '',
    city: '',
    message: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { city: '' }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from('join_requests').insert([
      {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        state: formData.state,
        city: formData.city,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error('Error submitting:', error.message);
    } else {
      console.log('Submitted data:', data);
      setFormData({
        fullName: '',
        phone: '',
        role: '',
        state: '',
        city: '',
        message: '',
      });
      setShowModal(true);
    }
  };

  return (
    <section className='bg-white relative'>
      <Header />
      <div className='max-w-4xl mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-900'>
          Join <span className='text-primary'>Us</span>
        </h1>

        <div className='bg-gray-50 p-6 rounded-xl shadow mb-10'>
          <ul className='list-disc pl-6 space-y-2 text-gray-700 text-base'>
            <li>
              Become a <strong>Gas Delivery Officer</strong>
            </li>
            <li>
              Partner <strong>Gas Plant</strong>
            </li>
            <li>
              <strong>Bad Cylinder</strong> Replacement
            </li>
            <li>
              <strong>Logistic</strong> Outfit
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 gap-4'
        >
          <input
            name='fullName'
            type='text'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Full Name'
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full'
            required
          />

          <input
            name='phone'
            type='tel'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Phone Number'
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full'
            required
          />

          <select
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full'
            required
          >
            <option value=''>Select Role</option>
            <option value='Delivery Officer'>Gas Delivery Officer</option>
            <option value='Gas Plant'>Partner Gas Plant</option>
            <option value='Cylinder Replacement'>
              Bad Cylinder Replacement
            </option>
            <option value='Logistics'>Logistic Outfit</option>
          </select>

          {/* State and City dropdowns */}
          <select
            name='state'
            value={formData.state}
            onChange={handleChange}
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full bg-white text-gray-700'
            required
          >
            <option value=''>Select State</option>
            {Object.keys(NigerianCities).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name='city'
            value={formData.city}
            onChange={handleChange}
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full bg-white text-gray-700'
            required
            disabled={!formData.state}
          >
            <option value=''>Select City</option>
            {formData.state &&
              NigerianCities[
                formData.state as keyof typeof NigerianCities
              ]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Additional Information (optional)'
            className='border border-gray-300 px-4 py-2 rounded-md text-sm w-full col-span-1 sm:col-span-2'
            rows={4}
          />

          <button
            type='submit'
            className='bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-md col-span-1 sm:col-span-2'
          >
            Submit
          </button>
        </form>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl shadow-xl p-6 max-w-sm text-center'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Registration Successful 🎉
            </h2>
            <p className='text-gray-600 mb-6'>
              Thanks for joining NaijaGas Online!
            </p>
            <Link
              href='/'
              className='inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition duration-200'
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </section>
  );
};

export default JoinUs;
