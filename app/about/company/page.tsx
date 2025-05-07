'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CompanyPage = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          About Our Company
        </h1>
        <p className='text-lg text-gray-600 mb-6 max-w-3xl'>
          NaijaGasOnline is on a mission to redefine how homes and businesses
          access gas. We’re not just delivering cylinders — we’re delivering
          speed, safety, and innovation across Nigeria.
        </p>

        <section className='grid gap-10 md:grid-cols-2 mt-10'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Who We Are</h2>
            <p className='text-gray-600'>
              We are a passionate team of engineers, marketers, and logistics
              experts committed to improving gas delivery infrastructure with
              technology. Our platform connects users to seamless ordering,
              smart tracking, and trusted suppliers.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Our Vision</h2>
            <p className='text-gray-600'>
              To become the leading gas delivery network in Africa by using
              technology to reduce delays, boost safety, and empower local
              sellers.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Our Values</h2>
            <ul className='list-disc list-inside text-gray-600 space-y-1'>
              <li>Customer-first service</li>
              <li>Reliable and timely deliveries</li>
              <li>Transparency and safety</li>
              <li>Continuous innovation</li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Our Reach</h2>
            <p className='text-gray-600'>
              From Port Harcourt to Lagos and beyond, NaijaGasOnline is
              expanding fast — with over 20 delivery partners across Nigeria.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyPage;
