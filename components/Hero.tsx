'use client';

import React, { useState } from 'react';
import Header from './Header';
import Image from 'next/image';
import { images } from '@/constants/images';
import Button from './Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className='relative flex flex-col min-h-screen w-full overflow-hidden bg-white'>
      <Header />
      <div className='h-[1px] w-full bg-gray-300' />

      <motion.div
        initial='hidden'
        animate='show'
        variants={container}
        className='mx-auto max-w-[1300px] p-6 sm:p-10 mt-6 w-full bg-[#e6e9f2] rounded-2xl h-auto md:h-[80vh]'
      >
        <div className='flex flex-col-reverse md:flex-row items-center justify-between w-full h-full gap-10'>
          {/* Text content */}
          <div className='w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left items-center md:items-start justify-center'>
            <motion.p
              variants={item}
              className='text-lg hidden md:flex sm:text-xl text-[#ea580c]'
            >
              Welcome to NaijaGas Online
            </motion.p>

            <motion.h1
              variants={item}
              className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight'
            >
              Your Smart Choice for Cooking Gas
            </motion.h1>

            <motion.div
              variants={item}
              className='flex flex-col sm:flex-row gap-3 mt-4 justify-center md:justify-start'
            >
              <Button
                variant='primary'
                onClick={() => setShowModal(true)}
                className='hover:scale-102 text-2xl w-full sm:w-auto'
              >
                How do we help you?
              </Button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            variants={item}
            className='w-full md:w-1/2 flex flex-col items-center justify-center'
          >
            <motion.p
              variants={item}
              className='text-2xl md:hidden flex font-semibold text-[#ea580c]'
            >
              Welcome to NaijaGas Online
            </motion.p>
            <Image
              src={images.hero}
              alt='hero'
              width={400}
              height={400}
              className='lg:w-[450px] h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain'
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4 text-center'>
            <h2 className='text-lg font-semibold text-gray-800'>
              How can we help you?
            </h2>
            <div className='space-y-3'>
              <Link
                href='/shop'
                className='block w-full rounded-md bg-orange-500 text-white py-2'
              >
                Buy Gas Online
              </Link>
              <Link
                href='/service'
                className='block w-full rounded-md bg-orange-500 text-white py-2'
              >
                Get a Service
              </Link>
              <Link
                href='/join'
                className='block w-full rounded-md bg-orange-500 text-white py-2'
              >
                Join Us
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className='text-sm text-gray-500 hover:underline mt-4'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
