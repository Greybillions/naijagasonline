'use client';

import React from 'react';
import Image from 'next/image';
import { images } from '@/constants/images';
import { motion } from 'framer-motion';

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
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const Banner = () => {
  return (
    <section className='relative bg-grid w-full overflow-hidden md:py-1 py-16 px-4 sm:px-6 lg:px-8'>
      <motion.div
        initial='hidden'
        animate='show'
        variants={container}
        className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'
      >
        {/* Left - Image */}
        <motion.div
          variants={item}
          className='w-full md:w-1/2 flex justify-center'
        >
          <Image
            src={images.banner}
            alt='Banner'
            width={400}
            height={400}
            className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain'
          />
        </motion.div>

        {/* Right - Text */}
        <motion.div
          variants={item}
          className='w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left text-white'
        >
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Elegant Craft Gas <span className='text-orange-500'>Cylinder</span>
          </h1>
          <p className='text-base sm:text-lg text-white/90 max-w-md'>
            Designed for safety, crafted with style. Premium gas delivery at
            your doorstep.
          </p>
          <motion.button
            variants={item}
            className='mt-4 w-fit bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition'
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
