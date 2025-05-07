// app/press/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PressPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Press & Media</h1>
        <p className='text-gray-600 mb-8'>
          Find our latest announcements, media assets, and brand resources. For
          press inquiries, reach out to{' '}
          <a
            href='mailto:naijagasonline@gmail.com'
            className='text-green-600 font-medium hover:underline'
          >
            naijagasonline@gmail.com
          </a>
          .
        </p>

        <section className='space-y-6'>
          <article className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              NaijaGasOnline Secures Strategic Partnership With Local Suppliers
            </h2>
            <p className='text-sm text-gray-600'>
              April 2025 — NaijaGasOnline has partnered with regional suppliers
              to expand doorstep delivery coverage across 10 new cities.
            </p>
          </article>

          <article className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              GasOnline Featured on “Startups to Watch in Nigeria”
            </h2>
            <p className='text-sm text-gray-600'>
              March 2025 — We are thrilled to be recognized as one of the top 20
              emerging tech startups in Nigeria by TechWatch.
            </p>
          </article>

          <article className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Interview: CEO Speaks on Disrupting Traditional Gas Retail
            </h2>
            <p className='text-sm text-gray-600'>
              February 2025 — In an exclusive with Lagos Business Daily, our CEO
              shares the journey behind launching NaijaGasOnline.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PressPage;
