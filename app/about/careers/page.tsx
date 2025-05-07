'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const CareersPage = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Join Our Team</h1>
        <p className='text-lg text-gray-600 mb-8 max-w-3xl'>
          We’re building the future of gas distribution in Nigeria — and we need
          great people like you. Join our mission to deliver smarter, safer, and
          faster energy solutions.
        </p>

        <section className='bg-white p-6 rounded-xl shadow space-y-6'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Current Openings
          </h2>
          <ul className='space-y-3'>
            <li className='flex justify-between items-center border-b pb-3'>
              <span className='text-gray-700 font-medium'>
                Frontend Developer (Nextjs + Tailwind)
              </span>
              <Link
                href='mailto:careers@naijagasonline.com'
                className='text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
              >
                Apply
              </Link>
            </li>
            <li className='flex justify-between items-center border-b pb-3'>
              <span className='text-gray-700 font-medium'>
                Backend Developer (Node.js + Supabase)
              </span>
              <Link
                href='mailto:careers@naijagasonline.com'
                className='text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
              >
                Apply
              </Link>
            </li>
            <li className='flex justify-between items-center border-b pb-3'>
              <span className='text-gray-700 font-medium'>
                Customer Service Representative
              </span>
              <Link
                href='mailto:careers@naijagasonline.com'
                className='text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
              >
                Apply
              </Link>
            </li>
            <li className='flex justify-between items-center'>
              <span className='text-gray-700 font-medium'>
                Logistics & Dispatch Coordinator
              </span>
              <Link
                href='mailto:naijagasonline@gmail.com'
                className='text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
              >
                Apply
              </Link>
            </li>
          </ul>
        </section>

        <p className='text-center text-sm text-gray-500 mt-8'>
          Can’t find your role? We’re always open to new talent — email us your
          CV and let’s talk!
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
