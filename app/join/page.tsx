'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className='bg-white'>
      <Header />
      <div className='max-w-4xl mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-900'>
          Join <span className='text-orange-500'>Us</span>
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
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email Address'
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
            className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md col-span-1 sm:col-span-2'
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default JoinUs;
