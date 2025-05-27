'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const LeadershipPage = () => {
  const leaders = [
    {
      name: 'Onipede Olamide J.',
      title: 'CEO',
      image: '/team/mide.webp',
      bio: 'Dr. Olamide leads the team with a bold vision to revolutionize gas delivery in Nigeria through smart technology and people-first strategies.',
    },
    {
      name: 'Tommy Uba Kobindi',
      title: 'Chief Operations Officer',
      image: '/team/grey.webp',
      bio: 'With over a decade of experience in logistics, Tommy ensures deliveries are fast, safe, and reliable nationwide.',
    },
  ];

  const partners = [
    { name: 'Bereeth Energies & Investment LTD', location: 'Lagos State' },
    { name: 'BNL Services', location: 'Port Harcourt' },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Leadership Team
        </h1>
        <p className='text-lg text-gray-600 mb-10'>
          Meet the passionate minds driving innovation, growth, and customer
          success at NaijaGasOnline.
        </p>

        <div className='grid gap-8 md:grid-cols-3'>
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className='bg-white p-6 rounded-xl shadow-md text-center'
            >
              <Image
                src={leader.image}
                alt={leader.name}
                width={150}
                height={120}
                className='rounded-full mx-auto mb-4 object-cover'
              />
              <h2 className='text-xl font-semibold text-gray-800'>
                {leader.name}
              </h2>
              <p className='text-sm text-green-600 font-medium'>
                {leader.title}
              </p>
              <p className='text-sm text-gray-600 mt-2'>{leader.bio}</p>
            </div>
          ))}
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>
            Major Partners
          </h2>
          <ul className='space-y-4'>
            {partners.map((partner, index) => (
              <li
                key={index}
                className='bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-600'
              >
                <p className='text-lg font-semibold text-gray-700'>
                  {partner.name}
                </p>
                <p className='text-sm text-gray-500'>{partner.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeadershipPage;
