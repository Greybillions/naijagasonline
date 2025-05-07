'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

const LeadershipPage = () => {
  const leaders = [
    {
      name: 'Dr. Olamide Tom',
      title: 'Founder & CEO',
      image: '/team/mide.webp',
      bio: 'Dr. Olamide leads the team with a bold vision to revolutionize gas delivery in Nigeria through smart technology and people-first strategies.',
    },
    {
      name: 'Amaka Johnson',
      title: 'Chief Operations Officer',
      image: '/team/amaka.webp',
      bio: 'With over a decade of experience in logistics, Amaka ensures deliveries are fast, safe, and reliable nationwide.',
    },
    {
      name: 'Graham Boyle',
      title: 'Software Engineer',
      image: '/team/grey.webp',
      bio: 'Grey oversees the platform’s tech, ensuring that our apps are seamless, scalable, and secure.',
    },
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
                width={120}
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
      </main>

      <Footer />
    </div>
  );
};

export default LeadershipPage;
